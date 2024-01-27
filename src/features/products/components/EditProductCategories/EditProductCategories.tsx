import { EditCategories } from '@/components/EditCategories';
import { useEditProductCategories } from './hooks';

export default function EditProductCategories() {
  const { categories, onUpdate } = useEditProductCategories();

  return <EditCategories categories={categories} onUpdate={onUpdate} />;
}
