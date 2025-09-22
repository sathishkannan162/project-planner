import { db } from '../db/index';
import { initTRPC } from '@trpc/server';
import { tasks } from '../db/schema/schema';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),

  getTasks: t.procedure.query(async () => {
    return await db.select().from(tasks);
  }),

  createTask: t.procedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const [newTask] = await db
        .insert(tasks)
        .values({
          title: input.title,
          description: input.description,
        })
        .returning();
      return newTask;
    }),
});

export type AppRouter = typeof appRouter;
