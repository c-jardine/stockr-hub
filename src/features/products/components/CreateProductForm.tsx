import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { StockUnitInput } from '@/components/StockUnitInput';
import { type MaterialCreate } from '@/types';
import {
  NumberInput as ChakraNumberInput,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
// import { MaterialCategoriesInput, VendorsInput } from '.';
// import StockUnitInput from './StockUnitInput';

export default function CreateProductForm() {
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
      <Text fontSize='2xl' fontWeight='bold'>
        Production
      </Text>
      <FormControl>
        <FormLabel>Batch size</FormLabel>
        <ChakraNumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </ChakraNumberInput>
      </FormControl>
      {/* <VendorsInput /> */}
      {/* <MaterialCategoriesInput /> */}
    </Stack>
  );
}
