import { DeleteRows } from '@/components/DeleteRows';
import { type ProductGetAllOutput } from '@/types';
import { type RowSelectionState } from '@tanstack/react-table';
import { useDeleteProductRows } from './hooks';

export interface DeleteProductRowsProps {
  products: ProductGetAllOutput;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  rowSelection: RowSelectionState;
}

export default function DeleteProductRows(props: DeleteProductRowsProps) {
  const { selectedRowIndexes, onDelete } = useDeleteProductRows(props);

  return (
    <DeleteRows
      isVisible={selectedRowIndexes.length > 0}
      onDeleteRows={onDelete}
    />
  );
}
