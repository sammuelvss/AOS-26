import { Router } from 'express';
import tarefaRoutes from './tarefa.js';
import userRoutes from './user.js';
import messageRoutes from './message.js';

const routes = Router();

routes.use('/tarefas', tarefaRoutes);
routes.use('/users', userRoutes);
routes.use('/messages', messageRoutes);

export { tarefaRoutes, userRoutes, messageRoutes };
export default routes;
