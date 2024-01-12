import { api } from '@/utils/api';

export default function useGetAllStockUnits() {
  const { data: stockUnits } = api.stockUnit.getAll.useQuery();

  return { stockUnits };
}
