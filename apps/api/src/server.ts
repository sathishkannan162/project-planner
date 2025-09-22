import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import { auth } from './auth';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import dotenv from 'dotenv';
import express from 'express';
import { toNodeHandler } from 'better-auth/node';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());

const createContext = ({ req, res }: CreateExpressContextOptions) => ({ req, res });

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the Project Planner API' });
});

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole lint/suspicious/noConsoleLog: For logs
  console.log(`API server running on port ${port}`);
});
