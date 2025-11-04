import { type IRouter, type Request, type Response, Router } from 'express';

const router: IRouter = Router();

// Placeholder handlers - Courses
const getCourses = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get courses not implemented yet' });
};

const getCourseById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get course by ID not implemented yet' });
};

const createCourse = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create course not implemented yet' });
};

const updateCourse = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update course not implemented yet' });
};

const deleteCourse = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete course not implemented yet' });
};

// Placeholder handlers - Inscriptions
const getInscriptionsByCourse = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get inscriptions by course not implemented yet' });
};

const getInscriptionById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get inscription by ID not implemented yet' });
};

const createInscription = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create inscription not implemented yet' });
};

const updateInscription = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update inscription not implemented yet' });
};

const deleteInscription = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete inscription not implemented yet' });
};

// Placeholder handlers - Favorites
const getFavoritesByCourse = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get favorites by course not implemented yet' });
};

const getFavoriteById = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Get favorite by ID not implemented yet' });
};

const createFavorite = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Create favorite not implemented yet' });
};

const updateFavorite = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Update favorite not implemented yet' });
};

const deleteFavorite = (_req: Request, _res: Response) => {
  _res.status(501).json({ message: 'Delete favorite not implemented yet' });
};

// Routes - Courses
router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

// Routes - Inscriptions
router.get('/courses/:courseId/inscriptions', getInscriptionsByCourse);
router.get('/inscriptions/:id', getInscriptionById);
router.post('/courses/:courseId/inscriptions', createInscription);
router.put('/inscriptions/:id', updateInscription);
router.delete('/inscriptions/:id', deleteInscription);

// Routes - Favorites
router.get('/courses/:courseId/favorites', getFavoritesByCourse);
router.get('/favorites/:id', getFavoriteById);
router.post('/courses/:courseId/favorites', createFavorite);
router.put('/favorites/:id', updateFavorite);
router.delete('/favorites/:id', deleteFavorite);

export default router;
