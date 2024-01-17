import { multiSelectComponents } from '@/components/Select/components';
import { useCreateMaterialCategory } from '@/hooks/material';
import { multiSelectStyles } from '@/styles';
import { type MaterialCreate, type MaterialUpdate } from '@/types';
import { api } from '@/utils/api';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';

export default function MaterialCategoriesInput() {
  const categoriesQuery = api.material.getAllCategories.useQuery();
  const options = categoriesQuery.data?.map((category) => ({
    label: category.category.name,
    value: category.id,
  }));

  const {
    control,
    formState: { errors },
  } = useFormContext<MaterialCreate | MaterialUpdate>();

  const { query: createCategoryQuery } = useCreateMaterialCategory();
  function onCreate(input: string) {
    createCategoryQuery.mutate({ name: input });
  }

  return (
    <FormControl isInvalid={!!errors.categoryIds}>
      <FormLabel>Categories</FormLabel>
      <Controller
        control={control}
        name='categoryIds'
        render={({ field }) => (
          <CreatableSelect
            {...field}
            isMulti
            menuPlacement='top'
            options={options}
            value={options?.filter((o) => field.value?.includes(o.value))}
            onChange={(e) => {
              field.onChange(e.map((c) => c.value));
            }}
            onCreateOption={onCreate}
            styles={multiSelectStyles}
            components={multiSelectComponents}
          />
        )}
      />
      {errors.categoryIds && (
        <FormErrorMessage>{errors.categoryIds.message}</FormErrorMessage>
      )}
    </FormControl>
  );
}
