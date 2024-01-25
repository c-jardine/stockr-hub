import { type ProductGetAllOutputSingle } from '@/types';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';

export default function useDeleteProduct(product: ProductGetAllOutputSingle) {
  const toast = useToast();

  const disclosure = useDisclosure();

  const utils = api.useUtils();
  const deleteQuery = api.product.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Product deleted',
        description: 'Successfully deleted product',
        status: 'success',
      });
      await utils.product.getAll.invalidate();
      disclosure.onClose();
    },
  });

  function onDelete() {
    deleteQuery.mutate({ id: product.id });
  }

  return { onDelete, disclosure };
}
