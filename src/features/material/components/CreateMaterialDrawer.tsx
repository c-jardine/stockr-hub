import { CreateMaterialForm } from '@/features/material';
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
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { Plus } from 'tabler-icons-react';
import { useNewMaterial } from '../hooks';

export default function CreateMaterialDrawer() {
  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useNewMaterial();

  return (
    <>
      <Button
        rounded='full'
        w='fit-content'
        leftIcon={<Icon as={Plus} strokeWidth={4} />}
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
                <CreateMaterialForm />
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
