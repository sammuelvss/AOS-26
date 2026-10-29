import 'dotenv/config';
import { env } from './utils/env.js';
import express from 'express';
import helmet from 'helmet';
import { corsMiddleware, limiter, errorHandler } from './middlewares/index.js';
import routes from './routes/index.js';
import { sequelize } from './config/database.js';

const app = express();
const PORT = env.PORT;

app.set('trust proxy', true);

app.use(helmet());
app.use(corsMiddleware);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(errorHandler);

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
