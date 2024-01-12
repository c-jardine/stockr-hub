import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { CreatableMultiSelect, CreatableSelect, MultiSelect, Select } from '@/components/Select';
import { useCreateVendor } from '@/hooks/vendor';
import { type MaterialInput } from '@/types';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useMaterialFormSelects } from '../hooks';

export default function MutateMaterialForm() {
  const { stockUnits, vendors, categories } = useMaterialFormSelects();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<MaterialInput>();

  const { query: createVendorQuery } = useCreateVendor();
  function onCreateVendor(inputValue: string) {
    createVendorQuery.mutate({ name: inputValue });
  }

  return (
    <Stack spacing={4}>
      <Input
        label='Name'
        name='itemDetails.name'
        register={register}
        error={errors.itemDetails?.name}
      />
      <Input label='URL' name='url' register={register} error={errors.url} />
      <SimpleGrid columns={5} gap={4}>
        <NumberInput
          gridColumn='1 / span 3'
          label='Stock Level'
          name='itemDetails.stock'
          register={register}
          rules={{ valueAsNumber: true }}
          error={errors.itemDetails?.stock}
        />
        {stockUnits && (
          <Select
            gridColumn='4 / span 2'
            label='Stock Unit'
            name='stockUnitId'
            control={control}
            error={errors.stockUnitId}
            options={stockUnits}
          />
        )}
      </SimpleGrid>
      <NumberInput
        label='Min. Stock'
        name='itemDetails.minStock'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.itemDetails?.minStock}
      />
      <NumberInput
        label='Cost Per Unit'
        name='itemDetails.costPerUnit'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.itemDetails?.costPerUnit}
      />
      {vendors && (
        <CreatableSelect
          label='Vendor'
          name='vendorId'
          control={control}
          error={errors.vendorId}
          options={vendors}
          onCreate={onCreateVendor}
        />
      )}
      {categories && (
        <CreatableMultiSelect
          label='Categories'
          name='categoryIds'
          control={control}
          error={errors.categoryIds}
          options={categories}
        />
      )}
    </Stack>
  );
}
