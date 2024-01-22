import { CreateMaterialDrawer, MaterialsTable } from '@/features/material';
import { RootLayout } from '@/layouts/RootLayout';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { superjson } from '@/utils';
import { api } from '@/utils/api';
import { AbsoluteCenter, Image, Spinner } from '@chakra-ui/react';
import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  type GetStaticPathsResult,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from 'next';
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

export default function Material(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const query = api.material.getByCategorySlug.useQuery({ slug: slug ?? '' });

  if (query.isLoading) {
    return (
      <PageLayout>
        <AbsoluteCenter>
          <Spinner size='xl' thickness='4px' color='emerald.600' />
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

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const categories = await db.materialCategory.findMany({
    select: {
      category: {
        select: {
          slug: true,
        },
      },
    },
  });

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.category.slug,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { db },
    transformer: superjson,
  });

  const slug = context.params?.slug ?? '';

  // Check if the slug exists in the database.
  // TODO: Find a better way to do this. This extra database call seems
  // unncecessary.
  const categoryExists = await db.materialCategory.findFirst({
    where: {
      category: {
        slug,
      },
    },
    select: {
      category: {
        select: {
          slug: true,
        },
      },
    },
  });

  if (!categoryExists) {
    return {
      redirect: {
        destination: '/materials',
        permanent: false,
      },
    };
  }

  await helpers.material.getByCategorySlug.prefetch({ slug: slug ?? '' });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      slug,
    },
  };
}
