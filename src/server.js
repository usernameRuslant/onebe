import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes.js';

import { startServer } from './server/startServer.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
//routes
app.use('/users', userRoutes);
//errors
app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);
//start
startServer(app, PORT);
