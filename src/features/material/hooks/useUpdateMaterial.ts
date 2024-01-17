import { materialUpdateSchema } from '@/schemas';
import { type MaterialGetAllOutputSingle, type MaterialUpdate } from '@/types';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useUpdateMaterial(
  material: MaterialGetAllOutputSingle
) {
  const input: MaterialUpdate | undefined = {
    id: material.id,
    itemDetails: {
      name: material.itemDetails.name,
      minStock: Number(material.itemDetails.minStock),
    },
    url: material.url ?? '',
    vendorId: material.vendor.id,
    categoryIds: material.categories.map((category) => category.id),
  };

  const form = useForm<MaterialUpdate>({
    defaultValues: input,
    resolver: zodResolver(materialUpdateSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => form.reset(input),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const updateQuery = api.material.update.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Material updated',
        description: 'Successfully updated material',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      disclosure.onClose();
    },
  });

  const deleteQuery = api.material.delete.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Material deleted',
        description: 'Successfully deleted material',
        status: 'success',
      });
      await utils.material.getAll.invalidate();
      disclosure.onClose();
    },
  });

  function onSubmit(data: MaterialUpdate) {
    updateQuery.mutate(data);
  }

  function onDelete() {
    deleteQuery.mutate({ id: material.id });
  }

  return { form, onSubmit, onDelete, disclosure };
}
