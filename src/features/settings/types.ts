import { type RouterInputs } from "@/utils/api";
import { InventoryAdjustmentType } from "@prisma/client";
import { z } from "zod";

export const newStockAdjustmentTypeSchema = z.object({
  inventoryType: z.union([z.literal("material"), z.literal("product")]),
  name: z.string(),
  description: z.string(),
  adjustmentType: z.nativeEnum(InventoryAdjustmentType),
});

export type NewStockAdjustmentTypeInput =
  RouterInputs["logChangeTypes"]["create"];
