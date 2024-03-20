import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import useDeleteProduct from "./hooks/useDeleteProduct";

export default function DeleteProduct() {
  const { onDelete, disclosure } = useDeleteProduct();

  return <ConfirmDeleteModal onDelete={onDelete} disclosure={disclosure} />;
}
