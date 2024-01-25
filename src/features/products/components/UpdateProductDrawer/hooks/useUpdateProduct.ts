import { productUpdateSchema } from '@/schemas';
import { type ProductGetAllOutputSingle, type ProductUpdate } from '@/types';
import { api } from '@/utils/api';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function useUpdateProduct(product: ProductGetAllOutputSingle) {
  const input: ProductUpdate | undefined = {
    id: product.id,
    name: product.name,
    stockLevel: {
      minStock: Number(product.stockLevel.minStock),
    },
    materials: product.materials.map((material) => ({
      materialId: material.materialId,
      quantity: Number(material.quantity),
    })),
    batchSize: product.batchSize,
    retailPrice: Number(product.retailPrice),
    wholesalePrice: Number(product.wholesalePrice),
    categoryIds: product.categories.map((category) => category.id),
  };

  const form = useForm<ProductUpdate>({
    defaultValues: input,
    resolver: zodResolver(productUpdateSchema),
  });

  const disclosure = useDisclosure({
    onOpen: () => form.reset(input),
  });

  const toast = useToast();

  const utils = api.useUtils();
  const updateQuery = api.product.update.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Product updated',
        description: 'Successfully updated product',
        status: 'success',
      });
      await utils.product.getAll.invalidate();
      disclosure.onClose();
    },
  });

  function onSubmit(data: ProductUpdate) {
    updateQuery.mutate(data);
  }

  return { form, onSubmit, disclosure };
}
