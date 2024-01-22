import {
  materialDeleteSchema,
  productCreateSchema,
  productUpdateSchema,
} from '@/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import slugify from 'slugify';
import { z } from 'zod';

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      include: {
        materials: {
          include: {
            material: {
              include: {
                stockLevel: {
                  include: {
                    stockUnit: true,
                  },
                },
                vendor: true,
                categories: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
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
  getByCategorySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.product.findMany({
        where: {
          categories: {
            some: {
              category: {
                slug: input.slug,
              },
            },
          },
        },
        include: {
          materials: {
            include: {
              material: {
                include: {
                  stockLevel: {
                    include: {
                      stockUnit: true,
                    },
                  },
                  vendor: true,
                  categories: {
                    include: {
                      category: true,
                    },
                  },
                },
              },
            },
          },
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
      const { categoryIds, stockLevel, materials, ...rest } = input;
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
          materials: {
            createMany: {
              data: materials,
            },
          },
          categories: {
            // TODO: Change to create or connect
            connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
          },
        },
      });
    }),
  update: publicProcedure
    .input(productUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { stockLevel, categoryIds, ...rest } = input;
      return ctx.db.$transaction([
        ctx.db.product.update({
          where: {
            id: input.id,
          },
          data: {
            categories: {
              set: [],
            },
          },
        }),
        ctx.db.product.update({
          where: {
            id: input.id,
          },
          data: {
            ...rest,
            stockLevel: {
              update: {
                ...stockLevel,
              },
            },
            categories: {
              connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
            },
          },
        }),
      ]);
    }),
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
