import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { type ProductGetAllOutputSingle } from '@/types';
import useDeleteProduct from './hooks/useDeleteProduct';

export default function DeleteProduct(props: ProductGetAllOutputSingle) {
  const { onDelete, disclosure } = useDeleteProduct(props);

  return (
    <ConfirmDeleteModal
      name={props.name}
      onDelete={onDelete}
      disclosure={disclosure}
    />
  );
}
