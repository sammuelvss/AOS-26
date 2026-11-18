import { Router } from 'express';
import { tarefaController } from '../controllers/index.js';
import {
  validate,
  createTarefaSchema,
  updateTarefaSchema,
  tarefaIdParamSchema,
} from '../middlewares/index.js';

const router = Router();

router.post('/', validate(createTarefaSchema), tarefaController.criarTarefa);
router.get('/', tarefaController.listarTarefas);
router.get('/:objectId', validate(tarefaIdParamSchema), tarefaController.buscarTarefaPorId);
router.put('/:objectId', validate(updateTarefaSchema), tarefaController.atualizarTarefa);
router.delete('/:objectId', validate(tarefaIdParamSchema), tarefaController.deletarTarefa);

export default router;
export { router as tarefaRoutes };
