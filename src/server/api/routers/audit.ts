import {
  cancelMaterialAuditSchema,
  createMaterialAuditSchema,
} from '@/schemas';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const auditRouter = createTRPCRouter({
  getAllMaterialAudits: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialAudit.findMany({
      include: {
        items: true,
      },
    });
  }),

  getMaterialAuditById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.materialAudit.findFirst({
        where: {
          id: input.id,
        },
        include: {
          items: true,
        },
      });
    }),

  createMaterialAudit: publicProcedure
    .input(createMaterialAuditSchema)
    .mutation(({ input, ctx }) => {
      const { category, items } = input;

      return ctx.db.$transaction(async (tx) => {
        const createAudit = await tx.materialAudit.create({
          data: {
            category,
            items: {
              createMany: {
                data: items.map((item) => ({
                  materialId: item.materialId,
                  name: item.name,
                  expectedStock: item.expectedStock,
                  actualStock: item.expectedStock,
                  stockUnit: item.stockUnit,
                  notes: item.notes,
                })),
              },
            },
          },
          select: {
            id: true,
          },
        });

        await tx.appState.update({
          where: {
            id: 1,
          },
          data: {
            auditState: {
              update: {
                where: {
                  id: 1,
                },
                data: {
                  inProgress: true,
                  materialAudit: {
                    connect: {
                      id: createAudit.id,
                    },
                  },
                },
              },
            },
          },
        });

        return createAudit;
      });
    }),

  cancelMaterialAudit: publicProcedure
    .input(cancelMaterialAuditSchema)
    .mutation(({ input, ctx }) => {
      const { id } = input;

      return ctx.db.$transaction(async (tx) => {
        await tx.materialAudit.delete({
          where: { id },
        });

        await tx.appState.update({
          where: {
            id: 1,
          },
          data: {
            auditState: {
              update: {
                where: {
                  id: 1,
                },
                data: {
                  materialAudit: {
                    disconnect: {
                      id,
                    },
                  },
                  inProgress: false,
                },
              },
            },
          },
        });
      });
    }),
});
