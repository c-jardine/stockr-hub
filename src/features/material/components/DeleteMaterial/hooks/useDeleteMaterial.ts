import { useMaterial } from "@/features/material/hooks";
import { api } from "@/utils/api";
import { useDisclosure, useToast } from "@chakra-ui/react";

export default function useDeleteMaterial() {
  const material = useMaterial();

  const toast = useToast();

  const disclosure = useDisclosure();

  const utils = api.useUtils();
  const deleteQuery = api.material.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: "Material deleted",
        description: "Successfully deleted material",
        status: "success",
      });
      await utils.material.getAll.invalidate();
      disclosure.onClose();
    },
  });

  function onDelete() {
    deleteQuery.mutate({ id: material.id });
  }

  return { onDelete, disclosure };
}
