import { type IRouter, type Request, type Response, Router } from 'express';
import container from '../config/diContainer.js';
import type { CategoriesController } from '../controllers/index.js';

export const createCategoriesRouter = (categoriesController?: CategoriesController): IRouter => {
  const router: IRouter = Router();

  const _categoriesController =
    categoriesController ?? container.resolve<CategoriesController>('categoriesController');

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

  router.get('/categories', getCategories);
  router.get('/categories/:id', getCategoryById);
  router.post('/categories', createCategory);
  router.put('/categories/:id', updateCategory);
  router.delete('/categories/:id', deleteCategory);

  return router;
};

export default createCategoriesRouter();
