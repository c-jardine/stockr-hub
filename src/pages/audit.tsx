import { type Option } from '@/components/Select';
import { selectComponents } from '@/components/Select/components';
import { RootLayout } from '@/layouts/RootLayout';
import { selectStyles } from '@/styles';
import { api } from '@/utils/api';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';

export default function audit() {
  return (
    <RootLayout title='Audits' actionBar={<NewAuditModal />}>
      <Stack></Stack>
    </RootLayout>
  );
}

function NewAuditModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { control, watch, setValue, handleSubmit } = useForm<{
    type: string;
    category: string;
  }>({
    defaultValues: {
      type: 'materials',
      category: 'all',
    },
  });

  const typeOptions = [
    { label: 'Materials', value: 'materials' },
    { label: 'Products', value: 'products' },
  ];

  const { data: materialData } =
    api.categories.getMaterialCategories.useQuery();

  const { data: productData } = api.categories.getProductCategories.useQuery();

  function getCategoryOptions(): Option[] {
    if (watch('type') === 'materials') {
      return materialData
        ? materialData?.map(({ category }) => ({
            label: category.name,
            value: slugify(category.name, { lower: true }),
          }))
        : [];
    } else if (watch('type') === 'products') {
      return productData
        ? productData?.map(({ category }) => ({
            label: category.name,
            value: slugify(category.name, { lower: true }),
          }))
        : [];
    } else {
      return [];
    }
  }

  const router = useRouter();

  async function onSubmit(data: { type: string; category: string }) {
    await router.push(`/audit/${data.type}/${data.category}`);
  }

  return (
    <>
      <Button onClick={onOpen}>New audit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New audit</ModalHeader>
          <ModalBody>
            <Stack
              as='form'
              id='new-audit-form'
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Controller
                  control={control}
                  name='type'
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={typeOptions?.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(data) => {
                        if (data) {
                          field.onChange(data.value);
                          setValue('type', data.value);
                        }
                      }}
                      options={typeOptions}
                      chakraStyles={selectStyles}
                      components={selectComponents}
                    />
                  )}
                />
              </FormControl>
              <FormControl>Category</FormControl>
              <Controller
                control={control}
                name='category'
                render={({ field }) => (
                  <Select
                    {...field}
                    value={getCategoryOptions()?.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(data) => {
                      if (data) {
                        field.onChange(data.value);
                        setValue('category', data.value);
                      }
                    }}
                    options={getCategoryOptions()}
                    chakraStyles={selectStyles}
                    components={selectComponents}
                  />
                )}
              />
            </Stack>
          </ModalBody>
          <ModalFooter gap={4}>
            <Button variant='outline'>Cancel</Button>
            <Button type='submit' form='new-audit-form'>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
