import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Project Planner API' });
});

app.get('/packages', (req, res) => {
  // Mock data for packages
  const packages = [
    { name: '@repo/ui', version: '0.1.0', description: 'Shared UI components' },
    { name: '@repo/typescript-config', version: '0.0.0', description: 'Shared TypeScript configurations' }
  ];
  res.json(packages);
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});