import { User } from '../models/User.js';
import { AppError } from '../utils/appError.js';

export const userService = {
  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  },

  async createUser(data) {
    return await User.create(data);
  },

  async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return await user.update(data);
  },

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    await user.destroy();
    return true;
  }
};
