import { type MaterialCategoriesUpdate } from '@/types';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';

export default function useEditMaterialCategories() {
  const { data: categories } = api.material.getAllCategories.useQuery();

  const toast = useToast();

  const utils = api.useUtils();
  const updateQuery = api.material.updateCategories.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Categories updated',
        description: 'Successfully updated categories',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      await utils.material.getAllCategories.invalidate();
      // onClose();
    },
  });

  function onUpdate(data: MaterialCategoriesUpdate) {
    updateQuery.mutate(data);
  }

  return { categories, onUpdate };
}
