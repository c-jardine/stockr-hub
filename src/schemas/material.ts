import { z } from 'zod';

export const materialGetByCategorySlugSchema = z.object({ slug: z.string() });

export const materialGetPaginatedSchema = z.object({
  skip: z.number(),
  take: z.number(),
});

export const materialCreateSchema = z.object({
  name: z.string().trim().min(3, 'Must be at least 3 characters'),
  url: z.string().url().or(z.literal('')),
  stockLevel: z.object({
    stock: z.number({ invalid_type_error: 'Must be a number' }).min(0),
    minStock: z.union([
      z.number({ invalid_type_error: 'Must be a number' }),
      z.nan(),
    ]),
    stockUnitId: z.string(),
  }),
  costPerUnit: z.number(),
  categoryIds: z.string().array().optional(),
  vendorId: z.string(),
});

export const materialUpdateSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(3, 'Must be at least 3 characters'),
  url: z.string().url().or(z.literal('')),
  stockLevel: z.object({
    minStock: z.union([
      z.number({ invalid_type_error: 'Must be a number' }),
      z.nan(),
    ]),
  }),
  categoryIds: z.string().array().optional(),
  vendorId: z.string(),
});

export const materialDeleteSchema = z.object({
  id: z.string(),
});

export const materialDeleteManySchema = z.array(z.string());

export const materialCreateCategorySchema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
});

export const materialUpdateCategoriesSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(2, 'Must be at least 2 characters'),
      color: z.string(),
    })
  ),
});
