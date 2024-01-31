import { EditStockPopover } from '@/components/EditStockPopover';
import {
  type ProductGetAllOutputSingle,
  type ProductUpdateStock,
} from '@/types';
import { FormProvider } from 'react-hook-form';
import { useEditProductStockPopover } from './hooks';

export default function EditProductStockPopover(
  product: ProductGetAllOutputSingle
) {
  const { disclosure, form, options, onSubmit, getUpdatedStock } =
    useEditProductStockPopover(product);

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
