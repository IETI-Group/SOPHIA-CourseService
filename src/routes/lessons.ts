import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - Lessons
const getLessonsBySection = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get lessons by section not implemented yet' });
};

const getLessonById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get lesson by ID not implemented yet' });
};

const createLesson = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create lesson not implemented yet' });
};

const updateLesson = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update lesson not implemented yet' });
};

const deleteLesson = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete lesson not implemented yet' });
};

// Placeholder handlers - Contents
const getContentsByLesson = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get contents by lesson not implemented yet' });
};

const getContentById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get content by ID not implemented yet' });
};

const createContent = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create content not implemented yet' });
};

const updateContent = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update content not implemented yet' });
};

const deleteContent = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete content not implemented yet' });
};

// Placeholder handlers - Progress
const getProgressByContent = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get progress by content not implemented yet' });
};

const getProgressById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get progress by ID not implemented yet' });
};

const createProgress = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create progress not implemented yet' });
};

const updateProgress = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update progress not implemented yet' });
};

const deleteProgress = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete progress not implemented yet' });
};

// Routes - Lessons
router.get('/sections/:sectionId/lessons', getLessonsBySection);
router.get('/lessons/:id', getLessonById);
router.post('/sections/:sectionId/lessons', createLesson);
router.put('/lessons/:id', updateLesson);
router.delete('/lessons/:id', deleteLesson);

// Routes - Contents
router.get('/lessons/:lessonId/contents', getContentsByLesson);
router.get('/contents/:id', getContentById);
router.post('/lessons/:lessonId/contents', createContent);
router.put('/contents/:id', updateContent);
router.delete('/contents/:id', deleteContent);

// Routes - Progress
router.get('/contents/:contentId/progress', getProgressByContent);
router.get('/progress/:id', getProgressById);
router.post('/contents/:contentId/progress', createProgress);
router.put('/progress/:id', updateProgress);
router.delete('/progress/:id', deleteProgress);

export default router;
