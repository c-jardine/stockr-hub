import { materialUpdateCategoriesSchema } from '@/schemas';
import {
  type MaterialCategoriesUpdate,
  type ProductCategoriesUpdate,
} from '@/types';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Category } from '@prisma/client';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { Edit, Plus, Trash } from 'tabler-icons-react';
import { ColorPicker } from '../ColorPicker';
import { DrawerHeader } from '../DrawerHeader';

export default function EditCategories<T extends { category: Category }[]>({
  categories,
  onUpdate,
}: {
  categories: T | undefined;
  onUpdate: (data: MaterialCategoriesUpdate | ProductCategoriesUpdate) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<MaterialCategoriesUpdate>({
    defaultValues: {
      categories: categories?.map((category) => ({
        id: category.category.id,
        name: category.category.name,
        color: category.category.color,
      })),
    },
    resolver: zodResolver(materialUpdateCategoriesSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'categories',
  });

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
          <DrawerHeader.Base>
            <DrawerHeader.CloseButton />
            <DrawerHeader.Content>
              <DrawerHeader.Title>Edit categories</DrawerHeader.Title>
            </DrawerHeader.Content>
          </DrawerHeader.Base>
          <DrawerBody>
            <FormProvider {...form}>
              <Stack
                as='form'
                id='update-categories-form'
                onSubmit={form.handleSubmit(onUpdate)}
              >
                {fields.map((field, index) => (
                  <FormControl
                    key={field.id}
                    isInvalid={!!form.formState.errors.categories?.[index]}
                  >
                    <Flex gap={2}>
                      <ColorPicker name={`categories.${index}.color`} />
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
                        {
                          form.formState.errors.categories?.[index]?.name
                            ?.message
                        }
                      </FormErrorMessage>
                    )}
                  </FormControl>
                ))}
                {form.watch('categories')?.length === 0 ? (
                  <Text fontSize='sm' fontStyle='italic' textAlign='center'>
                    You haven't added any categories.
                  </Text>
                ) : (
                  <Divider my={2} />
                )}
                <Button
                  variant='outline'
                  leftIcon={<Icon as={Plus} strokeWidth={4} />}
                  onClick={() => append({ id: '', name: '', color: '#cbd5e1' })}
                >
                  Add new
                </Button>
              </Stack>
            </FormProvider>
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
