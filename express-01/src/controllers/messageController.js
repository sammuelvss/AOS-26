import { messageService } from '../services/index.js';

export const getMessages = async (req, res) => {
  const messages = await messageService.getMessages();
  return res.status(200).json(messages);
};

export const getMessageById = async (req, res) => {
  const { messageId } = req.params;
  const message = await messageService.getMessageById(messageId);
  return res.status(200).json(message);
};

export const createMessage = async (req, res) => {
  const { text, userId } = req.body;
  const createdMessage = await messageService.createMessage({ text, userId });
  return res.status(201).json(createdMessage);
};

export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { text } = req.body;
  const updatedMessage = await messageService.updateMessage(messageId, { text });
  return res.status(200).json(updatedMessage);
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  await messageService.deleteMessage(messageId);
  return res.status(204).send();
};

export const messageController = {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};

export default messageController;
