import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { type MaterialGetAllOutputSingle } from '@/types';
import { useDeleteMaterial } from './hooks';

export default function DeleteMaterial(props: MaterialGetAllOutputSingle) {
  const { onDelete, disclosure } = useDeleteMaterial(props);

  return (
    <ConfirmDeleteModal
      name={props.name}
      onDelete={onDelete}
      disclosure={disclosure}
    />
  );
}
