import { type IRouter, type Request, type Response, Router } from 'express';
import type {
  AttemptQuizInDTO,
  OptionQuizInDTO,
  QuestionQuizInDTO,
  QuizSectionInDTO,
} from '../app/index.js';
import container from '../config/diContainer.js';
import type { QuizzesController } from '../controllers/index.js';
import {
  attemptQuizInDTOSchema,
  attemptQuizUpdateDTOSchema,
  type FiltersAttemptQuiz,
  type FiltersOptionQuiz,
  type FiltersQuestionQuiz,
  type FiltersQuizSection,
  filtersAttemptQuizSchema,
  filtersOptionQuizSchema,
  filtersQuestionQuizSchema,
  filtersQuizSectionSchema,
  idSchema,
  lightDTOSchema,
  optionQuizInDTOSchema,
  optionQuizUpdateDTOSchema,
  questionQuizInDTOSchema,
  questionQuizUpdateDTOSchema,
  quizSectionInDTOSchema,
  quizSectionUpdateDTOSchema,
  type SortingQuizAttempts,
  type SortingQuizOptions,
  type SortingQuizQuestions,
  type SortingSectionQuizzes,
  sortingQuizAttemptsSchema,
  sortingQuizOptionsSchema,
  sortingQuizQuestionsSchema,
  sortingSectionQuizzesSchema,
} from '../utils/index.js';

export const createQuizzesRouter = (controller?: QuizzesController): IRouter => {
  const router: IRouter = Router();

  const quizzesController = controller ?? container.resolve<QuizzesController>('quizzesController');

  const getQuizzesBySection = async (req: Request, res: Response) => {
    const sectionId = idSchema().parse(req.params.sectionId);
    const filters: FiltersQuizSection = filtersQuizSectionSchema().parse(req.query);
    filters.sectionId = sectionId;
    const sorting: SortingSectionQuizzes = sortingSectionQuizzesSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await quizzesController.getQuizzesSection(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getQuizById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await quizzesController.getQuizById(id, lightDTO);
    res.status(200).json(result);
  };

  const createQuiz = async (req: Request, res: Response) => {
    const dto: QuizSectionInDTO = quizSectionInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await quizzesController.postQuizSection(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateQuiz = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<QuizSectionInDTO> = quizSectionUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await quizzesController.putQuiz(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteQuiz = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.deleteQuiz(id);
    res.status(200).json(result);
  };

  const getQuestionsByQuiz = async (req: Request, res: Response) => {
    const quizId = idSchema().parse(req.params.quizId);
    const filters: FiltersQuestionQuiz = filtersQuestionQuizSchema().parse(req.query);
    filters.quizId = quizId;
    const sorting: SortingQuizQuestions = sortingQuizQuestionsSchema().parse(req.query);
    const result = await quizzesController.getQuestionsQuiz(filters, sorting);
    res.status(200).json(result);
  };

  const getQuestionById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.getQuestionById(id);
    res.status(200).json(result);
  };

  const createQuestion = async (req: Request, res: Response) => {
    const dto: QuestionQuizInDTO = questionQuizInDTOSchema().parse(req.body);
    const result = await quizzesController.postQuestionQuiz(dto);
    res.status(201).json(result);
  };

  const updateQuestion = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<QuestionQuizInDTO> = questionQuizUpdateDTOSchema().parse(req.body);
    const result = await quizzesController.putQuestion(id, dto);
    res.status(200).json(result);
  };

  const deleteQuestion = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.deleteQuestion(id);
    res.status(200).json(result);
  };

  const getOptionsByQuestion = async (req: Request, res: Response) => {
    const questionId = idSchema().parse(req.params.questionId);
    const filters: FiltersOptionQuiz = filtersOptionQuizSchema().parse(req.query);
    filters.quizQuestionId = questionId;
    const sorting: SortingQuizOptions = sortingQuizOptionsSchema().parse(req.query);
    const result = await quizzesController.getOptionsQuiz(filters, sorting);
    res.status(200).json(result);
  };

  const getOptionById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.getOption(id);
    res.status(200).json(result);
  };

  const createOption = async (req: Request, res: Response) => {
    const dto: OptionQuizInDTO = optionQuizInDTOSchema().parse(req.body);
    const result = await quizzesController.postOptionQuiz(dto);
    res.status(201).json(result);
  };

  const updateOption = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<OptionQuizInDTO> = optionQuizUpdateDTOSchema().parse(req.body);
    const result = await quizzesController.putOption(id, dto);
    res.status(200).json(result);
  };

  const deleteOption = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.deleteOption(id);
    res.status(200).json(result);
  };

  const getAttemptsByQuiz = async (req: Request, res: Response) => {
    const quizId = idSchema().parse(req.params.quizId);
    const filters: FiltersAttemptQuiz = filtersAttemptQuizSchema().parse(req.query);
    filters.quizId = quizId;
    const sorting: SortingQuizAttempts = sortingQuizAttemptsSchema().parse(req.query);
    const result = await quizzesController.getAttemptsQuiz(filters, sorting);
    res.status(200).json(result);
  };

  const getAttemptById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.getAttempt(id);
    res.status(200).json(result);
  };

  const createAttempt = async (req: Request, res: Response) => {
    const dto: AttemptQuizInDTO = attemptQuizInDTOSchema().parse(req.body);
    const result = await quizzesController.postAttemptQuiz(dto);
    res.status(201).json(result);
  };

  const updateAttempt = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<AttemptQuizInDTO> = attemptQuizUpdateDTOSchema().parse(req.body);
    const result = await quizzesController.putAttempt(id, dto);
    res.status(200).json(result);
  };

  const deleteAttempt = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await quizzesController.deleteAttempt(id);
    res.status(200).json(result);
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
