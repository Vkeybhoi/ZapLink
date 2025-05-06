import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes';
import { clearData } from "./utils/clearData";

export const app = express();

app.use(cors());
app.use(express.json());
clearData();

// Mount URL routes
app.use('/', urlRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'ZapLink API is running' });
});