import { createTRPCRouter, publicProcedure } from '../trpc';

export const categoriesRouter = createTRPCRouter({
  getMaterialCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialCategory.findMany({
      include: {
        category: true,
      },
    });
  }),
  getProductCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.productCategory.findMany({
      include: {
        category: true,
      },
    });
  }),
});
