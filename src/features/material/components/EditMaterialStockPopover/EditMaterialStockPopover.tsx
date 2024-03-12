import { EditStockPopover } from "@/components/EditStockPopover";
import { type MaterialUpdateStock } from "@/types";
import { FormProvider } from "react-hook-form";
import { useEditMaterialStockPopover } from "./hooks";

export default function EditMaterialStockPopover() {
  const { disclosure, form, options, onSubmit, getUpdatedStock } =
    useEditMaterialStockPopover();

  return (
    <FormProvider {...form}>
      <EditStockPopover<MaterialUpdateStock>
        disclosure={disclosure}
        logTypeOptions={options}
        getUpdatedStock={getUpdatedStock}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
