import { createTRPCRouter } from "@/server/api/trpc";
import {
  appStateRouter,
  auditRouter,
  categoriesRouter,
  logChangeTypesRouter,
  materialRouter,
  productRouter,
  stockUnitRouter,
  userRouter,
  vendorRouter,
} from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appState: appStateRouter,
  user: userRouter,
  material: materialRouter,
  product: productRouter,
  stockUnit: stockUnitRouter,
  vendor: vendorRouter,
  categories: categoriesRouter,
  audit: auditRouter,
  logChangeTypes: logChangeTypesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
