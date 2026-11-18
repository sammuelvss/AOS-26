import { Router } from 'express';
import { messageController } from '../controllers/index.js';
import {
  validate,
  createMessageSchema,
  updateMessageSchema,
  messageIdParamSchema,
} from '../middlewares/index.js';

const router = Router();

router.get('/', messageController.getMessages);
router.get('/:messageId', validate(messageIdParamSchema), messageController.getMessageById);
router.post('/', validate(createMessageSchema), messageController.createMessage);
router.put('/:messageId', validate(updateMessageSchema), messageController.updateMessage);
router.delete('/:messageId', validate(messageIdParamSchema), messageController.deleteMessage);

export default router;
export { router as messageRoutes };
