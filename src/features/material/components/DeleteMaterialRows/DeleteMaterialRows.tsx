import { DeleteRows } from '@/components/DeleteRows';
import { type MaterialGetAllOutput } from '@/types';
import { type RowSelectionState } from '@tanstack/react-table';
import { useDeleteMaterialRows } from './hooks';

export interface DeleteMaterialRowsProps {
  materials: MaterialGetAllOutput;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  rowSelection: RowSelectionState;
}

export default function DeleteMaterialRows(props: DeleteMaterialRowsProps) {
  const { selectedRowIndexes, onDelete } = useDeleteMaterialRows(props);

  return (
    <DeleteRows
      isVisible={selectedRowIndexes.length > 0}
      onDeleteRows={onDelete}
    />
  );
}
