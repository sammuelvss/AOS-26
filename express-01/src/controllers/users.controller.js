import { userService } from '../services/userService.js';
import { AppError } from '../utils/appError.js';

export const getUsers = async (req, res) => {
  const users = [{ id: 1, name: 'João' }];
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const userId = req.params.userId || req.params.id;
  const user = await userService.getUserById(userId);
  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const { username, email, name } = req.body;
  const userName = username || name;
  if (!userName) {
    throw new AppError('Nome é obrigatório', 400);
  }
  const user = await userService.createUser({ name: userName, email });
  res.status(201).json({ message: 'Usuário criado', user });
};

export const updateUser = async (req, res) => {
  const userId = req.params.userId || req.params.id;
  const { username, name } = req.body;
  const userName = username || name;

  const user = await userService.updateUser(userId, { name: userName });
  res.status(200).json({ message: 'Usuário atualizado', user });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.userId || req.params.id;
  await userService.deleteUser(userId);
  res.status(204).send();
};

export const notFound = (req, res) => {
  throw new AppError('Recurso não encontrado', 404);
};

export const unauthorized = (req, res) => {
  throw new AppError('Não autorizado', 401);
};

export const forbidden = (req, res) => {
  throw new AppError('Acesso proibido', 403);
};

export const serverError = (req, res) => {
  throw new Error('Erro interno do servidor que não é AppError simulado.');
};
