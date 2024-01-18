// GenericCategoriesInput.jsx
import { multiSelectComponents } from '@/components/Select/components';
import { multiSelectStyles } from '@/styles';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';
import { type Option } from '../Select';

interface CategoriesInputProps {
  name: string;
  categoryOptions: Option[] | undefined;
  onCreateCategory: (input: string) => void;
}

/**
 * A reusable component for creating and selecting categories.
 */
export function CategoriesInput({
  name,
  categoryOptions,
  onCreateCategory,
}: CategoriesInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel>Categories</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            isMulti
            menuPlacement='top'
            options={categoryOptions}
            value={categoryOptions?.filter((o) => {
              if (Array.isArray(field.value)) {
                return field.value.includes(o.value);
              }
              return false;
            })}
            onChange={(e) => {
              field.onChange(e.map((c) => c.value));
            }}
            onCreateOption={onCreateCategory}
            chakraStyles={multiSelectStyles}
            components={multiSelectComponents}
          />
        )}
      />
      {/* {errors[name] && (
        <FormErrorMessage>{errors[name].message}</FormErrorMessage>
      )} */}
    </FormControl>
  );
}
