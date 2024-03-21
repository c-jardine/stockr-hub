import { z } from "zod";

export const updateUserSchema = z.object({
  businessName: z.union([z.literal(""), z.string().trim().max(40, "Too long")]),
  logoUrl: z.string().url("Not a valid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Not a valid URL").optional().or(z.literal("")),
  industry: z.string(),
});

export const updateUserPhotoSchema = z.string().url();
