import { createTRPCRouter } from '@/server/api/trpc';
import {
  categoriesRouter,
  productRouter,
  stockUnitRouter,
  vendorRouter,
} from './routers';
import { materialRouter } from './routers/material';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  material: materialRouter,
  product: productRouter,
  stockUnit: stockUnitRouter,
  vendor: vendorRouter,
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
