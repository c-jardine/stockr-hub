import { z } from 'zod';

export const materialCreateSchema = z.object({
  itemDetails: z.object({
    name: z.string().trim().min(3, 'Must be at least 3 characters'),
    stock: z.number({ invalid_type_error: 'Must be a number' }).min(0),
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
    costPerUnit: z.number(),
  }),
  url: z.string().url().or(z.literal('')),
  stockUnitId: z.string(),
  categoryIds: z.string().array().optional(),
  vendorId: z.string(),
});

export const materialUpdateSchema = z.object({
  id: z.string(),
  itemDetails: z.object({
    name: z.string().trim().min(3, 'Must be at least 3 characters'),
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
  }),
  url: z.string().url().or(z.literal('')),
  categoryIds: z.string().array().optional(),
  vendorId: z.string(),
});

export const materialDeleteSchema = z.object({
  id: z.string(),
});
