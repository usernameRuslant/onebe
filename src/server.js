import express from 'express';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
