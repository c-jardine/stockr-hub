import { CreateMaterialDrawer, MaterialsTable } from '@/features/material';

import { RootLayout } from '@/layouts/RootLayout';
import { api } from '@/utils/api';
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Materials() {
  const query = api.material.getAll.useQuery();

  if (query.isLoading) {
    return (
      <RootLayout title='Materials'>
        <Flex justifyContent='center' my={8}>
          <Spinner color='emerald.600' />
        </Flex>
      </RootLayout>
    );
  }

  if (!query.data || query.data.length === 0) {
    return (
      <RootLayout title='Materials'>
        <Stack alignItems='center' h='full' p={4}>
          <Text>You aren't tracking any materials.</Text>
          <CreateMaterialDrawer />
        </Stack>
      </RootLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Add new material</title>
        <meta name='description' content='Add a new material to track.' />
      </Head>
      <main>
        <RootLayout
          title='Materials'
          subtitle='Manage your raw materials.'
          actionBar={<CreateMaterialDrawer />}
        >
          <MaterialsTable materials={query.data} />
        </RootLayout>
      </main>
    </>
  );
}
