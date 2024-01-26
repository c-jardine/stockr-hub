import { materialUpdateCategoriesSchema } from '@/schemas';
import { type MaterialCategoriesUpdate } from '@/types';
import { api } from '@/utils/api';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Category } from '@prisma/client';
import { useFieldArray, useForm } from 'react-hook-form';
import { Edit, Plus, Trash } from 'tabler-icons-react';

export default function EditCategories<T extends { category: Category }[]>({
  categories,
}: {
  categories: T | undefined;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<MaterialCategoriesUpdate>({
    defaultValues: {
      categories: categories?.map((category) => ({
        id: category.category.id,
        name: category.category.name,
      })),
    },
    resolver: zodResolver(materialUpdateCategoriesSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'categories',
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.updateCategories.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Categories updated',
        description: 'Successfully updated categories',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      await utils.material.getAllCategories.invalidate();
      onClose();
    },
  });

  function onSubmit(data: MaterialCategoriesUpdate) {
    query.mutate(data);
  }

  return (
    <>
      <Button
        variant='outline'
        colorScheme='sky'
        leftIcon={<Icon as={Edit} boxSize={4} />}
        aria-label='Edit categories'
        rounded='full'
        onClick={onOpen}
      >
        Edit categories
      </Button>
      <Drawer {...{ isOpen, onClose }} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Edit categories</DrawerHeader>
          <DrawerBody>
            <Stack
              as='form'
              id='update-categories-form'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {fields.map((field, index) => (
                <FormControl
                  key={field.id}
                  isInvalid={!!form.formState.errors.categories?.[index]}
                >
                  <Flex gap={2}>
                    <Input
                      fontSize='sm'
                      {...form.register(`categories.${index}.name`)}
                    />
                    <IconButton
                      variant='outline'
                      colorScheme='red'
                      icon={<Icon as={Trash} boxSize={4} />}
                      aria-label={`Delete category: ${field.name}`}
                      onClick={() => remove(index)}
                    />
                  </Flex>
                  {form.formState.errors.categories?.[index]?.name && (
                    <FormErrorMessage>
                      {form.formState.errors.categories?.[index]?.name?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              ))}
              <Divider my={2} />
              <Button
                variant='outline'
                leftIcon={<Icon as={Plus} strokeWidth={4} />}
                onClick={() => append({ id: '', name: '' })}
              >
                Add new
              </Button>
            </Stack>
          </DrawerBody>
          <DrawerFooter gap={2}>
            <Button variant='outline'>Cancel</Button>
            <Button type='submit' form='update-categories-form'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
