import { productUpdateStockSchema } from "@/schemas";
import {
  type ProductGetAllOutputSingle,
  type ProductUpdateStock,
} from "@/types";
import { getStockUnitTextAbbrev } from "@/utils";
import { api } from "@/utils/api";
import { Text, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryAdjustmentType } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function EditProductStockPopover(
  product: ProductGetAllOutputSingle
) {
  const form = useForm<ProductUpdateStock>({
    defaultValues: {
      productId: product.id,
      previousQuantity: Number(product.stockLevel.stock),
      newQuantity: Number(product.stockLevel.stock),
    },
    resolver: zodResolver(productUpdateStockSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => {
      form.reset({
        productId: product.id,
        previousQuantity: Number(product.stockLevel.stock),
        newQuantity: Number(product.stockLevel.stock),
      });
    },
  });

  const { data: logTypes } =
    api.logChangeTypes.getProductChangeTypes.useQuery();
  const logTypeOptions =
    logTypes?.map((type) => ({
      label: type.name,
      value: type.id,
    })) ?? [];

  function getUpdatedStock() {
    const logTypeId = form.watch("changeTypeId");
    const logType = logTypes?.find((type) => logTypeId === type.id);

    switch (logType?.adjustmentType) {
      case InventoryAdjustmentType.INCREASE:
        return Number(product.stockLevel.stock) + form.watch("quantityChange");
      case InventoryAdjustmentType.DECREASE:
        return Number(product.stockLevel.stock) - form.watch("quantityChange");
      case InventoryAdjustmentType.SET:
        return form.watch("quantityChange");
      default:
        return form.watch("quantityChange");
    }
  }

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.product.updateStock.useMutation({
    onSuccess: async () => {
      toast({
        title: `Stock updated`,
        description: (
          <Text>
            Stock for{" "}
            <Text as="span" fontWeight="semibold">
              {product.name}
            </Text>{" "}
            has been updated to{" "}
            <Text as="span" fontWeight="semibold">
              {getUpdatedStock()}{" "}
              {getStockUnitTextAbbrev(
                Number(product.stockLevel.stock),
                product.stockLevel.stockUnit
              )}
            </Text>
            .
          </Text>
        ),
        status: "success",
      });
      await utils.product.getAll.invalidate();
      await utils.product.getHistory.invalidate();
      disclosure.onClose();
    },
  });

  function onSubmit(data: ProductUpdateStock) {
    const newQuantity = getUpdatedStock();
    query.mutate({ ...data, newQuantity });
  }

  return {
    disclosure,
    form,
    options: logTypeOptions,
    onSubmit,
    getUpdatedStock,
  };
}
