import { isHttpError } from 'http-errors';

const errorHandler = (error, req, res, next) => {
  console.error('❌ Error:', error.message);

  // Если это ошибка, созданная через http-errors (например 404, 401, 400)
  if (isHttpError(error)) {
    return res.status(error.status).json({ message: error.message });
  }

  // Неизвестные ошибки — 500
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
