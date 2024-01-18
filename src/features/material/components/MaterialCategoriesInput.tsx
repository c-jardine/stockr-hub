import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryInput } from '@/components/CategoriesInput/hooks';
import { UseCategoryInputOwner } from '@/components/CategoriesInput/hooks/useCategoryInput';
import { type MaterialGetAllCategoriesOutput } from '@/types';
import { api } from '@/utils/api';

/**
 * A component for creating and selecting material categories.
 */
export default function MaterialCategoriesInput() {
  const categoriesQuery = api.material.getAllCategories.useQuery();
  const { options, onCreate } =
    useCategoryInput<MaterialGetAllCategoriesOutput>(
      categoriesQuery,
      UseCategoryInputOwner.MATERIAL
    );

  return (
    <CategoriesInput
      name='categoryIds'
      categoryOptions={options}
      onCreateCategory={onCreate}
    />
  );
}
