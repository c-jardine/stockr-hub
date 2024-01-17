import { api } from '@/utils/api';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Box } from 'tabler-icons-react';
import { NavLink } from '../NavLink';
import { NavLinkChild } from '../NavLinkChild';

export default function ProductsNav() {
  const router = useRouter();

  const { data: productCategories } = api.product.getAllCategories.useQuery();

  if (router.asPath !== '/products') {
    return <NavLink label='Products' href='/products' icon={Box} />;
  }

  return (
    <Stack spacing={0}>
      <NavLink label='Products' href='/products' icon={Box} />
      <Stack
        bg='slate.100'
        py={productCategories && productCategories.length > 0 ? 2 : 'unset'}
      >
        {router.asPath.startsWith('/products') &&
          productCategories?.map((product) => (
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
