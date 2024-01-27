import { EditStockPopover } from '@/components/EditStockPopover';
import {
  type MaterialGetAllOutputSingle,
  type MaterialUpdateStock,
} from '@/types';
import { FormProvider } from 'react-hook-form';
import { useEditMaterialStockPopover } from './hooks';

export default function EditMaterialStockPopover(
  material: MaterialGetAllOutputSingle
) {
  const { disclosure, form, options, onSubmit, getUpdatedStock } =
    useEditMaterialStockPopover(material);

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
