import { userService } from '../services/index.js';

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  return res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const { username, email } = req.body;
  const user = await userService.createUser({ username, email });
  return res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  const user = await userService.updateUser(userId, { username, email });
  return res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await userService.deleteUser(userId);
  return res.status(204).send();
};

export const userController = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
