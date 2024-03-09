import {
  materialCreateCategorySchema,
  materialCreateSchema,
  materialDeleteManySchema,
  materialDeleteSchema,
  materialGetAllStockUpdatesFilteredSchema,
  materialGetByCategorySlugSchema,
  materialGetHistorySchema,
  materialUpdateCategoriesSchema,
  materialUpdateSchema,
  materialUpdateStockSchema,
} from "@/schemas";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { endOfDay, startOfYear, subDays, subMonths, subYears } from "date-fns";
import slugify from "slugify";
import { type z } from "zod";

export const materialRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.material.findMany({
      orderBy: {
        name: "asc",
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
              name: "asc",
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
        orderBy: {
          name: "asc",
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
                name: "asc",
              },
            },
            include: {
              category: true,
            },
          },
        },
      });
    }),

  getAllStockUpdatesFiltered: publicProcedure
    .input(materialGetAllStockUpdatesFilteredSchema)
    .query(({ input, ctx }) => {
      const getDateRangeStart = (
        filter: z.infer<
          typeof materialGetAllStockUpdatesFilteredSchema
        >["filter"]
      ) => {
        const today = new Date();
        switch (filter) {
          case "1D":
            return subDays(today, 1);
          case "5D":
            return subDays(today, 5);
          case "1M":
            return subMonths(today, 1);
          case "6M":
            return subMonths(today, 6);
          case "1Y":
            return subYears(today, 1);
          case "YTD":
            return startOfYear(today);
          default:
            return today; // Default to today if no valid input is provided
        }
      };

      const startDate = getDateRangeStart(input.filter);
      const endDate = endOfDay(new Date());

      return ctx.db.materialInventoryLog.findMany({
        where: {
          materialId: input.id,
          inventoryLog: {
            timestamp: {
              gte: startDate, // Greater than or equal to the start date
              lte: endDate, // Less than or equal to today
            },
          },
        },
        orderBy: {
          inventoryLog: {
            timestamp: "asc",
          },
        },
        include: {
          inventoryLog: true,
        },
      });
    }),

  // tempSeed: publicProcedure
  //   .input(z.object({ materialId: z.string() }))
  //   .mutation(async ({ input, ctx }) => {
  //     const { materialId } = input;
  //     const today = new Date();
  //     const startOfYearDate = parseISO("2023-01-01");
  //     const stockRecordTypeId = "204312ea-59aa-4bdb-9e9e-1d7226226b22";

  //     const stockLogs = Array.from({ length: 100 }).map(() => {
  //       const daysSinceStartOfYear = differenceInCalendarDays(
  //         today,
  //         startOfYearDate
  //       );
  //       return {
  //         materialId,
  //         stockRecord: {
  //           create: {
  //             prevStock: Math.floor(Math.random() * 101), // 0 to 100
  //             stock: Math.floor(Math.random() * 101), // 0 to 100
  //             notes: Math.random() > 0.5 ? "" : undefined,
  //             createdAt: addDays(
  //               startOfYearDate,
  //               Math.floor(Math.random() * daysSinceStartOfYear)
  //             ),
  //             stockRecordType: {
  //               connect: { id: stockRecordTypeId },
  //             },
  //           },
  //         },
  //       };
  //     });

  //     for (const stockLog of stockLogs) {
  //       await ctx.db.materialStockLog.create({
  //         data: {
  //           stockRecord: {
  //             create: {
  //               prevStock: stockLog.stockRecord.create.prevStock,
  //               stock: stockLog.stockRecord.create.stock,
  //               createdAt: stockLog.stockRecord.create.createdAt,
  //             },
  //           },
  //           stockRecordType: {
  //             connect: {
  //               id: stockRecordTypeId,
  //             },
  //           },
  //           material: {
  //             connect: {
  //               id: materialId,
  //             },
  //           },
  //         },
  //       });
  //     }

  //     return {
  //       success: true,
  //       message: "Material stock logs inserted successfully.",
  //     };
  //   }),

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
          name: "asc",
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

  updateStock: publicProcedure
    .input(materialUpdateStockSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.$transaction(async (tx) => {
        const {
          materialId,
          changeTypeId,
          quantityChange,
          previousQuantity,
          newQuantity,
          notes,
        } = input;

        await tx.material.update({
          where: {
            id: materialId,
          },
          data: {
            stockLevel: {
              update: {
                stock: newQuantity,
              },
            },
          },
        });

        await tx.materialInventoryLog.create({
          data: {
            inventoryLog: {
              create: {
                quantityChange,
                previousQuantity,
                newQuantity,
                notes,
              },
            },
            changeType: {
              connect: {
                id: changeTypeId,
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

  getHistory: publicProcedure
    .input(materialGetHistorySchema)
    .query(({ input, ctx }) => {
      return ctx.db.materialInventoryLog.findMany({
        where: {
          materialId: input.id,
        },
        orderBy: {
          inventoryLog: {
            timestamp: "desc",
          },
        },
        include: {
          changeType: true,
          inventoryLog: true,
        },
      });
    }),
});
