import { selectComponents } from '@/components/Select/components';
import { useCreateVendor } from '@/hooks/vendor';
import { selectStyles } from '@/styles';
import { type MaterialCreate, type MaterialUpdate } from '@/types';
import { api } from '@/utils/api';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * An input for material vendors.
 */
export default function VendorsInput() {
  const vendorsQuery = api.vendor.getAll.useQuery();
  const options = vendorsQuery.data?.map((vendor) => ({
    label: vendor.name,
    value: vendor.id,
  }));

  const {
    control,
    formState: { errors },
  } = useFormContext<MaterialCreate | MaterialUpdate>();

  const { query: createVendorQuery } = useCreateVendor();
  function onCreate(inputValue: string) {
    createVendorQuery.mutate({ name: inputValue });
  }

  return (
    <FormControl isInvalid={!!errors.vendorId}>
      <FormLabel>Vendor</FormLabel>
      <Controller
        control={control}
        name='vendorId'
        render={({ field }) => (
          <CreatableSelect
            {...field}
            menuPlacement='auto'
            options={options}
            value={options?.find((c) => c.value === field.value)}
            onChange={(selected) => field.onChange(selected?.value)}
            onCreateOption={onCreate}
            styles={selectStyles}
            components={selectComponents}
          />
        )}
      />
      {errors.vendorId && (
        <FormErrorMessage>{errors.vendorId.message}</FormErrorMessage>
      )}
    </FormControl>
  );
}
