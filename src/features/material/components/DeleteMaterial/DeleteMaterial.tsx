import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { useDeleteMaterial } from "./hooks";

export default function DeleteMaterial() {
  const deleteMaterial = useDeleteMaterial();

  return <ConfirmDeleteModal {...deleteMaterial} />;
}
