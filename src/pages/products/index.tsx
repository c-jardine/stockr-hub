import { CreateProductDrawer, ProductsTable } from '@/features/products';
import { RootLayout } from '@/layouts/RootLayout';
import { api } from '@/utils/api';
import { AbsoluteCenter, Flex, Image, Spinner } from '@chakra-ui/react';
import Head from 'next/head';

function PageLayout({
  children,
  showActionBar = false,
}: {
  children: React.ReactNode;
  showActionBar?: boolean;
}) {
  return (
    <RootLayout
      title='Products'
      subtitle='Manage your products.'
      actionBar={showActionBar ? <CreateProductDrawer /> : undefined}
    >
      {children}
    </RootLayout>
  );
}

export default function Products() {
  const query = api.product.getAll.useQuery();

  if (query.isLoading || !query.data) {
    return (
      <PageLayout>
        <Flex justifyContent='center' my={8}>
          <Spinner color='emerald.600' />
        </Flex>
      </PageLayout>
    );
  }

  if (query.data.length == 0) {
    return (
      <PageLayout>
        <AbsoluteCenter>
          <CreateProductDrawer />
        </AbsoluteCenter>
        <AbsoluteCenter mt='84px'>
          <Image
            src='/images/arrow-illustration.png'
            mt={2}
            transform='rotate(180deg)'
          />
        </AbsoluteCenter>
      </PageLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Add new product</title>
        <meta name='description' content='Add a new material to track.' />
      </Head>
      <main>
        <PageLayout showActionBar>
          <ProductsTable products={query.data} />
        </PageLayout>
      </main>
    </>
  );
}
