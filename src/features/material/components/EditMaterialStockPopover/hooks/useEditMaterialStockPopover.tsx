import { useMaterial } from "@/features/material/hooks";
import { materialUpdateStockSchema } from "@/schemas";
import { type MaterialUpdateStock } from "@/types";
import { getStockUnitTextAbbrev } from "@/utils";
import { api } from "@/utils/api";
import { Text, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { InventoryAdjustmentType } from "@prisma/client";
import { useForm } from "react-hook-form";

export default function useEditMaterialStockPopover() {
  const material = useMaterial();

  const form = useForm<MaterialUpdateStock>({
    defaultValues: {
      materialId: material.id,
      previousQuantity: Number(material.stockLevel.stock),
      newQuantity: Number(material.stockLevel.stock),
    },
    resolver: zodResolver(materialUpdateStockSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => {
      form.reset({
        materialId: material.id,
        previousQuantity: Number(material.stockLevel.stock),
        newQuantity: Number(material.stockLevel.stock),
      });
    },
  });

  const { data: logTypes } =
    api.logChangeTypes.getMaterialChangeTypes.useQuery();
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
        return Number(material.stockLevel.stock) + form.watch("quantityChange");
      case InventoryAdjustmentType.DECREASE:
        return Number(material.stockLevel.stock) - form.watch("quantityChange");
      case InventoryAdjustmentType.SET:
        return form.watch("quantityChange");
      default:
        return form.watch("quantityChange");
    }
  }

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.updateStock.useMutation({
    onSuccess: async () => {
      toast({
        title: `Stock updated`,
        description: (
          <Text>
            Stock for{" "}
            <Text as="span" fontWeight="semibold">
              {material.name}
            </Text>{" "}
            has been updated to{" "}
            <Text as="span" fontWeight="semibold">
              {getUpdatedStock()}{" "}
              {getStockUnitTextAbbrev(
                Number(material.stockLevel.stock),
                material.stockLevel.stockUnit
              )}
            </Text>
            .
          </Text>
        ),
        status: "success",
      });
      await utils.material.getAll.invalidate();
      await utils.material.getHistory.invalidate();
      disclosure.onClose();
    },
  });

  function onSubmit(data: MaterialUpdateStock) {
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
