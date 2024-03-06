import { type MaterialCreate, type MaterialUpdate } from '@/types';
import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export default function useCreateVendor() {
  const toast = useToast();

  const { setValue } = useFormContext<MaterialCreate | MaterialUpdate>();

  const utils = api.useUtils();
  const query = api.vendor.create.useMutation({
    onError: (data) => {
      toast({
        title: 'Error',
        description: `Error: ${data.message}`,
        status: 'error',
      });
    },
    onSuccess: async (data) => {
      toast({
        title: 'Vendor created',
        description: `Created vendor: ${data.name}`,
        status: 'success',
      });
      setValue('vendorId', data.id);
      await utils.vendor.getAll.invalidate();
    },
  });

  return { query };
}
