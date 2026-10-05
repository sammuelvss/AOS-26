import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './middlewares/cors.js';
import routes from './routes/index.js';
import { AppError } from './utils/appError.js';
import { sequelize } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', routes);


app.use((err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  

  if (error.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
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

  res.status(statusCode).json(response);
});

// Inicialização do servidor apenas fora do ambiente serverless da Vercel
if (!process.env.VERCEL) {
  sequelize.sync().then(() => {
    console.log('📦 Database synced');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log('Olá, Turma!!!');
      console.log('MY_SECRET =', process.env.MY_SECRET);
    });
  }).catch((err) => {
    console.error('❌ Falha ao sincronizar o banco de dados:', err);
  });
}

export default app;
