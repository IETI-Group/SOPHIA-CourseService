import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - Assignments
const getAssignmentsByLesson = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get assignments by lesson not implemented yet' });
};

const getAssignmentById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get assignment by ID not implemented yet' });
};

const createAssignment = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create assignment not implemented yet' });
};

const updateAssignment = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update assignment not implemented yet' });
};

const deleteAssignment = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete assignment not implemented yet' });
};

// Routes - Assignments
router.get('/lessons/:lessonId/assignments', getAssignmentsByLesson);
router.get('/assignments/:id', getAssignmentById);
router.post('/lessons/:lessonId/assignments', createAssignment);
router.put('/assignments/:id', updateAssignment);
router.delete('/assignments/:id', deleteAssignment);

export default router;
