import { api } from '@/utils/api';

export default function useMaterialFormSelects() {
  const vendorsQuery = api.vendor.getAll.useQuery();
  const categoriesQuery = api.material.getAllCategories.useQuery();
  const stockUnitsQuery = api.stockUnit.getAll.useQuery();

  const stockUnits = stockUnitsQuery.data?.map((stockUnit) => ({
    label: stockUnit.namePlural,
    value: stockUnit.id,
  }));
  const categories = categoriesQuery.data?.map(({ category }) => ({
    label: category.name,
    value: category.id,
  }));
  const vendors = vendorsQuery.data?.map((vendor) => ({
    label: vendor.name,
    value: vendor.id,
  }));

  return { stockUnits, vendors, categories };
}
