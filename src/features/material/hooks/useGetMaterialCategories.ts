import { api } from '@/utils/api';

export default function useGetMaterialCategories() {
  const query = api.material.getAllCategories.useQuery();

  const options = query.data?.map((option) => ({
    label: option.category.name,
    value: option.id,
  }));

  return { query, options };
}
