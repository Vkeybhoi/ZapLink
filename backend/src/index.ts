import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes';

export const app = express();

app.use(cors());
app.use(express.json());

// Mount URL routes
app.use('/', urlRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'ZapLink API is running' });
});