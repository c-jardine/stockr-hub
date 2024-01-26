import { CreateMaterialDrawer, MaterialsTable } from '@/features/material';
import { RootLayout } from '@/layouts/RootLayout';
import { api } from '@/utils/api';
import { AbsoluteCenter, Image, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

function PageLayout({
  children,
  showActionBar = false,
}: {
  children: React.ReactNode;
  showActionBar?: boolean;
}) {
  return (
    <RootLayout
      title='Materials'
      subtitle='Manage your raw materials.'
      actionBar={showActionBar ? <CreateMaterialDrawer /> : undefined}
    >
      {children}
    </RootLayout>
  );
}

export default function Materials() {
  const query = api.material.getAll.useQuery();

  if (query.isLoading) {
    return (
      <PageLayout>
        <AbsoluteCenter>
          <Spinner size='xl' thickness='4px' color='sky.600' />
        </AbsoluteCenter>
      </PageLayout>
    );
  }

  if (!query.data || query.data?.length === 0) {
    return (
      <PageLayout>
        <AbsoluteCenter>
          <CreateMaterialDrawer />
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
        <title>Add new material</title>
        <meta name='description' content='Add a new material to track.' />
      </Head>
      <main>
        <PageLayout showActionBar>
          <MaterialsTable materials={query.data} />
        </PageLayout>
      </main>
    </>
  );
}
