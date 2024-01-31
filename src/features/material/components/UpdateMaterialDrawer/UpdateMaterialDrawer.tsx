import { DrawerHeader } from '@/components/DrawerHeader';
import { useAppStateContext } from '@/contexts/AppStateContext/AppStateContext';
import { UpdateMaterialForm } from '@/features/material';
import { type MaterialGetAllOutputSingle } from '@/types';
import { getIsLowStock } from '@/utils';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';
import { useUpdateMaterial } from './hooks';

export default function UpdateMaterialDrawer(
  props: MaterialGetAllOutputSingle & { buttonLabel?: string }
) {
  const appState = useAppStateContext();

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
        appState?.auditState.inProgress ? (
          <Tooltip label='Audit in progress'>
            <Button
              isDisabled
              variant='outline'
              colorScheme='black'
              width='fit-content'
              onClick={onOpen}
            >
              {props.buttonLabel}
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant='outline'
            colorScheme='black'
            width='fit-content'
            onClick={onOpen}
          >
            {props.buttonLabel}
          </Button>
        )
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
            <DrawerHeader.CloseButton />
            <DrawerHeader.Content>
              <DrawerHeader.Title>Edit {props.name}</DrawerHeader.Title>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
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
