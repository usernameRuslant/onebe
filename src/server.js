import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';

import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
