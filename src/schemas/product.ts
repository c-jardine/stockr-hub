import { z } from 'zod';

export const productCreateSchema = z.object({
  name: z.string().trim().min(3, 'Must be at least 3 characters'),
  stockLevel: z.object({
    stock: z.number({ invalid_type_error: 'Must be a number' }).min(0),
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
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
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
  }),
  batchSize: z.number().min(0, 'Must be positive'),
  retailPrice: z.number().min(0, 'Must be positive'),
  wholesalePrice: z.number().min(0, 'Must be positive'),
  categoryIds: z.string().array().optional(),
});

// export const materialDeleteSchema = z.object({
//   id: z.string(),
// });
