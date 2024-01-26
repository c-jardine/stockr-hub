import { api } from '@/utils/api';
import { type DeleteProductRowsProps } from '../DeleteProductRows';

export default function useDeleteProductRows({
  products,
  setRowSelection,
  rowSelection,
}: DeleteProductRowsProps) {
  const selectedRowIndexes = Object.keys(rowSelection);

  const utils = api.useUtils();
  const deleteQuery = api.product.deleteMany.useMutation({
    onSuccess: async () => {
      await utils.product.getAll.invalidate();
      setRowSelection({}); // Clear selected rows.
    },
  });

  function onDelete() {
    const indexes = selectedRowIndexes.map((index) => Number(index));
    const selectedProducts = products
      .filter((_, index) => indexes.includes(index))
      .map((product) => product.id);

    deleteQuery.mutate(selectedProducts);
  }

  return { selectedRowIndexes, onDelete };
}
