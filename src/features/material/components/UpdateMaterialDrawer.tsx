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
  DrawerOverlay,
  Link,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useUpdateMaterial } from '../hooks';

export default function UpdateMaterialDrawer(
  props: MaterialGetAllOutputSingle
) {
  const {
    form,
    onSubmit,
    onDelete,
    disclosure: { isOpen, onOpen, onClose },
  } = useUpdateMaterial(props);

  const isLowStock = getIsLowStock(
    Number(props.itemDetails.stock),
    Number(props.itemDetails.minStock)
  );

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
                <UpdateMaterialForm {...props} />
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
