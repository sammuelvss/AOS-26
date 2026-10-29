import { Router } from 'express';
import { messageController } from '../controllers/index.js';
import {
  validate,
  createMessageSchema,
  messageIdParamSchema,
} from '../middlewares/index.js';

const router = Router();

router.get('/', messageController.getMessages);
router.post('/', validate(createMessageSchema), messageController.createMessage);
router.get('/:messageId', validate(messageIdParamSchema), messageController.getMessageById);
router.put('/:messageId', validate(messageIdParamSchema), messageController.updateMessage);
router.delete('/:messageId', validate(messageIdParamSchema), messageController.deleteMessage);

export default router;
