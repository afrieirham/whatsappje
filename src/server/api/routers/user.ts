import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  sync: privateProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      // find or create user
      const user = await ctx.db.user.upsert({
        where: { id: ctx.clerkId },
        create: { id: ctx.clerkId, email: input.email },
        update: {},
      });

      // add internal userId to clerk user
      await clerkClient().users.updateUserMetadata(ctx.clerkId, {
        publicMetadata: { plan: user.plan },
      });

      return user;
    }),
  getUserPlan: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findFirst({ where: { id: ctx.clerkId } });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "user not found" });
    }

    return user.plan;
  }),
});
