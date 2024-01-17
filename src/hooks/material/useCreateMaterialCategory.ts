import { type MaterialCreate, type MaterialUpdate } from '@/types';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export default function useCreateMaterialCategory() {
  const form = useFormContext<MaterialCreate | MaterialUpdate>();

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.createCategory.useMutation({
    onError: (data) => {
      toast({
        title: 'Error',
        description: `Error: ${data.message}`,
        status: 'error',
      });
    },
    onSuccess: async (data) => {
      toast({
        title: 'Category created',
        description: 'Successfully created category',
        status: 'success',
      });
      await utils.material.getAllCategories.invalidate();
      const prev = form.getValues('categoryIds');
      if (prev) {
        form.setValue('categoryIds', [...prev, data.id]);
      } else {
        form.setValue('categoryIds', [data.id]);
      }
    },
  });

  return { query };
}
