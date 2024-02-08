import { AuditForm } from "@/features/audit/components";
import { CancelMaterialAudit } from "@/features/material";
import { RootLayout } from "@/layouts/RootLayout";
import { appRouter } from "@/server/api/root";
import { db } from "@/server/db";
import { type UpdateMaterialAuditInput } from "@/types";
import { superjson } from "@/utils";
import { api } from "@/utils/api";
import { Box, Button, HStack, IconButton, Spinner } from "@chakra-ui/react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { format } from "date-fns";
import {
  type GetStaticPathsResult,
  type GetStaticPropsContext,
  type InferGetStaticPropsType,
} from "next";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { Printer } from "tabler-icons-react";

export default function AuditById(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const { data } = api.audit.getMaterialAuditById.useQuery({ id: id ?? "" });

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

  const form = useForm<UpdateMaterialAuditInput>({
    defaultValues,
  });

  if (!data) {
    return <Spinner />;
  }

  const title =
    data.category === "all" ? "Materials Audit" : `${data.category} Audit`;

  const toPrintRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => toPrintRef.current,
    documentTitle: `${title.toLowerCase().replaceAll(" ", "_")}_${format(
      new Date(),
      "yyyy_MMMM_dd"
    )}`,
  });

  return (
    <RootLayout
      title={title}
      actionBar={
        !data.completedAt && (
          <HStack>
            <CancelMaterialAudit id={id} name={data.category} />
            <Button type="submit" form="complete-audit-form">
              Complete
            </Button>
            <IconButton
              icon={<Printer />}
              aria-label="Print audit form"
              onClick={handlePrint}
            />
          </HStack>
        )
      }
    >
      <FormProvider {...form}>
        <Box ref={toPrintRef}>
          <AuditForm data={data} />
        </Box>
      </FormProvider>
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
    fallback: "blocking",
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

  const id = context.params?.id ?? "";

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
        destination: "/audits",
        permanent: false,
      },
    };
  }

  await helpers.audit.getMaterialAuditById.prefetch({ id: id ?? "" });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}
