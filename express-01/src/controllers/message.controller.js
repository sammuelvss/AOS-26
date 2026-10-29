import { messageService } from '../services/messageService.js';
import { AppError } from '../utils/appError.js';

export const getMessages = async (req, res) => {
  const messages = await messageService.getMessages();
  res.status(200).json(messages);
};

export const getMessageById = async (req, res) => {
  const { messageId } = req.params;
  const message = await messageService.getMessageById(messageId);
  res.status(200).json(message);
};

export const createMessage = async (req, res) => {
  const { text, content } = req.body;
  const messageContent = text || content;

  if (!messageContent) {
    throw new AppError('Conteúdo (text) é obrigatório', 400);
  }

  const createdMessage = await messageService.createMessage({ content: messageContent });
  res.status(201).json({ message: 'Mensagem criada', data: createdMessage });
};

export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { text, content } = req.body;
  const messageContent = text || content;

  if (!messageContent) {
    throw new AppError('Conteúdo (content) é obrigatório', 400);
  }

  const updatedMessage = await messageService.updateMessage(messageId, { content: messageContent });
  res.status(200).json({ message: 'Mensagem atualizada', data: updatedMessage });
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  await messageService.deleteMessage(messageId);
  res.status(204).send();
};
