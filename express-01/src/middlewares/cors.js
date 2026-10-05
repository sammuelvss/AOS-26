import cors from 'cors';

const defaultAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const getAllowedOrigins = () => {
  if (process.env.ALLOWED_ORIGINS) {
    return process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);
  }
  return defaultAllowedOrigins;
};

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = getAllowedOrigins();

    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

   
    return callback(null, false);
  },
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);

export default corsMiddleware;

