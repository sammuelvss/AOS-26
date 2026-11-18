import { Tarefa } from '../models/index.js';
import { AppError } from '../utils/index.js';

export const criarTarefa = async ({ descricao, concluida = false }) => {
  return await Tarefa.create({
    descricao,
    concluida,
  });
};

export const listarTarefas = async () => {
  return await Tarefa.findAll({
    order: [['createdAt', 'ASC']],
  });
};

export const buscarTarefaPorId = async (objectId) => {
  const tarefa = await Tarefa.findByPk(objectId);
  if (!tarefa) {
    throw new AppError('Tarefa não encontrada.', 404);
  }
  return tarefa;
};

export const atualizarTarefa = async (objectId, dadosAtualizacao) => {
  const tarefa = await buscarTarefaPorId(objectId);

  if (dadosAtualizacao.descricao !== undefined) {
    tarefa.descricao = dadosAtualizacao.descricao;
  }
  if (dadosAtualizacao.concluida !== undefined) {
    tarefa.concluida = dadosAtualizacao.concluida;
  }

  await tarefa.save();
  return tarefa;
};

export const deletarTarefa = async (objectId) => {
  const tarefa = await buscarTarefaPorId(objectId);
  await tarefa.destroy();
  return true;
};

export const tarefaService = {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  deletarTarefa,
};

export default tarefaService;
