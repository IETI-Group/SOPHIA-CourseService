import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers
const getResources = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get resources not implemented yet' });
};

const getResourceById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get resource by ID not implemented yet' });
};

const createResource = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create resource not implemented yet' });
};

const updateResource = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update resource not implemented yet' });
};

const deleteResource = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete resource not implemented yet' });
};

// Define routes
router.get('/resources', getResources);
router.get('/resources/:id', getResourceById);
router.post('/resources', createResource);
router.put('/resources/:id', updateResource);
router.delete('/resources/:id', deleteResource);

export default router;
