import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT: number = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to ZapLink API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});