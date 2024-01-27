import { z } from 'zod';

export const productGetByCategorySlugSchema = z.object({ slug: z.string() });

export const productCreateSchema = z.object({
  name: z.string().trim().min(3, 'Must be at least 3 characters'),
  stockLevel: z.object({
    stock: z.number({ invalid_type_error: 'Must be a number' }).min(0),
    minStock: z.union([
      z.number({ invalid_type_error: 'Must be a number' }),
      z.nan(),
    ]),
    stockUnitId: z.string(),
  }),
  batchSize: z.number().min(0, 'Must be positive'),
  retailPrice: z.number().min(0, 'Must be positive'),
  wholesalePrice: z.number().min(0, 'Must be positive'),
  categoryIds: z.string().array().optional(),
  materials: z
    .object({
      materialId: z.string(),
      quantity: z
        .union([
          z.string().transform((val) => (val === '' ? NaN : Number(val))),
          z.number(),
        ])
        .refine((val) => !isNaN(val) && val > 0, {
          message: 'Quantity must be greater than 0',
        }),
    })
    .array(),
});

export const productUpdateSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(3, 'Must be at least 3 characters'),
  stockLevel: z.object({
    minStock: z.union([
      z.number({ invalid_type_error: 'Must be a number' }),
      z.nan(),
    ]),
  }),
  batchSize: z.number().min(0, 'Must be positive'),
  retailPrice: z.number().min(0, 'Must be positive'),
  wholesalePrice: z.number().min(0, 'Must be positive'),
  categoryIds: z.string().array().optional(),
  materials: z
    .object({
      materialId: z.string().min(1, 'Required'),
      quantity: z
        .union([
          z.string().transform((val) => (val === '' ? NaN : Number(val))),
          z.number(),
        ])
        .refine((val) => !isNaN(val) && val > 0, {
          message: 'Must be at least 1',
        }),
    })
    .array(),
});

export const productDeleteSchema = z.object({
  id: z.string(),
});

export const productDeleteManySchema = z.array(z.string());

export const productCreateCategorySchema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
});

export const productUpdateCategoriesSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(2, 'Must be at least 2 characters'),
      color: z.string(),
    })
  ),
});
