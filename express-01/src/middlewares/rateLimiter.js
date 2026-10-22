import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/index.js';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  validate: { trustProxy: false },
  handler: (req, res, next) => {
    next(
      new AppError(
        'Muitas requisições originadas deste IP. Tente novamente em 15 minutos.',
        429
      )
    );
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  validate: { trustProxy: false },
  handler: (req, res, next) => {
    next(
      new AppError(
        'Muitas tentativas de autenticação originadas deste IP. Tente novamente em 15 minutos.',
        429
      )
    );
  },
});

