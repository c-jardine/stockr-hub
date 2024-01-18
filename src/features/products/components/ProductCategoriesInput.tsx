import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryOptions } from '@/components/CategoriesInput/hooks';
import { useCreateProductCategory } from '@/hooks/product';
import { api } from '@/utils/api';

/**
 * A component for creating and selecting product categories.
 */
export default function ProductCategoriesInput() {
  const { options } = useCategoryOptions(api.product.getAllCategories);
  const { onCreate } = useCreateProductCategory();

  return (
    <CategoriesInput
      name='categoryIds'
      categoryOptions={options}
      onCreateCategory={onCreate}
    />
  );
}
