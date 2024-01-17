import { materialDeleteSchema, productCreateSchema } from '@/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import slugify from 'slugify';
import { z } from 'zod';

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      include: {
        materials: true,
        stockLevel: {
          include: {
            stockUnit: true,
          },
        },
        categories: {
          orderBy: {
            category: {
              name: 'asc',
            },
          },
          include: {
            category: true,
          },
        },
      },
    });
  }),
  create: publicProcedure
    .input(productCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { categoryIds, stockLevel, ...rest } = input;
      return ctx.db.product.create({
        data: {
          ...rest,
          stockLevel: {
            create: {
              stock: stockLevel.stock,
              minStock: stockLevel.minStock,
              stockUnit: {
                connect: {
                  id: stockLevel.stockUnitId,
                },
              },
            },
          },
          categories: {
            // TODO: Change to create or connect
            connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
          },
        },
      });
    }),
  // update: publicProcedure
  //   .input(materialUpdateSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const { itemDetails, categoryIds, vendorId } = input;
  //     return ctx.db.$transaction([
  //       ctx.db.material.update({
  //         where: {
  //           id: input.id,
  //         },
  //         data: {
  //           categories: {
  //             set: [],
  //           },
  //         },
  //       }),
  //       ctx.db.material.update({
  //         where: {
  //           id: input.id,
  //         },
  //         data: {
  //           itemDetails: {
  //             update: {
  //               ...itemDetails,
  //             },
  //           },
  //           categories: {
  //             connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
  //           },
  //           vendor: {
  //             connect: {
  //               id: vendorId,
  //             },
  //           },
  //         },
  //       }),
  //     ]);
  //   }),
  delete: publicProcedure
    .input(materialDeleteSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.material.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.productCategory.findMany({
      include: {
        category: true,
      },
    });
  }),
  createCategory: publicProcedure
    .input(
      z.object({ name: z.string().min(2, 'Must be at least 2 characters') })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.productCategory.create({
        data: {
          category: {
            create: {
              name: input.name,
              slug: slugify(input.name, { lower: true }),
            },
          },
        },
      });
    }),
});
