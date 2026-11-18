import { tarefaService } from '../services/index.js';

export const criarTarefa = async (req, res) => {
  const novaTarefa = await tarefaService.criarTarefa(req.body);
  return res.status(201).json(novaTarefa);
};

export const listarTarefas = async (req, res) => {
  const tarefas = await tarefaService.listarTarefas();
  return res.status(200).json(tarefas);
};

export const buscarTarefaPorId = async (req, res) => {
  const { objectId } = req.params;
  const tarefa = await tarefaService.buscarTarefaPorId(objectId);
  return res.status(200).json(tarefa);
};

export const atualizarTarefa = async (req, res) => {
  const { objectId } = req.params;
  const tarefaAtualizada = await tarefaService.atualizarTarefa(objectId, req.body);
  return res.status(200).json(tarefaAtualizada);
};

export const deletarTarefa = async (req, res) => {
  const { objectId } = req.params;
  await tarefaService.deletarTarefa(objectId);
  return res.status(200).json({ message: 'Tarefa removida com sucesso.' });
};

export const tarefaController = {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  deletarTarefa,
};

export default tarefaController;
