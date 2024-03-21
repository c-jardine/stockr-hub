import { z } from "zod";

export const updateUserSchema = z.object({
  businessName: z.string(),
  logoUrl: z.string().url(),
  websiteUrl: z.string().url(),
  industry: z.string(),
});
