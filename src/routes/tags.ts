import { type IRouter, type Request, type Response, Router } from 'express';
import container from '../config/diContainer.js';
import type { TagsController } from '../controllers/index.js';

export const createTagsRouter = (tagsController?: TagsController): IRouter => {
  const router: IRouter = Router();

  const _tagsController = tagsController ?? container.resolve<TagsController>('tagsController');

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

  router.get('/tags', getTags);
  router.get('/tags/:id', getTagById);
  router.post('/tags', createTag);
  router.put('/tags/:id', updateTag);
  router.delete('/tags/:id', deleteTag);

  return router;
};

export default createTagsRouter();
