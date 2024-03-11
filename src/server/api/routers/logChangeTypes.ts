import { newStockAdjustmentTypeSchema } from "@/features/settings";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const logChangeTypesRouter = createTRPCRouter({
  create: publicProcedure
    .input(newStockAdjustmentTypeSchema)
    .mutation(({ input, ctx }) => {
      switch (input.inventoryType) {
        case "material":
          return ctx.db.materialChangeType.create({
            data: {
              name: input.name,
              description: input.description,
              adjustmentType: input.adjustmentType,
            },
          });
        case "product":
          return ctx.db.productChangeType.create({
            data: {
              name: input.name,
              description: input.description,
              adjustmentType: input.adjustmentType,
            },
          });
      }
    }),
  getMaterialChangeTypes: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialChangeType.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
  getProductChangeTypes: publicProcedure.query(({ ctx }) => {
    return ctx.db.productChangeType.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
