import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - Tags
const getTags = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get tags not implemented yet' });
};

const getTagById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get tag by ID not implemented yet' });
};

const createTag = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create tag not implemented yet' });
};

const updateTag = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update tag not implemented yet' });
};

const deleteTag = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete tag not implemented yet' });
};

// Routes - Tags
router.get('/tags', getTags);
router.get('/tags/:id', getTagById);
router.post('/tags', createTag);
router.put('/tags/:id', updateTag);
router.delete('/tags/:id', deleteTag);

export default router;
