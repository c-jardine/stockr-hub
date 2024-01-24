import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { StockUnitInput } from '@/components/StockUnitInput';
import { type ProductCreate } from '@/types';
import { FormLabel, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { ProductCategoriesInput, ProductMaterialsFieldArray } from '..';

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
      <Stack>
        <Text fontSize='2xl' fontWeight='bold'>
          Production
        </Text>
        <Text mt={-2} color='slate.500' fontSize='sm'>
          Choose the batch size and materials included in a production run. The
          amount of material in each item will be calculated automatically.
        </Text>
        <NumberInput
          label='Batch size'
          name='batchSize'
          register={register}
          rules={{ valueAsNumber: true }}
          error={errors.batchSize}
        />
        <Stack>
          <FormLabel mb={0}>Materials</FormLabel>
          <ProductMaterialsFieldArray />
        </Stack>
      </Stack>
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
