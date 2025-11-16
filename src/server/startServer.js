import { connectMongoDB } from '../db/connectMongoDB.js';

export const startServer = async (app, PORT) => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};
