import express from 'express';
import helmet from 'helmet';
import { env, AppError } from './utils/index.js';
import models, { sequelize } from './models/index.js';
import { corsMiddleware, limiter, errorHandler } from './middlewares/index.js';
import routes from './routes/index.js';

const app = express();

app.set('trust proxy', true);

app.use(helmet());
app.use(corsMiddleware);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let dbInitialized = false;
let dbInitPromise = null;

const ensureDbInitialized = async () => {
  if (dbInitialized) return;
  if (!dbInitPromise) {
    dbInitPromise = sequelize
      .sync()
      .then(() => {
        dbInitialized = true;
      })
      .catch((err) => {
        dbInitPromise = null;
        throw err;
      });
  }
  await dbInitPromise;
};

app.use(async (req, res, next) => {
  await ensureDbInitialized();
  req.context = { models };
  next();
});

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'API de Gerenciamento de Tarefas ativa.',
  });
});

app.use('/', routes);

app.use((req, res, next) => {
  next(new AppError(`Rota ${req.originalUrl} não encontrada.`, 404));
});

app.use(errorHandler);

if (!process.env.VERCEL) {
  ensureDbInitialized()
    .then(() => {
      console.log('📦 Database synced');
      app.listen(env.PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${env.PORT} [${env.NODE_ENV}]`);
      });
    })
    .catch((err) => {
      console.error('❌ Falha ao sincronizar o banco de dados:', err);
      process.exit(1);
    });
}

export default app;
