import { appRouter } from './trpc/router';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

app.use('/trpc', createExpressMiddleware({
  router: appRouter,
}));

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the Project Planner API' });
});

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole lint/suspicious/noConsoleLog: For logs
  console.log(`API server running on port ${port}`);
});
