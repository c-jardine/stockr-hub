import { type ProductCreate, type ProductUpdate } from '@/types';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export default function useCreateProductCategory() {
  const form = useFormContext<ProductCreate | ProductUpdate>();

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.product.createCategory.useMutation({
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
      await utils.product.getAllCategories.invalidate();
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
