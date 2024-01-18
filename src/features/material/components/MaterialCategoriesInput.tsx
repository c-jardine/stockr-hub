import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryOptions } from '@/components/CategoriesInput/hooks';
import { useCreateMaterialCategory } from '@/hooks/material';
import { api } from '@/utils/api';

/**
 * A component for creating and selecting material categories.
 */
export default function MaterialCategoriesInput() {
  const { options } = useCategoryOptions(api.material.getAllCategories);
  const { onCreate } = useCreateMaterialCategory();

  return (
    <CategoriesInput
      name='categoryIds'
      categoryOptions={options}
      onCreateCategory={onCreate}
    />
  );
}
