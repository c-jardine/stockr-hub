import { type GroupedOptions } from '@/components/Select';
import { api } from '@/utils/api';

export default function useGetAllStockUnits() {
  const { data } = api.stockUnit.getAll.useQuery();

  const selectOptions = data?.reduce<GroupedOptions>((acc, item) => {
    // Find an existing category in the accumulator
    const existingCategory = acc.find((c) => c.label === item.category);

    if (existingCategory) {
      // If the category exists, push the new name into its options
      existingCategory.options.push({
        label: item.namePlural,
        value: item.id,
      });
    } else {
      // Otherwise, add a new category object to the accumulator
      acc.push({
        label: item.category,
        options: [{ label: item.namePlural, value: item.id }],
      });
    }

    return acc;
  }, []);

  return { data, selectOptions };
}
