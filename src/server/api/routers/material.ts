import {
  materialCreateCategorySchema,
  materialCreateSchema,
  materialDeleteSchema,
  materialGetByCategorySlugSchema,
  materialGetPaginatedSchema,
  materialUpdateSchema
} from '@/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import slugify from 'slugify';

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.material.findMany({
      include: {
        stockLevel: {
          include: {
            stockUnit: true,
          },
        },
        vendor: true,
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
    .input(materialGetByCategorySlugSchema)
    .query(({ input, ctx }) => {
      return ctx.db.material.findMany({
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
          stockLevel: {
            include: {
              stockUnit: true,
            },
          },
          vendor: true,
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
  getAllPaginated: publicProcedure
    .input(materialGetPaginatedSchema)
    .query(({ input, ctx }) => {
      return ctx.db.$transaction([
        ctx.db.material.count(),
        ctx.db.material.findMany({
          orderBy: {
            name: 'asc',
          },
          skip: (input.skip - 1) * input.take,
          take: input.take,
          include: {
            stockLevel: {
              include: {
                stockUnit: true,
              },
            },
            vendor: true,
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
        }),
      ]);
    }),
  create: publicProcedure
    .input(materialCreateSchema)
    .mutation(async ({ input, ctx }) => {
      const { stockLevel, categoryIds, vendorId } = input;
      return ctx.db.material.create({
        data: {
          name: input.name,
          url: input.url,
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
          costPerUnit: input.costPerUnit,
          categories: {
            // TODO: Change to create or connect
            connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
          },
          vendor: {
            connect: {
              id: vendorId,
            },
          },
        },
      });
    }),
  update: publicProcedure
    .input(materialUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { stockLevel, categoryIds, vendorId } = input;
      return ctx.db.$transaction([
        ctx.db.material.update({
          where: {
            id: input.id,
          },
          data: {
            categories: {
              set: [],
            },
          },
        }),
        ctx.db.material.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            url: input.url,
            stockLevel: {
              update: {
                ...stockLevel,
              },
            },
            categories: {
              connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
            },
            vendor: {
              connect: {
                id: vendorId,
              },
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
    return ctx.db.materialCategory.findMany({
      include: {
        category: true,
      },
    });
  }),
  createCategory: publicProcedure
    .input(materialCreateCategorySchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.materialCategory.create({
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
