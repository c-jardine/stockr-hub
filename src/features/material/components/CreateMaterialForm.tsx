import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { type MaterialCreate } from '@/types';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MaterialCategoriesInput, VendorsInput } from '.';
import StockUnitInput from './StockUnitInput';

export default function CreateMaterialForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MaterialCreate>();

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
        <StockUnitInput />
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
      <VendorsInput />
      <MaterialCategoriesInput />
    </Stack>
  );
}
