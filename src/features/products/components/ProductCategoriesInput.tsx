import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryInput } from '@/components/CategoriesInput/hooks';
import { UseCategoryInputOwner } from '@/components/CategoriesInput/hooks/useCategoryInput';
import { api } from '@/utils/api';

export default function ProductCategoriesInput() {
  const categoriesQuery = api.product.getAllCategories.useQuery();
  const { options, onCreate } = useCategoryInput(
    categoriesQuery,
    UseCategoryInputOwner.PRODUCT
  );

  return (
    <CategoriesInput
      name='categoryIds'
      categoryOptions={options}
      onCreateCategory={onCreate}
    />
  );
}
