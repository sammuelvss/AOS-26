import { Router } from 'express';
import homeRoutes from './home.routes.js';
import usersRoutes from './users.routes.js';
import messageRoutes from './message.routes.js';
import sessionRoutes from './session.js';

const routes = Router();

routes.use('/', homeRoutes);
routes.use('/users', usersRoutes);
routes.use('/messages', messageRoutes);
routes.use('/session', sessionRoutes);

export default routes;
