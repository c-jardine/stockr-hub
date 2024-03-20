import { DisplayOnlyInput } from "@/components/DisplayOnlyInput";
import { Input } from "@/components/Input";
import { NumberInput } from "@/components/NumberInput";
import { type ProductUpdate } from "@/types";
import { FormLabel, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ProductCategoriesInput, ProductMaterialsFieldArray } from "..";
import { useProduct } from "../../hooks";

export default function UpdateProductForm() {
  const product = useProduct();

  const {
    register,
    formState: { errors },
  } = useFormContext<ProductUpdate>();

  return (
    <Stack spacing={4}>
      <Input label="Name" name="name" register={register} error={errors.name} />
      <SimpleGrid columns={5} gap={4}>
        {/* Stock input */}
        <DisplayOnlyInput
          isDisabled
          label="Stock"
          value={Number(product.stockLevel.stock)}
          styles={{
            gridColumn: "1 / span 3",
          }}
        />

        {/* Stock unit input */}
        <DisplayOnlyInput
          isDisabled
          label="Stock unit"
          value={product.stockLevel.stockUnit.namePlural}
          styles={{
            gridColumn: "4 / span 2",
          }}
        />
      </SimpleGrid>

      <NumberInput
        label="Min. Stock"
        name="stockLevel.minStock"
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.stockLevel?.minStock}
      />
      <Stack>
        <Text fontSize="2xl" fontWeight="bold">
          Production
        </Text>
        <Text mt={-2} color="slate.500" fontSize="sm">
          Choose the batch size and materials included in a production run. The
          amount of material in each item will be calculated automatically.
        </Text>
        <NumberInput
          label="Batch size"
          name="batchSize"
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
        label="MSRP"
        name="retailPrice"
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.retailPrice}
      />
      <NumberInput
        label="Wholesale price"
        name="wholesalePrice"
        register={register}
        rules={{ valueAsNumber: true }}
        error={errors.wholesalePrice}
      />
      <ProductCategoriesInput />
    </Stack>
  );
}
