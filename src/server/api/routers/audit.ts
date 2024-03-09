import {
  cancelMaterialAuditSchema,
  createMaterialAuditSchema,
  updateMaterialAuditSchema,
} from "@/schemas";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

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
                inProgress: true,
                materialAudit: {
                  connect: {
                    id: createAudit.id,
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
                materialAudit: {
                  disconnect: true,
                },
                inProgress: false,
              },
            },
          },
        });
      });
    }),

  completeAudit: publicProcedure
    .input(updateMaterialAuditSchema)
    .mutation(({ input, ctx }) => {
      const { category, items } = input;

      return ctx.db.$transaction(async (tx) => {
        const completeAudit = await tx.materialAudit.update({
          where: {
            id: input.id,
          },
          data: {
            category,
            completedAt: new Date(),
            items: {
              updateMany: items.map((item) => ({
                where: {
                  materialId: item.materialId,
                },
                data: {
                  actualStock: item.actualStock,
                  notes: item.notes,
                },
              })),
            },
          },
          select: {
            id: true,
          },
        });

        await Promise.all(
          items.map(async (item) => {
            await tx.material.update({
              where: {
                id: item.materialId,
              },
              data: {
                stockLevel: {
                  update: {
                    stock: item.actualStock,
                  },
                },
              },
            });

            const inventoryLog = await tx.inventoryLog.create({
              data: {
                quantityChange: Math.abs(item.actualStock - item.expectedStock),
                previousQuantity: item.expectedStock,
                newQuantity: item.actualStock,
                notes: item.notes,
              },
            });

            await tx.materialInventoryLog.create({
              data: {
                material: {
                  connect: {
                    id: item.materialId,
                  },
                },
                inventoryLog: {
                  connect: {
                    id: inventoryLog.id,
                  },
                },
                changeType: {
                  connect: {
                    name: "Audit",
                  },
                },
              },
            });
          })
        );

        await tx.appState.update({
          where: {
            id: 1,
          },
          data: {
            auditState: {
              update: {
                materialAudit: {
                  disconnect: true,
                },
                inProgress: false,
              },
            },
          },
        });

        return completeAudit;
      });
    }),
});
