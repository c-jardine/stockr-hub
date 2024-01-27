import {
  materialCreateCategorySchema,
  materialCreateSchema,
  materialDeleteManySchema,
  materialDeleteSchema,
  materialGetByCategorySlugSchema,
  materialGetPaginatedSchema,
  materialUpdateCategoriesSchema,
  materialUpdateSchema,
  materialUpdateStockSchema,
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
  deleteMany: publicProcedure
    .input(materialDeleteManySchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.material.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),

  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialCategory.findMany({
      orderBy: {
        category: {
          name: 'asc',
        },
      },
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
  updateCategories: publicProcedure
    .input(materialUpdateCategoriesSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.$transaction(async (tx) => {
        const { categories: inputCategories } = input;

        // Get all existing categories from the database
        const existingCategories = await ctx.db.materialCategory.findMany({
          include: {
            category: true,
          },
        });
        const existingCategoryIds = existingCategories.map(
          (category) => category.category.id
        );

        const inputCategoryIds = inputCategories.map((category) => category.id);

        const categoriesToAdd = inputCategories.filter(
          (category) => !existingCategoryIds.includes(category.id)
        );

        // Add new categories
        const addedCategories = await Promise.all(
          categoriesToAdd.map((category) =>
            tx.materialCategory.create({
              data: {
                category: {
                  create: {
                    name: category.name,
                    slug: slugify(category.name, { lower: true }),
                    color: category.color,
                  },
                },
              },
            })
          )
        );

        // Filter out the categories to be updated or added
        const categoriesToUpdate = inputCategories.filter((category) =>
          existingCategoryIds.includes(category.id)
        );

        // Update existing categories
        const updatedCategories = await Promise.all(
          categoriesToUpdate.map((category) =>
            tx.category.update({
              where: { id: category.id },
              data: {
                name: category.name,
                slug: slugify(category.name, { lower: true }),
                color: category.color,
              },
            })
          )
        );

        // Determine categories to delete
        const categoriesToDelete = existingCategories.filter(
          (category) => !inputCategoryIds.includes(category.category.id)
        );

        // Delete categories not present in the input
        await Promise.all(
          categoriesToDelete.map((category) =>
            tx.category.delete({
              where: { id: category.category.id },
            })
          )
        );

        return [...addedCategories, ...updatedCategories];
      });
    }),

  getMaterialStockLogTypes: publicProcedure.query(({ ctx }) => {
    return ctx.db.materialLogType.findMany();
  }),
  updateStock: publicProcedure
    .input(materialUpdateStockSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.$transaction(async (tx) => {
        const {
          materialId,
          stockLogTypeId,
          prevStock,
          quantity,
          newStock,
          notes,
        } = input;

        await tx.material.update({
          where: {
            id: materialId,
          },
          data: {
            stockLevel: {
              update: {
                stock: newStock,
              },
            },
          },
        });

        await tx.materialStockLog.create({
          data: {
            stockLogData: {
              create: {
                prevStock,
                stock: quantity,
                notes,
              },
            },
            type: {
              connect: {
                id: stockLogTypeId,
              },
            },
            material: {
              connect: {
                id: materialId,
              },
            },
          },
        });
      });
    }),
});
