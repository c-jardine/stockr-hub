import { createTRPCRouter } from '@/server/api/trpc';
import {
  appStateRouter,
  auditRouter,
  categoriesRouter,
  materialRouter,
  productRouter,
  stockUnitRouter,
  vendorRouter,
} from './routers';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appState: appStateRouter,
  material: materialRouter,
  product: productRouter,
  stockUnit: stockUnitRouter,
  vendor: vendorRouter,
  categories: categoriesRouter,
  audit: auditRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
