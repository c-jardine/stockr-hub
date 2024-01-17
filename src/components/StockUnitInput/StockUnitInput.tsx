import { selectComponents } from '@/components/Select/components';
import { useGetAllStockUnits } from '@/hooks/stockUnit';
import { selectStyles } from '@/styles';
import { type MaterialCreate } from '@/types';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';

export default function StockUnitInput() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<MaterialCreate>();

  const { selectOptions } = useGetAllStockUnits();

  return (
    <FormControl isInvalid={!!errors.stockUnitId} gridColumn='4 / span 2'>
      <FormLabel>Stock unit</FormLabel>
      <Controller
        control={control}
        name='stockUnitId'
        render={({ field }) => (
          <Select
            {...field}
            menuPlacement='auto'
            options={selectOptions}
            value={selectOptions
              ?.flatMap((group) => group.options)
              .find((unitOption) => unitOption.value === field.value)}
            onChange={(data) => {
              if (data) {
                field.onChange(data.value);
                setValue('stockUnitId', data.value);
              }
            }}
            styles={selectStyles}
            components={selectComponents}
          />
        )}
      />
    </FormControl>
  );
}
