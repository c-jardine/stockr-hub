import { CancelMaterialAudit } from '@/features/material';
import { RootLayout } from '@/layouts/RootLayout';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { superjson } from '@/utils';
import { api } from '@/utils/api';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  type GetStaticPathsResult,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from 'next';

function Complete() {
  return <Button>Complete</Button>;
}

export default function AuditById(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const { data } = api.audit.getMaterialAuditById.useQuery({ id: id ?? '' });

  if (!data) {
    return <Spinner />;
  }

  return (
    <RootLayout
      title={`${data.category} Audit`}
      actionBar={
        <HStack>
          <CancelMaterialAudit id={id} name={data.category} />
          <Complete />
        </HStack>
      }
    >
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Expected</Th>
              <Th>Actual</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.items.map((item) => (
              <Tr key={item.id}>
                <Td fontWeight='semibold'>{item.name}</Td>
                <Td>
                  {Number(item.expectedStock)} {item.stockUnit}.
                </Td>
                <Td maxW={64}>
                  <InputGroup>
                    <Input />
                    <InputRightAddon fontSize='sm'>
                      {item.stockUnit}.
                    </InputRightAddon>
                  </InputGroup>
                </Td>
                <Td maxW={64}>
                  <Input />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </RootLayout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const ids = await db.materialAudit.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: ids.map(({ id }) => ({
      params: {
        id,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: 'blocking',
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { db },
    transformer: superjson,
  });

  const id = context.params?.id ?? '';

  // Check if the slug exists in the database.
  // TODO: Find a better way to do this. This extra database call seems
  // unncecessary.
  const idExists = await db.materialAudit.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!idExists) {
    return {
      redirect: {
        destination: '/audits',
        permanent: false,
      },
    };
  }

  await helpers.audit.getMaterialAuditById.prefetch({ id: id ?? '' });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}
