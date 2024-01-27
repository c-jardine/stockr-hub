import { CreateMaterialDrawer } from '@/features/material';
import {
  CreateProductDrawer,
  ProductMenu,
  ProductsTable,
} from '@/features/products';
import { RootLayout } from '@/layouts/RootLayout';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { superjson } from '@/utils';
import { api } from '@/utils/api';
import { AbsoluteCenter, Flex, Image, Spinner } from '@chakra-ui/react';
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
      title='Products'
      subtitle='Manage your products.'
      actionBar={
        showActionBar ? (
          <Flex gap={2}>
            <CreateProductDrawer />
            <ProductMenu />
          </Flex>
        ) : undefined
      }
    >
      {children}
    </RootLayout>
  );
}

export default function Product(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { slug } = props;
  const query = api.product.getByCategorySlug.useQuery({ slug: slug ?? '' });

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
          <ProductsTable products={query.data} />
        </PageLayout>
      </main>
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const categories = await db.productCategory.findMany({
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
  const categoryExists = await db.productCategory.findFirst({
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
