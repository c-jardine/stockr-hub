import { DrawerHeader } from '@/components/DrawerHeader';
import { CreateMaterialForm } from '@/features/material';
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
import { useNewMaterial } from './hooks';

export default function CreateMaterialDrawer() {
  const {
    form,
    onSubmit,
    disclosure: { isOpen, onOpen, onClose },
  } = useNewMaterial();

  return (
    <>
      <Button
        display={{ base: 'none', md: 'flex' }}
        rounded='full'
        w='fit-content'
        leftIcon={<Icon as={Plus} strokeWidth={4} />}
        onClick={onOpen}
      >
        New Material
      </Button>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        rounded='full'
        w='fit-content'
        icon={<Icon as={Plus} strokeWidth={4} />}
        aria-label='Add material'
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader.Base>
            <DrawerHeader.Content>
              <DrawerHeader.Title>New Material</DrawerHeader.Title>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
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
