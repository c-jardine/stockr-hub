import { type Option } from '@/components/Select';
import { type CreateMaterialAuditInput } from '@/types';
import { getStockUnitTextAbbrev } from '@/utils';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';

interface AuditFormValues {
  type: string;
  category: string;
}

export default function useNewAuditForm() {
  const router = useRouter();

  const form = useForm<AuditFormValues>({
    defaultValues: {
      type: 'materials',
      category: 'all',
    },
  });

  const auditTypeOptions: Option[] = [
    { label: 'Materials', value: 'materials' },
    { label: 'Products', value: 'products' },
  ];

  const { data: categoryData } =
    form.watch('type') === 'materials'
      ? api.categories.getMaterialCategories.useQuery()
      : api.categories.getProductCategories.useQuery();

  function getCategoryOptions(): Option[] {
    if (!categoryData) return [];
    const options = categoryData.map(({ category }) => ({
      label: category.name,
      value: category.name,
    }));
    options.unshift({ label: 'All', value: 'all' });
    return options;
  }

  const categoryOptions = getCategoryOptions();

  const utils = api.useUtils();
  const newAuditQuery = api.audit.createMaterialAudit.useMutation({
    onSuccess: async (data) => {
      await router.push(`/audits/${data.id}`);
      await utils.appState.getAppState.invalidate();
    },
  });

  const { data: materials } =
    form.watch('category') === 'all'
      ? api.material.getAll.useQuery()
      : api.material.getByCategorySlug.useQuery({
          slug: slugify(form.watch('category'), { lower: true }),
        });

  async function onSubmit(data: { type: string; category: string }) {
    const formattedData: CreateMaterialAuditInput = {
      category: data.category,
      items: materials
        ? materials.map((material) => ({
            materialId: material.id,
            name: material.name,
            expectedStock: Number(material.stockLevel.stock),
            actualStock: Number(material.stockLevel.stock),
            stockUnit: getStockUnitTextAbbrev(
              Number(material.stockLevel.stock),
              material.stockLevel.stockUnit
            ),
            notes: '',
          }))
        : [],
    };
    newAuditQuery.mutate(formattedData);
  }

  return { form, auditTypeOptions, categoryOptions, onSubmit };
}
