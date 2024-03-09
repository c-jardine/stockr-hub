import { api } from "@/utils/api";

export default function useStockAdjustmentTypes() {
  const materialChangeTypesQuery =
    api.logChangeTypes.getMaterialChangeTypes.useQuery();

  const productChangeTypesQuery =
    api.logChangeTypes.getProductChangeTypes.useQuery();

  return { materialChangeTypesQuery, productChangeTypesQuery };
}
