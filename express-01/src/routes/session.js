import { Router } from 'express';
import { authLimiter } from '../middlewares/index.js';

const router = Router();

router.use(authLimiter);

router.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Rota de sessão ativa' });
});

router.post('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Sessão iniciada' });
});

export default router;

