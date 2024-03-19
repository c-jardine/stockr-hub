import { useProduct } from "@/features/products/hooks";
import { api } from "@/utils/api";

export default function useProductHistory() {
  const product = useProduct();

  const query = api.product.getHistory.useQuery({ id: product.id });

  return { query };
}
