import { z } from 'zod';

export const createMaterialAuditSchema = z.object({
  category: z.string(),
  items: z.array(
    z.object({
      materialId: z.string(),
      name: z.string(),
      expectedStock: z.number(),
      actualStock: z.number(),
      stockUnit: z.string(),
      notes: z.string(),
    })
  ),
});

export const updateMaterialAuditSchema = z.object({
  id: z.string(),
  category: z.string(),
  items: z.array(
    z.object({
      materialId: z.string(),
      name: z.string(),
      expectedStock: z.number(),
      actualStock: z.number(),
      stockUnit: z.string(),
      notes: z.string(),
    })
  ),
});

export const cancelMaterialAuditSchema = z.object({ id: z.string() });
