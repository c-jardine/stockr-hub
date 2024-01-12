import { z } from 'zod';

export const materialInputSchema = z.object({
  id: z.number().optional(),
  itemDetails: z.object({
    name: z.string().trim().min(3, 'Must be at least 3 characters'),
    stock: z.number({ invalid_type_error: 'Must be a number' }).min(0),
    minStock: z
      .number({ invalid_type_error: 'Must be a number' })
      .or(z.literal('')),
    costPerUnit: z.number(),
  }),
  url: z.string().url().or(z.literal('')),
  stockUnitId: z.number(),
  categoryIds: z.number().array().optional(),
  vendorId: z.number(),
});

export const materialDeleteSchema = z.object({
  id: z.number(),
});
