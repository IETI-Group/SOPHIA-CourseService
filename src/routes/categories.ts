import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - Categories
const getCategories = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get categories not implemented yet' });
};

const getCategoryById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get category by ID not implemented yet' });
};

const createCategory = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create category not implemented yet' });
};

const updateCategory = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update category not implemented yet' });
};

const deleteCategory = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete category not implemented yet' });
};

// Routes - Categories
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
