import { useProduct } from "@/features/products/hooks";
import { api } from "@/utils/api";
import { useDisclosure, useToast } from "@chakra-ui/react";

export default function useDeleteProduct() {
  const product = useProduct();

  const toast = useToast();

  const disclosure = useDisclosure();

  const utils = api.useUtils();
  const deleteQuery = api.product.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: "Product deleted",
        description: "Successfully deleted product",
        status: "success",
      });
      await utils.product.getAll.invalidate();
      disclosure.onClose();
    },
  });

  function onDelete() {
    deleteQuery.mutate({ id: product.id });
  }

  return { name: product.name, onDelete, disclosure };
}
