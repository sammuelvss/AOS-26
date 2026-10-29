import { Message } from '../models/Message.js';
import { AppError } from '../utils/appError.js';

export const messageService = {
  async getMessages() {
    return await Message.findAll();
  },

  async getMessageById(messageId) {
    const message = await Message.findByPk(messageId);
    if (!message) {
      throw new AppError('Message not found', 404);
    }
    return message;
  },

  async createMessage(data) {
    return await Message.create(data);
  },

  async updateMessage(messageId, data) {
    const message = await Message.findByPk(messageId);
    if (!message) {
      throw new AppError('Message not found', 404);
    }
    return await message.update(data);
  },

  async deleteMessage(messageId) {
    const message = await Message.findByPk(messageId);
    if (!message) {
      throw new AppError('Message not found', 404);
    }
    await message.destroy();
    return true;
  }
};
