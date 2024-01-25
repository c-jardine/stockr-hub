import { NumberInput } from '@/components/NumberInput';
import { type Option } from '@/components/Select';
import { selectComponents } from '@/components/Select/components';
import { selectStyles } from '@/styles';
import { type ProductCreate } from '@/types';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  type ButtonProps,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React from 'react';
import {
  Controller,
  type Control,
  type UseFormSetValue,
} from 'react-hook-form';
import { Plus, X } from 'tabler-icons-react';
import { useProductMaterialsFieldArray } from './hooks';

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
      {fields.length === 0 && <NoMaterialsText />}
      {fields.map((field, index) => (
        <SimpleGrid key={field.id} gridTemplateColumns={'2fr 1fr auto'} gap={4}>
          <FormControl isInvalid={!!errors.materials?.[index]?.materialId}>
            <MaterialSelect
              index={index}
              control={control}
              options={options ?? []}
              setValue={setValue}
            />
            {errors.materials?.[index]?.materialId && (
              <FormErrorMessage>
                {errors.materials?.[index]?.materialId?.message}
              </FormErrorMessage>
            )}
          </FormControl>
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
      <AddMaterialButton
        onClick={() => append({ materialId: '', quantity: '' })}
      />
    </>
  );
}

function NoMaterialsText() {
  return (
    <Text color='slate.500' fontSize='sm' fontStyle='italic' textAlign='center'>
      No materials added
    </Text>
  );
}

interface MaterialSelectProps {
  index: number;
  control: Control<ProductCreate>;
  options: Option[];
  setValue: UseFormSetValue<ProductCreate>;
}

function MaterialSelect({
  index,
  control,
  options,
  setValue,
}: MaterialSelectProps) {
  return (
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
  );
}

function AddMaterialButton({
  onClick,
  ...rest
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & ButtonProps) {
  return (
    <Button
      gap={2}
      variant='outline'
      colorScheme='black'
      onClick={onClick}
      {...rest}
    >
      <Icon as={Plus} strokeWidth={3} />
      Add material
    </Button>
  );
}
