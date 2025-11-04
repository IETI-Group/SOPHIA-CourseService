import { type IRouter, type Request, type Response, Router } from 'express';
import container from '../config/diContainer.js';
import type { QuizzesController } from '../controllers/index.js';

export const createQuizzesRouter = (quizzesController?: QuizzesController): IRouter => {
  const router: IRouter = Router();

  const _quizzesController =
    quizzesController ?? container.resolve<QuizzesController>('quizzesController');

  const getQuizzesBySection = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get quizzes by section not implemented yet' });
  };

  const getQuizById = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get quiz by ID not implemented yet' });
  };

  const createQuiz = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Create quiz not implemented yet' });
  };

  const updateQuiz = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Update quiz not implemented yet' });
  };

  const deleteQuiz = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Delete quiz not implemented yet' });
  };

  const getQuestionsByQuiz = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get questions by quiz not implemented yet' });
  };

  const getQuestionById = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get question by ID not implemented yet' });
  };

  const createQuestion = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Create question not implemented yet' });
  };

  const updateQuestion = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Update question not implemented yet' });
  };

  const deleteQuestion = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Delete question not implemented yet' });
  };

  const getOptionsByQuestion = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get options by question not implemented yet' });
  };

  const getOptionById = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get option by ID not implemented yet' });
  };

  const createOption = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Create option not implemented yet' });
  };

  const updateOption = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Update option not implemented yet' });
  };

  const deleteOption = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Delete option not implemented yet' });
  };

  const getAttemptsByQuiz = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get attempts by quiz not implemented yet' });
  };

  const getAttemptById = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Get attempt by ID not implemented yet' });
  };

  const createAttempt = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Create attempt not implemented yet' });
  };

  const updateAttempt = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Update attempt not implemented yet' });
  };

  const deleteAttempt = (_req: Request, _res: Response) => {
    _res.status(501).json({ message: 'Delete attempt not implemented yet' });
  };

  router.get('/sections/:sectionId/quizzes', getQuizzesBySection);
  router.get('/quizzes/:id', getQuizById);
  router.post('/sections/:sectionId/quizzes', createQuiz);
  router.put('/quizzes/:id', updateQuiz);
  router.delete('/quizzes/:id', deleteQuiz);

  router.get('/quizzes/:quizId/questions', getQuestionsByQuiz);
  router.get('/questions/:id', getQuestionById);
  router.post('/quizzes/:quizId/questions', createQuestion);
  router.put('/questions/:id', updateQuestion);
  router.delete('/questions/:id', deleteQuestion);

  router.get('/questions/:questionId/options', getOptionsByQuestion);
  router.get('/options/:id', getOptionById);
  router.post('/questions/:questionId/options', createOption);
  router.put('/options/:id', updateOption);
  router.delete('/options/:id', deleteOption);

  router.get('/quizzes/:quizId/attempts', getAttemptsByQuiz);
  router.get('/attempts/:id', getAttemptById);
  router.post('/quizzes/:quizId/attempts', createAttempt);
  router.put('/attempts/:id', updateAttempt);
  router.delete('/attempts/:id', deleteAttempt);

  return router;
};

export default createQuizzesRouter();
