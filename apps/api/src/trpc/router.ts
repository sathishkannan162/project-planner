import { TRPCError, initTRPC } from "@trpc/server";

import type { IncomingMessage } from "node:http";
import type { OpenApiMeta } from "trpc-to-openapi";
import { auth } from "../auth";
import { db } from "../db/index";
import { eq } from "drizzle-orm";
import { fromNodeHeaders } from "better-auth/node";
import { tasks } from "../db/schema/task";
import { trace } from "@opentelemetry/api";
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
      const tracer = trace.getTracer("api-trpc");
      return await tracer.startActiveSpan("getTasks", async (span) => {
        try {
          const result = await db
            .select()
            .from(tasks)
            .where(eq(tasks.userId, ctx.session.user.id));
          span.setAttribute("tasks.count", result.length);
          return result;
        } catch (error) {
          span.recordException(error as Error);
          span.setStatus({ code: 2, message: "Error fetching tasks" });
          throw error;
        } finally {
          span.end();
        }
      });
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
      const tracer = trace.getTracer("api-trpc");
      return await tracer.startActiveSpan("createTask", async (span) => {
        try {
          span.setAttribute("task.title", input.title);
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
            span.setStatus({ code: 2, message: "Failed to create task" });
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create task",
            });
          }

          span.setAttribute("task.id", newTask.id);
          return newTask;
        } catch (error) {
          span.recordException(error as Error);
          span.setStatus({ code: 2, message: "Error creating task" });
          throw error;
        } finally {
          span.end();
        }
      });
    }),
});

export type AppRouter = typeof appRouter;
