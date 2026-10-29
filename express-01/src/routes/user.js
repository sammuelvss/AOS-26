import { Router } from 'express';
import { usersController } from '../controllers/index.js';
import {
  validate,
  createUserSchema,
  userIdParamSchema,
} from '../middlewares/index.js';

const router = Router();

router.get('/', usersController.getUsers);
router.post('/', validate(createUserSchema), usersController.createUser);
router.get('/error', usersController.serverError);
router.get('/unauthorized', usersController.unauthorized);
router.get('/forbidden', usersController.forbidden);
router.get('/:userId', validate(userIdParamSchema), usersController.getUserById);
router.put('/:userId', validate(userIdParamSchema), usersController.updateUser);
router.delete('/:userId', validate(userIdParamSchema), usersController.deleteUser);
router.use(usersController.notFound);

export default router;

