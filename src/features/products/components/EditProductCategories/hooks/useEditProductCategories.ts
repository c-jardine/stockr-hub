import { type ProductCategoriesUpdate } from '@/types';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';

export default function useEditProductCategories() {
  const { data: categories } = api.product.getAllCategories.useQuery();

  const toast = useToast();

  const utils = api.useUtils();
  const updateQuery = api.product.updateCategories.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Categories updated',
        description: 'Successfully updated categories',
        status: 'success',
      });
      await utils.product.getAll.invalidate();
      await utils.product.getAllCategories.invalidate();
      // onClose();
    },
  });

  function onUpdate(data: ProductCategoriesUpdate) {
    updateQuery.mutate(data);
  }

  return { categories, onUpdate };
}
