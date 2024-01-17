import { DisplayOnlyInput } from '@/components/DisplayOnlyInput';
import { Input } from '@/components/Input';
import { NumberInput } from '@/components/NumberInput';
import { type MaterialGetAllOutputSingle, type MaterialUpdate } from '@/types';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MaterialCategoriesInput, VendorsInput } from '.';

export default function UpdateMaterialForm(props: MaterialGetAllOutputSingle) {
  const {
    register,
    formState: { errors },
  } = useFormContext<MaterialUpdate>();

  return (
    <Stack spacing={4}>
      {/* Name input */}
      <Input label='Name' name='name' register={register} error={errors.name} />
      {/* Url input */}
      <Input label='URL' name='url' register={register} error={errors.url} />

      <SimpleGrid columns={5} gap={4}>
        {/* Stock input */}
        <DisplayOnlyInput
          isDisabled
          label='Stock'
          value={Number(props.stockLevel.stock)}
          styles={{
            gridColumn: '1 / span 3',
          }}
        />

        {/* Stock unit input */}
        <DisplayOnlyInput
          isDisabled
          label='Stock unit'
          value={props.stockLevel.stockUnit.namePlural}
          styles={{
            gridColumn: '4 / span 2',
          }}
        />
      </SimpleGrid>

      {/* Min stock input */}
      <NumberInput
        label='Min. Stock'
        name='stockLevel.minStock'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.stockLevel?.minStock}
      />

      {/* Cost per unit input */}
      <DisplayOnlyInput
        isDisabled
        label='Cost per unit'
        value={Number(props.costPerUnit)}
      />

      {/* Vendor input */}
      <VendorsInput />

      {/* Categories input */}
      <MaterialCategoriesInput />
    </Stack>
  );
}
