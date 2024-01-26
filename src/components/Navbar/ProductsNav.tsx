import { api } from '@/utils/api';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Tag } from 'tabler-icons-react';
import { NavLink } from '../NavLink';
import { NavLinkChild } from '../NavLinkChild';

export default function ProductsNav() {
  const router = useRouter();

  const { data: categories } = api.product.getAllCategories.useQuery();

  const isCurrentPath = router.asPath.startsWith('/products');

  if (!isCurrentPath) {
    return <NavLink label='Products' href='/products' icon={Tag} />;
  }

  return (
    <Stack spacing={0}>
      <NavLink label='Products' href='/products' icon={Tag} />
      <Stack
        bg='slate.100'
        py={categories && categories.length > 0 ? 2 : 'unset'}
      >
        {isCurrentPath &&
          categories?.map((product) => (
            <NavLinkChild
              key={product.id}
              label={product.category.name}
              href={`/products/${product.category.slug}`}
            />
          ))}
      </Stack>
    </Stack>
  );
}
