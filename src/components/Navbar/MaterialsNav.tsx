import { api } from '@/utils/api';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Pencil } from 'tabler-icons-react';
import { NavLink } from '../NavLink';
import { NavLinkChild } from '../NavLinkChild';

export default function MaterialsNav() {
  const router = useRouter();

  const { data: categories } = api.material.getAllCategories.useQuery();

  const isCurrentPath = router.asPath.startsWith('/materials');

  if (!isCurrentPath) {
    return <NavLink label='Materials' href='/materials' icon={Pencil} />;
  }

  return (
    <Stack spacing={0}>
      <NavLink label='Materials' href='/materials' icon={Pencil} />
      <Stack
        bg='slate.100'
        py={categories && categories.length > 0 ? 2 : 'unset'}
      >
        {isCurrentPath &&
          categories?.map((category) => (
            <NavLinkChild
              key={category.id}
              label={category.category.name}
              href={`/materials/${category.category.slug}`}
            />
          ))}
      </Stack>
    </Stack>
  );
}
