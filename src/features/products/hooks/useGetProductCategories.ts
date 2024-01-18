import { api } from '@/utils/api';

export default function useGetProductCategories() {
  const query = api.product.getAllCategories.useQuery();

  const options = query.data?.map((option) => ({
    label: option.category.name,
    value: option.id,
  }));

  return { query, options };
}
