import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import useDeleteProduct from "./hooks/useDeleteProduct";

export default function DeleteProduct() {
  const deleteProduct = useDeleteProduct();

  return <ConfirmDeleteModal {...deleteProduct} />;
}
