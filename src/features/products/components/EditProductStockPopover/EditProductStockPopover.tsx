import { EditStockPopover } from "@/components/EditStockPopover";
import { type ProductUpdateStock } from "@/types";
import { FormProvider } from "react-hook-form";
import { useProduct } from "../../hooks";
import { useEditProductStockPopover } from "./hooks";

export default function EditProductStockPopover() {
  const product = useProduct();

  const { disclosure, form, options, onSubmit, getUpdatedStock } =
    useEditProductStockPopover();

  return (
    <FormProvider {...form}>
      <EditStockPopover<ProductUpdateStock>
        {...product}
        disclosure={disclosure}
        logTypeOptions={options}
        getUpdatedStock={getUpdatedStock}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
