import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the Project Planner API' });
});

app.listen(port, () => {
  // biome-ignore lint/suspicious/noConsole lint/suspicious/noConsoleLog: For logs
  console.log(`API server running on port ${port}`);
});
