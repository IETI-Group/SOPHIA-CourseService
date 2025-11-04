import { type IRouter, type Request, type Response, Router } from 'express';
import container from '../config/diContainer.js';
import type { AISpecsController } from '../controllers/index.js';

export const createAISpecsRouter = (aiSpecsController?: AISpecsController): IRouter => {
  const router: IRouter = Router();

  const _aiSpecsController =
    aiSpecsController ?? container.resolve<AISpecsController>('aiSpecsController');

  const getAISpecsByLesson = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get AI specs by lesson not implemented yet' });
  };

  const getAISpecById = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get AI spec by ID not implemented yet' });
  };

  const createAISpec = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Create AI spec not implemented yet' });
  };

  const updateAISpec = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Update AI spec not implemented yet' });
  };

  const deleteAISpec = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Delete AI spec not implemented yet' });
  };

  router.get('/lessons/:lessonId/ai-specs', getAISpecsByLesson);
  router.get('/ai-specs/:id', getAISpecById);
  router.post('/lessons/:lessonId/ai-specs', createAISpec);
  router.put('/ai-specs/:id', updateAISpec);
  router.delete('/ai-specs/:id', deleteAISpec);

  return router;
};

export default createAISpecsRouter();
