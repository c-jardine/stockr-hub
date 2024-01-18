import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryInput } from '@/components/CategoriesInput/hooks';
import { UseCategoryInputOwner } from '@/components/CategoriesInput/hooks/useCategoryInput';
import { api } from '@/utils/api';

export default function MaterialCategoriesInput() {
  const categoriesQuery = api.material.getAllCategories.useQuery();
  const { options, onCreate } = useCategoryInput(
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
