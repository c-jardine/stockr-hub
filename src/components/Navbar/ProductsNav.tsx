import { api } from '@/utils/api';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Box } from 'tabler-icons-react';
import { NavLink } from '../NavLink';
import { NavLinkChild } from '../NavLinkChild';

export default function ProductsNav() {
  const router = useRouter();

  const { data: materialCategories } = api.material.getAllCategories.useQuery();

  if (router.asPath !== '/products') {
    return <NavLink label='Products' href='/products' icon={Box} />;
  }

  return (
    <Stack spacing={0}>
      <NavLink label='Products' href='/products' icon={Box} />
      <Stack bg='slate.100' py={2}>
        {router.asPath.startsWith('/products') &&
          materialCategories?.map((category) => (
            <NavLinkChild
              key={category.id}
              label={category.category.name}
              href={`/products/${category.category.slug}`}
            />
          ))}
      </Stack>
    </Stack>
  );
}
