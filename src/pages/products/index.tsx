import { CreateProductDrawer, ProductsTable } from '@/features/products';

import { RootLayout } from '@/layouts/RootLayout';
import { api } from '@/utils/api';
import { AbsoluteCenter, Flex, Image, Spinner } from '@chakra-ui/react';
import Head from 'next/head';

export default function Products() {
  const query = api.product.getAll.useQuery();

  if (query.isLoading) {
    return (
      <RootLayout title='Products'>
        <Flex justifyContent='center' my={8}>
          <Spinner color='emerald.600' />
        </Flex>
      </RootLayout>
    );
  }

  if (!query.data || query.data.length == 0) {
    return (
      <RootLayout title='Products'>
        <AbsoluteCenter>
          <CreateProductDrawer />
        </AbsoluteCenter>
        <AbsoluteCenter mt={20}>
          <Image
            src='/images/arrow-illustration.png'
            mt={2}
            transform='rotate(180deg)'
          />
        </AbsoluteCenter>
      </RootLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Add new product</title>
        <meta name='description' content='Add a new material to track.' />
      </Head>
      <main>
        <RootLayout
          title='Products'
          subtitle='Manage your products.'
          actionBar={<CreateProductDrawer />}
        >
          <ProductsTable products={query.data} />
        </RootLayout>
      </main>
    </>
  );
}
