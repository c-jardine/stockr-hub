import { api } from '@/utils/api';

export default function useMaterialHistory(id: string) {
  const query = api.material.getHistory.useQuery({ id });

  return { query };
}
