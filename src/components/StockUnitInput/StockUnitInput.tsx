import { selectComponents } from '@/components/Select/components';
import { useGetAllStockUnits } from '@/hooks/stockUnit';
import { type MaterialCreate, type ProductCreate } from '@/server/api/routers';
import { selectStyles } from '@/styles';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';

export default function StockUnitInput() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<MaterialCreate | ProductCreate>();

  const { selectOptions } = useGetAllStockUnits();

  return (
    <FormControl
      isInvalid={!!errors.stockLevel?.stockUnitId}
      gridColumn='4 / span 2'
    >
      <FormLabel>Stock unit</FormLabel>
      <Controller
        control={control}
        name='stockLevel.stockUnitId'
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
                setValue('stockLevel.stockUnitId', data.value);
              }
            }}
            chakraStyles={selectStyles}
            components={selectComponents}
          />
        )}
      />
    </FormControl>
  );
}
