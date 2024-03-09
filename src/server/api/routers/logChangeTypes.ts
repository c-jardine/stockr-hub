import { createTRPCRouter, publicProcedure } from "../trpc";

export const logChangeTypesRouter = createTRPCRouter({
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
