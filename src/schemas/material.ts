import { z } from 'zod';

export const materialCreateSchema = z.object({
  name: z.string().trim().min(3, 'Must be at least 3 characters'),
  url: z.string().url().or(z.literal('')),
  stockLevel: z.object({
    stock: z.number({ invalid_type_error: 'Must be a number' }).min(0),
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
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
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
  }),
  categoryIds: z.string().array().optional(),
  vendorId: z.string(),
});

export const materialDeleteSchema = z.object({
  id: z.string(),
});
