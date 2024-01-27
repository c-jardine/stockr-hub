import {
  productCreateCategorySchema,
  productCreateSchema,
  productDeleteManySchema,
  productDeleteSchema,
  productGetByCategorySlugSchema,
  productUpdateCategoriesSchema,
  productUpdateSchema,
} from '@/schemas';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import slugify from 'slugify';

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
    .input(productGetByCategorySlugSchema)
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
            // TODO: Change to create or connect?
            connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
          },
        },
      });
    }),
  update: publicProcedure
    .input(productUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        stockLevel,
        materials: inputMaterials,
        categoryIds,
        ...data
      } = input;

      // Get the materials that exist in the database.
      const existingMaterials = await ctx.db.productMaterial.findMany({
        where: {
          productId: id,
        },
        select: {
          materialId: true,
        },
      });

      // Get an array of the ids for the existing materials.
      const existingMaterialIds = existingMaterials.map(
        (existingMaterial) => existingMaterial.materialId
      );

      // Get an array of the ids for the input materials.
      const inputMaterialIds = inputMaterials.map(
        (material) => material.materialId
      );

      // Get materials that already exist in the database but aren't included
      // in the input. These should be deleted.
      const materialsToDelete = existingMaterialIds
        .filter((material) => !inputMaterialIds.includes(material))
        // Transform into format required by delete.
        .map((material) => ({
          materialId: material,
        }));

      // Get the materials that don't exist in the database and are included in
      // the input. These should be added.
      const materialsToAdd = inputMaterials.filter(
        (inputMaterial) =>
          !existingMaterialIds.includes(inputMaterial.materialId)
      );

      // Get the materials that already exist in the database and are included
      // in the input. These should be updated.
      const materialsToUpdate = inputMaterials
        .filter((inputMaterial) =>
          existingMaterialIds.includes(inputMaterial.materialId)
        )
        // Transform into format required by update.
        .map((material) => ({
          where: {
            productId_materialId: {
              productId: id,
              materialId: material.materialId,
            },
          },
          data: material,
        }));

      return ctx.db.product.update({
        where: { id },
        data: {
          ...data,
          stockLevel: {
            update: stockLevel,
          },
          materials: {
            deleteMany: materialsToDelete,
            create: materialsToAdd,
            update: materialsToUpdate,
          },
          categories: {
            set: [], // Reset categories.
            connect: categoryIds?.map((categoryId) => ({ id: categoryId })),
          },
        },
      });
    }),
  delete: publicProcedure
    .input(productDeleteSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: publicProcedure
    .input(productDeleteManySchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.product.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
    }),

  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.productCategory.findMany({
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
    .input(productCreateCategorySchema)
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
  updateCategories: publicProcedure
    .input(productUpdateCategoriesSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.$transaction(async (tx) => {
        const { categories: inputCategories } = input;

        // Get all existing categories from the database
        const existingCategories = await ctx.db.productCategory.findMany({
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
            tx.productCategory.create({
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
});
