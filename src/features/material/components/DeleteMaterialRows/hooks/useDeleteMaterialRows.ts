import { api } from '@/utils/api';
import { type DeleteMaterialRowsProps } from '../DeleteMaterialRows';

export default function useDeleteMaterialRows({
  materials,
  setRowSelection,
  rowSelection,
}: DeleteMaterialRowsProps) {
  const selectedRowIndexes = Object.keys(rowSelection);

  const utils = api.useUtils();
  const deleteQuery = api.material.deleteMany.useMutation({
    onSuccess: async () => {
      await utils.material.getAll.invalidate();
      setRowSelection({}); // Clear selected rows.
    },
  });

  function onDelete() {
    const indexes = selectedRowIndexes.map((index) => Number(index));
    const selectedMaterials = materials
      .filter((_, index) => indexes.includes(index))
      .map((material) => material.id);

    deleteQuery.mutate(selectedMaterials);
  }

  return { selectedRowIndexes, onDelete };
}
