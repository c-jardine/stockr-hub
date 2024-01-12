import { api } from '@/utils/api';
import { useToast } from '@chakra-ui/react';

export default function useCreateVendor() {
  const toast = useToast();

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
      await utils.vendor.getAll.invalidate();
    },
  });

  return { query };
}
