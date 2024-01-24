import { UpdateMaterialForm } from '@/features/material';
import { type MaterialGetAllOutputSingle } from '@/types';
import { getIsLowStock } from '@/utils';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Link,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useUpdateMaterial } from './hooks';

export default function UpdateMaterialDrawer(
  props: MaterialGetAllOutputSingle & { buttonLabel?: string }
) {
  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useUpdateMaterial(props);

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
                <UpdateMaterialForm {...props} />
              </form>
            </FormProvider>
          </DrawerBody>
          <DrawerFooter>
            <Button type='submit' form='update-material-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
