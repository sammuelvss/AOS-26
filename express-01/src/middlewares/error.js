import { ZodError } from 'zod';
import { AppError } from '../utils/index.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const issues = err.issues || err.errors || [];
    const errors = issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);

    return res.status(400).json({
      status: 'fail',
      message: errors.join('; '),
      errors,
    });
  }

  let error = { ...err };
  error.message = err.message;
  error.name = err.name;

  if (error.name === 'SequelizeValidationError') {
    const messages = err.errors.map((e) => e.message);
    error = new AppError(`Erro de validação: ${messages.join(', ')}`, 400);
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    error = new AppError('Registro já existe (conflito de duplicidade).', 409);
  }

  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';
  const message = error.isOperational ? error.message : 'Algo deu errado no servidor';

  const response = {
    status,
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;

