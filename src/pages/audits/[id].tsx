import { CancelMaterialAudit } from '@/features/material';
import { RootLayout } from '@/layouts/RootLayout';
import { appRouter } from '@/server/api/root';
import { db } from '@/server/db';
import { UpdateMaterialAuditInput } from '@/types';
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
  Tr,
  useToast,
} from '@chakra-ui/react';
import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  type GetStaticPathsResult,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useFieldArray, useForm } from 'react-hook-form';

export default function AuditById(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();

  const { id } = props;
  const { data } = api.audit.getMaterialAuditById.useQuery({ id: id ?? '' });

  const defaultValues =
    data?.completedAt === null
      ? {
          id: data?.id,
          category: data?.category,
          items: data?.items.map((item) => ({
            materialId: item.materialId,
            name: item.name,
            expectedStock: Number(item.expectedStock),
            actualStock: undefined,
            stockUnit: item.stockUnit,
            notes: item.notes,
          })),
        }
      : {
          id: data?.id,
          category: data?.category,
          items: data?.items.map((item) => ({
            materialId: item.materialId,
            name: item.name,
            expectedStock: Number(item.expectedStock),
            actualStock: Number(item.actualStock),
            stockUnit: item.stockUnit,
            notes: item.notes,
          })),
        };

  const { register, control, handleSubmit } = useForm<UpdateMaterialAuditInput>(
    {
      defaultValues,
    }
  );
  const { fields } = useFieldArray({
    control,
    name: 'items',
  });

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.audit.completeAudit.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Audit completed',
        description: 'Successfully completed an audit.',
        status: 'success',
      });
      await utils.appState.getAppState.invalidate();
      await utils.audit.getAllMaterialAudits.invalidate();
      await router.push('/audits');
    },
  });
  function onComplete(data: UpdateMaterialAuditInput) {
    query.mutate(data);
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <RootLayout
      title={`${data.category === 'all' ? 'Materials' : data.category} Audit`}
      actionBar={
        !data.completedAt && (
          <HStack>
            <CancelMaterialAudit id={id} name={data.category} />
            <Button type='submit' form='complete-audit-form'>
              Complete
            </Button>
          </HStack>
        )
      }
    >
      <TableContainer
        as='form'
        id='complete-audit-form'
        onSubmit={handleSubmit(onComplete)}
      >
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
            {fields.map((item, index) => (
              <Tr key={item.id}>
                <Td fontWeight='semibold'>{item.name}</Td>
                <Td>
                  {Number(item.expectedStock)} {item.stockUnit}.
                </Td>
                <Td maxW={64}>
                  <InputGroup>
                    <Input
                      {...register(`items.${index}.actualStock`, {
                        valueAsNumber: true,
                      })}
                      isDisabled={data.completedAt !== null}
                    />
                    <InputRightAddon fontSize='sm'>
                      {item.stockUnit}.
                    </InputRightAddon>
                  </InputGroup>
                </Td>
                <Td maxW={64}>
                  <Input
                    {...register(`items.${index}.notes`)}
                    isDisabled={data.completedAt !== null}
                  />
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
