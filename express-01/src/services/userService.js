import { User } from '../models/index.js';
import { AppError } from '../utils/index.js';

export const userService = {
  async getUsers() {
    return await User.findAll();
  },

  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }
    return user;
  },

  async createUser({ username, email }) {
    return await User.create({ username, email });
  },

  async updateUser(userId, data) {
    const user = await this.getUserById(userId);
    if (data.username !== undefined) user.username = data.username;
    if (data.email !== undefined) user.email = data.email;
    await user.save();
    return user;
  },

  async deleteUser(userId) {
    const user = await this.getUserById(userId);
    await user.destroy();
    return true;
  },
};

export default userService;
