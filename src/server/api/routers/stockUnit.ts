import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const stockUnitRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.stockUnit.findMany();
  }),
});
