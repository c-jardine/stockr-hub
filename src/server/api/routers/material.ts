import {
  materialCreateSchema,
  materialDeleteSchema,
  materialUpdateSchema,
} from '@/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import slugify from 'slugify';
import { z } from 'zod';

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.material.findMany({
      include: {
        itemDetails: {
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
    .input(z.object({ skip: z.number(), take: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.db.$transaction([
        ctx.db.material.count(),
        ctx.db.material.findMany({
          orderBy: {
            itemDetails: {
              name: 'asc',
            },
          },
          skip: (input.skip - 1) * input.take,
          take: input.take,
          include: {
            itemDetails: {
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
      const { itemDetails, stockUnitId, categoryIds, vendorId } = input;
      return ctx.db.material.create({
        data: {
          itemDetails: {
            create: {
              ...itemDetails,
              stockUnit: {
                connect: {
                  id: stockUnitId,
                },
              },
            },
          },
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
      const { itemDetails, categoryIds, vendorId } = input;
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
            itemDetails: {
              update: {
                ...itemDetails,
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
    .input(
      z.object({ name: z.string().min(2, 'Must be at least 2 characters') })
    )
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
