import { MutateMaterialForm } from '@/features/material';
import { materialInputSchema } from '@/schemas';
import { type MaterialInput } from '@/types';
import { api, type RouterOutputs } from '@/utils/api';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function NewMaterial(
  props: RouterOutputs['material']['getAll'][0]
) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const input: MaterialInput | undefined = {
    id: props.id,
    itemDetails: {
      name: props.itemDetails.name,
      stock: Number(props.itemDetails.stock),
      minStock: Number(props.itemDetails.minStock),
      costPerUnit: Number(props.itemDetails.costPerUnit),
    },
    url: props.url ?? '',
    stockUnitId: props.itemDetails.stockUnitId,
    vendorId: props.vendor.id,
    categoryIds: props.categories.map((category) => category.category.id),
  };

  const form = useForm<MaterialInput>({
    defaultValues: input,
    resolver: zodResolver(materialInputSchema),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const updateQuery = api.material.update.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Material updated',
        description: 'Successfully updated material',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      onClose();
    },
  });

  const deleteQuery = api.material.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Material deleted',
        description: 'Successfully deleted material',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      onClose();
    },
  });

  function onSubmit(data: MaterialInput) {
    updateQuery.mutate(data);
  }

  function onDelete() {
    deleteQuery.mutate({ id: props.id });
  }

  const isLowStock =
    Number(props.itemDetails.stock) < Number(props.itemDetails.minStock);

  return (
    <>
      <Link
        onClick={onOpen}
        color={isLowStock ? 'red.500' : 'unset'}
        fontWeight='semibold'
      >
        {props.itemDetails.name}
      </Link>
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            Update Material
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <FormProvider {...form}>
              <form
                id='update-material-form'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <MutateMaterialForm />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter gap={4}>
            <Button colorScheme='red' variant='outline' onClick={onDelete}>
              Delete
            </Button>
            <Button type='submit' form='update-material-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
