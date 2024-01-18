import { NumberInput } from '@/components/NumberInput';
import { selectComponents } from '@/components/Select/components';
import { selectStyles } from '@/styles';
import { Button, Icon, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller } from 'react-hook-form';
import { Plus, X } from 'tabler-icons-react';
import { useProductMaterialsFieldArray } from '../hooks';

export default function ProductMaterialsFieldArray() {
  const { form, fieldArray, options } = useProductMaterialsFieldArray();

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  const { fields, append, remove } = fieldArray;

  return (
    <>
      {fields.length === 0 && (
        <Text
          color='slate.500'
          fontSize='sm'
          fontStyle='italic'
          textAlign='center'
        >
          No materials added
        </Text>
      )}
      {fields.map((field, index) => (
        <SimpleGrid key={field.id} gridTemplateColumns={'2fr 1fr auto'} gap={4}>
          <Controller
            control={control}
            name={`materials.${index}.materialId`}
            render={({ field }) => (
              <Select
                {...field}
                placeholder='Select material'
                options={options}
                value={options?.find((c) => c.value === field.value)}
                onChange={(data) => {
                  if (data) {
                    field.onChange(data.value);
                    setValue(`materials.${index}.materialId`, data.value);
                  }
                }}
                chakraStyles={selectStyles}
                components={selectComponents}
              />
            )}
          />
          <NumberInput
            name={`materials.${index}.quantity`}
            register={register}
            error={errors.materials?.[index]?.quantity}
          />
          <IconButton
            icon={<Icon as={X} />}
            aria-label='Delete material'
            variant='outline'
            colorScheme='black'
            onClick={() => remove(index)}
          />
        </SimpleGrid>
      ))}
      <Button
        gap={2}
        variant='outline'
        colorScheme='black'
        onClick={() => append({ materialId: '', quantity: '' })}
      >
        <Icon as={Plus} strokeWidth={3} />
        Add material
      </Button>
    </>
  );
}
