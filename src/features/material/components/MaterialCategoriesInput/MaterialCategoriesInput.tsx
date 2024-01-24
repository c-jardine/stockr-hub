import { CategoriesInput } from '@/components/CategoriesInput';
import { useCategoryOptions } from '@/components/CategoriesInput/hooks';
import { api } from '@/utils/api';
import { useCreateMaterialCategory } from './hooks';

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
