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
