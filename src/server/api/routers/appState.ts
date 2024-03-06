import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const appStateRouter = createTRPCRouter({
  getAppState: publicProcedure.query(({ ctx }) => {
    return ctx.db.appState.findFirst({
      include: {
        auditState: {
          include: {
            materialAudit: true,
          },
        },
      },
    });
  }),

  startAudit: publicProcedure
    .input(z.object({ auditId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.appState.update({
        where: {
          id: 1,
        },
        data: {
          auditState: {
            update: {
              where: {
                id: 1,
              },
              data: {
                inProgress: true,
                materialAudit: {
                  connect: {
                    id: input.auditId,
                  },
                },
              },
            },
          },
        },
      });
    }),
});
