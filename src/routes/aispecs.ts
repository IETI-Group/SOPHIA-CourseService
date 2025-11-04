import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - AI Specs
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

// Routes - AI Specs
router.get('/lessons/:lessonId/ai-specs', getAISpecsByLesson);
router.get('/ai-specs/:id', getAISpecById);
router.post('/lessons/:lessonId/ai-specs', createAISpec);
router.put('/ai-specs/:id', updateAISpec);
router.delete('/ai-specs/:id', deleteAISpec);

export default router;
