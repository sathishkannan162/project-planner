import { TRPCError, initTRPC } from "@trpc/server";

import type { IncomingMessage } from "node:http";
import type { OpenApiMeta } from "trpc-to-openapi";
import { auth } from "../auth";
import { db } from "../db/index";
import { eq } from "drizzle-orm";
import { fromNodeHeaders } from "better-auth/node";
import { tasks } from "../db/schema/task";
import { z } from "zod";

const t = initTRPC
  .context<{
    req: IncomingMessage;
    session?: ReturnType<typeof auth.api.getSession>;
  }>()
  .meta<OpenApiMeta>()
  .create();

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(ctx.req.headers),
  });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
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
    .meta({ openapi: { method: "GET", path: "/hello" } })
    .input(z.object({ name: z.string() }))
    .output(z.string())
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),

  getTasks: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/tasks", protect: true } })
    .input(z.object({}))
    .output(
      z.array(
        z.object({
          id: z.number().int(),
          title: z.string(),
          description: z.string().nullable(),
          completed: z.boolean().nullable(),
          createdAt: z.date().nullable(),
          userId: z.string().nullable(),
        })
      )
    )
    .query(async ({ ctx }) => {
      return await db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, ctx.session.user.id));
    }),

  createTask: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/tasks", protect: true } })
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .output(
      z.object({
        id: z.number().int(),
        title: z.string(),
        description: z.string().nullable(),
        completed: z.boolean().nullable(),
        createdAt: z.date().nullable(),
        userId: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newTask = (
        await db
          .insert(tasks)
          .values({
            title: input.title,
            description: input.description,
            userId: ctx.session.user.id,
          })
          .returning()
      )[0];

      if (!newTask) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create task",
        });
      }

      return newTask;
    }),
});

export type AppRouter = typeof appRouter;
