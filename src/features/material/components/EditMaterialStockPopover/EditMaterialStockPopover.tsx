import { EditStockPopover } from "@/components/EditStockPopover";
import { type MaterialUpdateStock } from "@/types";
import { FormProvider } from "react-hook-form";
import { useMaterial } from "../../hooks";
import { useEditMaterialStockPopover } from "./hooks";

export default function EditMaterialStockPopover() {
  const material = useMaterial();

  const { disclosure, form, options, onSubmit, getUpdatedStock } =
    useEditMaterialStockPopover();

  return (
    <FormProvider {...form}>
      <EditStockPopover<MaterialUpdateStock>
        {...material}
        disclosure={disclosure}
        logTypeOptions={options}
        getUpdatedStock={getUpdatedStock}
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
}
