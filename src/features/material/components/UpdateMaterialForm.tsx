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
      <Input
        label='Name'
        name='itemDetails.name'
        register={register}
        error={errors.itemDetails?.name}
      />
      {/* Url input */}
      <Input label='URL' name='url' register={register} error={errors.url} />

      <SimpleGrid columns={5} gap={4}>
        {/* Stock input */}
        <DisplayOnlyInput
          isDisabled
          label='Stock'
          value={Number(props.itemDetails.stock)}
          styles={{
            gridColumn: '1 / span 3',
          }}
        />

        {/* Stock unit input */}
        <DisplayOnlyInput
          isDisabled
          label='Stock unit'
          value={props.itemDetails.stockUnit.namePlural}
          styles={{
            gridColumn: '4 / span 2',
          }}
        />
      </SimpleGrid>

      {/* Min stock input */}
      <NumberInput
        label='Min. Stock'
        name='itemDetails.minStock'
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.itemDetails?.minStock}
      />

      {/* Cost per unit input */}
      <DisplayOnlyInput
        isDisabled
        label='Cost per unit'
        value={Number(props.itemDetails.costPerUnit)}
      />

      {/* Vendor input */}
      <VendorsInput />

      {/* Categories input */}
      <MaterialCategoriesInput />
    </Stack>
  );
}
