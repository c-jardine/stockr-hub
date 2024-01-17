import { productCreateSchema } from '@/schemas';
import { type ProductCreate } from '@/types';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useNewProduct() {
  const form = useForm<ProductCreate>({
    resolver: zodResolver(productCreateSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => form.reset(),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.product.create.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Product created',
        description: 'Successfully created product',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      disclosure.onClose();
    },
  });

  function onSubmit(data: ProductCreate) {
    query.mutate(data);
  }

  return { form, onSubmit, disclosure };
}
