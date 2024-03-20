import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { useDeleteMaterial } from "./hooks";

export default function DeleteMaterial() {
  const { onDelete, disclosure } = useDeleteMaterial();

  return <ConfirmDeleteModal onDelete={onDelete} disclosure={disclosure} />;
}
