import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - Sections
const getSectionsByCourse = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get sections by course not implemented yet' });
};

const getSectionById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get section by ID not implemented yet' });
};

const createSection = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create section not implemented yet' });
};

const updateSection = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update section not implemented yet' });
};

const deleteSection = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete section not implemented yet' });
};

// Routes - Sections
router.get('/courses/:courseId/sections', getSectionsByCourse);
router.get('/sections/:id', getSectionById);
router.post('/courses/:courseId/sections', createSection);
router.put('/sections/:id', updateSection);
router.delete('/sections/:id', deleteSection);

export default router;
