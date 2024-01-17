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
import { CreateProductForm } from '.';
import { useNewProduct } from '../hooks';

export default function CreateProductDrawer() {
  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useNewProduct();

  return (
    <>
      <Button
        rounded='full'
        w='fit-content'
        leftIcon={<Icon as={Plus} />}
        onClick={onOpen}
      >
        New Product
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            New Product
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <FormProvider {...form}>
              <form
                id='new-product-form'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CreateProductForm />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter>
            <Button type='submit' form='new-product-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}