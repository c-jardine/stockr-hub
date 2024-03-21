import { updateUserSchema } from "@/schemas";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst();
  }),

  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: 1,
        },
        data: input,
      });
    }),
});
