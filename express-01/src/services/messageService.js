import { Message } from '../models/index.js';
import { AppError } from '../utils/index.js';

export const messageService = {
  async getMessages() {
    return await Message.findAll();
  },

  async getMessageById(messageId) {
    const message = await Message.findByPk(messageId);
    if (!message) {
      throw new AppError('Mensagem não encontrada.', 404);
    }
    return message;
  },

  async createMessage({ text, userId }) {
    return await Message.create({ text, userId });
  },

  async updateMessage(messageId, { text }) {
    const message = await this.getMessageById(messageId);
    if (text !== undefined) {
      message.text = text;
    }
    await message.save();
    return message;
  },

  async deleteMessage(messageId) {
    const message = await this.getMessageById(messageId);
    await message.destroy();
    return true;
  },
};

export default messageService;
