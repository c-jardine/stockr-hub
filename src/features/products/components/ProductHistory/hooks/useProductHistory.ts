import { api } from '@/utils/api';

export default function useProductHistory(id: string) {
  const query = api.product.getHistory.useQuery({ id });

  return { query };
}
