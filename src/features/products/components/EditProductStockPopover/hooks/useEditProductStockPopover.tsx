import { productUpdateStockSchema } from "@/schemas";
import {
  type ProductGetAllOutputSingle,
  type ProductUpdateStock,
} from "@/types";
import { getStockUnitTextAbbrev } from "@/utils";
import { api } from "@/utils/api";
import { Text, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function EditProductStockPopover(
  product: ProductGetAllOutputSingle
) {
  const input = {
    productId: product.id,
    prevStock: Number(product.stockLevel.stock),
    newStock: Number(product.stockLevel.stock),
  };

  const form = useForm<ProductUpdateStock>({
    defaultValues: input,
    resolver: zodResolver(productUpdateStockSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => {
      form.reset();
    },
  });

  const { data: logTypes } = api.product.getProductStockRecordTypes.useQuery();
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

    if (logType === "Production" || logType === "Return/Restock") {
      return Number(product.stockLevel.stock) + form.watch("quantity");
    } else if (logType === "Audit") {
      return form.watch("quantity");
    } else if (
      logType === "Product Testing" ||
      logType === "Sale" ||
      logType === "Damage, Theft, or Loss"
    ) {
      return Number(product.stockLevel.stock) - form.watch("quantity");
    } else return Number(product.stockLevel.stock);
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
      disclosure.onClose();
    },
  });

  function onSubmit(data: ProductUpdateStock) {
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
