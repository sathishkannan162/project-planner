import { TRPCError, initTRPC } from '@trpc/server';

import type { IncomingMessage } from 'node:http';
import { auth } from '../auth';
import { db } from '../db/index';
import { eq } from 'drizzle-orm';
import { fromNodeHeaders } from 'better-auth/node';
import { tasks } from '../db/schema/task';
import { z } from 'zod';

const t = initTRPC
  .context<{
    req: IncomingMessage;
    session?: ReturnType<typeof auth.api.getSession>;
  }>()
  .create();

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(ctx.req.headers),
  });

  if (!session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      session,
    },
  });
});

const protectedProcedure = t.procedure.use(authMiddleware);

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),

  getTasks: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, ctx.session.user.id));
  }),

  createTask: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [newTask] = await db
        .insert(tasks)
        .values({
          title: input.title,
          description: input.description,
          userId: ctx.session.user.id,
        })
        .returning();
      return newTask;
    }),
});

export type AppRouter = typeof appRouter;
