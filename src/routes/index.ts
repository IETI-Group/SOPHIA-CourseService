import { type IRouter, Router } from 'express';
import aispecs from './aispecs.js';
import assignments from './assignments.js';
import auth from './auth.js';
import categories from './categories.js';
import courses from './courses.js';
import healthRoutes from './health.js';
import lessons from './lessons.js';
import quizzes from './quizzes.js';
import resources from './resources.js';
import sections from './sections.js';
import tags from './tags.js';

const router: IRouter = Router();

// Rutas de la aplicación
router.use('/health', healthRoutes);
router.use('/auth', auth);
router.use(courses);
router.use(lessons);
router.use(quizzes);
router.use(assignments);
router.use(sections);
router.use(resources);
router.use(tags);
router.use(categories);
router.use(aispecs);

export default router;
