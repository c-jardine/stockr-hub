import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryInput } from '@/components/CategoriesInput/hooks';
import { UseCategoryInputOwner } from '@/components/CategoriesInput/hooks/useCategoryInput';
import { type ProductGetAllCategoriesOutput } from '@/types';
import { api } from '@/utils/api';

/**
 * A component for creating and selecting product categories.
 */
export default function ProductCategoriesInput() {
  const categoriesQuery = api.product.getAllCategories.useQuery();
  const { options, onCreate } = useCategoryInput<ProductGetAllCategoriesOutput>(
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
