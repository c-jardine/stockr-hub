import { MutateMaterialForm } from '@/features/material';
import { materialInputSchema } from '@/schemas';
import { type MaterialInput } from '@/types';
import { api } from '@/utils/api';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { Plus } from 'tabler-icons-react';

export default function NewMaterial() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<MaterialInput>({
    resolver: zodResolver(materialInputSchema),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.create.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Material created',
        description: 'Successfully created material',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      onClose();
    },
  });

  function onSubmit(data: MaterialInput) {
    query.mutate(data);
  }

  return (
    <>
      <Button
        rounded='full'
        w='fit-content'
        leftIcon={<Icon as={Plus} />}
        onClick={onOpen}
      >
        New Material
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            New Material
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <FormProvider {...form}>
              <form
                id='new-material-form'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <MutateMaterialForm />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter>
            <Button type='submit' form='new-material-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
