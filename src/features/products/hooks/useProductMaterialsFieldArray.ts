import { type ProductCreate } from '@/types';
import { api } from '@/utils/api';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function useProductMaterialsFieldArray() {
  const form = useFormContext<ProductCreate>();

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'materials',
  });

  const query = api.material.getAll.useQuery();

  const options = query.data?.map((material) => ({
    label: material.name,
    value: material.id,
  }));

  return { form, fieldArray, options };
}
