import { CreateMaterialDrawer, MaterialsTable } from '@/features/material';
import { CreateProductDrawer } from '@/features/products';

import { RootLayout } from '@/layouts/RootLayout';
import { api } from '@/utils/api';
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Products() {
  const query = api.material.getAll.useQuery();

  if (query.isLoading) {
    return (
      <RootLayout title='Products'>
        <Flex justifyContent='center' my={8}>
          <Spinner color='emerald.600' />
        </Flex>
      </RootLayout>
    );
  }

  if (!query.data) {
    return (
      <RootLayout title='Products'>
        <Stack alignItems='center' h='full' p={4}>
          <Text>You haven't added any products..</Text>
          <CreateMaterialDrawer />
        </Stack>
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
          <MaterialsTable materials={query.data} />
        </RootLayout>
      </main>
    </>
  );
}
