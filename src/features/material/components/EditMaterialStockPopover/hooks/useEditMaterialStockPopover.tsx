import { materialUpdateStockSchema } from "@/schemas";
import {
  type MaterialGetAllOutputSingle,
  type MaterialUpdateStock,
} from "@/types";
import { getStockUnitTextAbbrev } from "@/utils";
import { api } from "@/utils/api";
import { Text, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useEditMaterialStockPopover(
  material: MaterialGetAllOutputSingle
) {
  const form = useForm<MaterialUpdateStock>({
    defaultValues: {
      materialId: material.id,
      prevStock: Number(material.stockLevel.stock),
      newStock: Number(material.stockLevel.stock),
    },
    resolver: zodResolver(materialUpdateStockSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => {
      form.reset();
    },
  });

  const { data: logTypes } =
    api.material.getMaterialStockRecordTypes.useQuery();
  const logTypeOptions =
    logTypes?.map((type) => ({
      label: type.name,
      value: type.id,
    })) ?? [];

  function getUpdatedStock() {
    const logTypeId = form.watch("stockLogTypeId");
    const logType = logTypeOptions?.find(
      (option) => option.value === logTypeId
    )?.label;

    if (logType === "Supply Order") {
      return Number(material.stockLevel.stock) + form.watch("quantity");
    } else if (logType === "Audit") {
      return form.watch("quantity");
    } else if (
      logType === "Product Testing" ||
      logType === "Damage, Theft, or Loss"
    ) {
      return Number(material.stockLevel.stock) - form.watch("quantity");
    } else return Number(material.stockLevel.stock);
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
      disclosure.onClose();
    },
  });

  function onSubmit(data: MaterialUpdateStock) {
    const updatedStock = getUpdatedStock();
    query.mutate({ ...data, newStock: updatedStock });
  }

  return {
    disclosure,
    form,
    options: logTypeOptions,
    onSubmit,
    getUpdatedStock,
  };
}
