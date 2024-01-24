import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { StockUnitInput } from '@/components/StockUnitInput';
import { type MaterialCreate } from '@/types';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MaterialCategoriesInput, VendorsInput } from '..';

export default function CreateMaterialForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MaterialCreate>();

  return (
    <Stack spacing={4}>
      <Input
        label='Name'
        name='name'
        register={register}
        error={errors.name}
      />
      <Input label='URL' name='url' register={register} error={errors.url} />
      <SimpleGrid columns={5} gap={4}>
        <NumberInput
          gridColumn='1 / span 3'
          label='Stock Level'
          name='stockLevel.stock'
          register={register}
          rules={{ valueAsNumber: true }}
          error={errors.stockLevel?.stock}
        />
        <StockUnitInput />
      </SimpleGrid>
      <NumberInput
        label='Min. Stock'
        name='stockLevel.minStock'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.stockLevel?.minStock}
      />
      <NumberInput
        label='Cost Per Unit'
        name='costPerUnit'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.costPerUnit}
      />
      <VendorsInput />
      <MaterialCategoriesInput />
    </Stack>
  );
}
