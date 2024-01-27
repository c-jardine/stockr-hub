import { EditCategories } from '@/components/EditCategories';
import { useEditMaterialCategories } from './hooks';

export default function EditMaterialCategories() {
  const { categories, onUpdate } = useEditMaterialCategories();

  return <EditCategories categories={categories} onUpdate={onUpdate} />;
}
