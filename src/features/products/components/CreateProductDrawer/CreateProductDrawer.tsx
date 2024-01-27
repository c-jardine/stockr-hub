import { DrawerHeader } from '@/components/DrawerHeader';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { Plus } from 'tabler-icons-react';
import { CreateProductForm } from '..';
import { useNewProduct } from './hooks';

export default function CreateProductDrawer() {
  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useNewProduct();

  return (
    <>
      <Button
        display={{ base: 'none', md: 'flex' }}
        rounded='full'
        w='fit-content'
        leftIcon={<Icon as={Plus} strokeWidth={4} />}
        onClick={onOpen}
      >
        New Product
      </Button>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        rounded='full'
        w='fit-content'
        icon={<Icon as={Plus} strokeWidth={4} />}
        aria-label='Add product'
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.Content>
              <DrawerHeader.Title>New Product</DrawerHeader.Title>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
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
