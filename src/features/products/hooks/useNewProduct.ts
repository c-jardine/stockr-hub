import { materialCreateSchema } from '@/schemas';
import { type MaterialCreate } from '@/types';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useNewProduct() {
  const form = useForm<MaterialCreate>({
    resolver: zodResolver(materialCreateSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => form.reset(),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.material.create.useMutation({
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

  function onSubmit(data: MaterialCreate) {
    query.mutate(data);
  }

  return { form, onSubmit, disclosure };
}
