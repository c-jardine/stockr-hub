import { DrawerHeader } from '@/components/DrawerHeader';
import { type ProductGetAllOutputSingle } from '@/types';
import { getIsLowStock } from '@/utils';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Link,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { UpdateProductForm } from '../UpdateProductForm';
import { useUpdateProduct } from './hooks';

export default function UpdateProductDrawer(
  props: ProductGetAllOutputSingle & { buttonLabel?: string }
) {
  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useUpdateProduct(props);

  const isLowStock = getIsLowStock(
    Number(props.stockLevel.stock),
    Number(props.stockLevel.minStock)
  );

  return (
    <>
      {props.buttonLabel ? (
        <Button
          variant='outline'
          colorScheme='black'
          width='fit-content'
          onClick={onOpen}
        >
          {props.buttonLabel}
        </Button>
      ) : (
        <Link
          onClick={onOpen}
          color={isLowStock ? 'red.500' : 'unset'}
          fontWeight='semibold'
        >
          {props.name}
        </Link>
      )}
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.Title>Edit {props.name}</DrawerHeader.Title>
          </DrawerHeader.Base>
          <DrawerBody>
            <FormProvider {...form}>
              <form
                id='update-product-form'
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <UpdateProductForm {...props} />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter>
            <Button type='submit' form='update-product-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
