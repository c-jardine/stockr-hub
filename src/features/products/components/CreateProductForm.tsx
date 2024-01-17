import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { StockUnitInput } from '@/components/StockUnitInput';
import { type ProductCreate } from '@/types';
import { SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ProductCategoriesInput } from '.';
// import { MaterialCategoriesInput, VendorsInput } from '.';
// import StockUnitInput from './StockUnitInput';

export default function CreateProductForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductCreate>();

  return (
    <Stack spacing={4}>
      <Input label='Name' name='name' register={register} error={errors.name} />
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
      <Text fontSize='2xl' fontWeight='bold'>
        Production
      </Text>
      <NumberInput
        label='Batch size'
        name='batchSize'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.batchSize}
      />
      <NumberInput
        label='MSRP'
        name='retailPrice'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.retailPrice}
      />
      <NumberInput
        label='Wholesale price'
        name='wholesalePrice'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.wholesalePrice}
      />
      <ProductCategoriesInput />
    </Stack>
  );
}
