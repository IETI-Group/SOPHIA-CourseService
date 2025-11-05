import { type IRouter, type Request, type Response, Router } from 'express';
import type {
  ContentLessonInDTO,
  ContentLessonUpdateDTO,
  LessonSectionInDTO,
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
} from '../app/index.js';
import container from '../config/diContainer.js';
import type { LessonsController } from '../controllers/index.js';
import {
  contentLessonInDTOSchema,
  contentLessonUpdateDTOSchema,
  type FiltersLesson,
  type FiltersLessonContent,
  type FiltersProgressContent,
  filtersLessonContentSchema,
  filtersLessonSchema,
  filtersProgressContentSchema,
  idSchema,
  lessonSectionInDTOSchema,
  lessonSectionUpdateDTOSchema,
  lightDTOSchema,
  progressContentInDTOSchema,
  progressContentUpdateDTOSchema,
  type SortingContentProgress,
  type SortingLessonContent,
  type SortingLessons,
  sortingContentProgressSchema,
  sortingLessonContentSchema,
  sortingLessonsSchema,
} from '../utils/index.js';

export const createLessonsRouter = (controller?: LessonsController): IRouter => {
  const router: IRouter = Router();

  const lessonsController = controller ?? container.resolve<LessonsController>('lessonsController');

  const getLessonsBySection = async (req: Request, res: Response) => {
    const filters: FiltersLesson = filtersLessonSchema().parse(req.query);
    const sorting: SortingLessons = sortingLessonsSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.getSectionLessons(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getLessonById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.getLessonById(id, lightDTO);
    res.status(200).json(result);
  };

  const createLesson = async (req: Request, res: Response) => {
    const dto: LessonSectionInDTO = lessonSectionInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.postSectionLesson(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateLesson = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<LessonSectionInDTO> = lessonSectionUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.putLesson(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteLesson = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await lessonsController.deleteLesson(id);
    res.status(200).json(result);
  };

  const getContentsByLesson = async (req: Request, res: Response) => {
    const filters: FiltersLessonContent = filtersLessonContentSchema().parse(req.query);
    const sorting: SortingLessonContent = sortingLessonContentSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.getLessonContents(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getContentById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.getLessonContentsById(id, lightDTO);
    res.status(200).json(result);
  };

  const createContent = async (req: Request, res: Response) => {
    const dto: ContentLessonInDTO = contentLessonInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.postLessonContents(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateContent = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<ContentLessonUpdateDTO> = contentLessonUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await lessonsController.putLessonContents(
      id,
      dto as ContentLessonUpdateDTO,
      lightDTO
    );
    res.status(200).json(result);
  };

  const deleteContent = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await lessonsController.deleteLessonContents(id);
    res.status(200).json(result);
  };

  const getProgressByContent = async (req: Request, res: Response) => {
    const filters: FiltersProgressContent = filtersProgressContentSchema().parse(req.query);
    const sorting: SortingContentProgress = sortingContentProgressSchema().parse(req.query);
    const result = await lessonsController.getProgressContent(filters, sorting);
    res.status(200).json(result);
  };

  const getProgressById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await lessonsController.getProgressById(id);
    res.status(200).json(result);
  };

  const createProgress = async (req: Request, res: Response) => {
    const dto: ProgressContentInDTO = progressContentInDTOSchema().parse(req.body);
    const result = await lessonsController.postProgressContent(dto);
    res.status(201).json(result);
  };

  const updateProgress = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<ProgressContentUpdateDTO> = progressContentUpdateDTOSchema().parse(req.body);
    const result = await lessonsController.putProgress(id, dto as ProgressContentUpdateDTO);
    res.status(200).json(result);
  };

  const deleteProgress = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await lessonsController.deleteProgress(id);
    res.status(200).json(result);
  };

  router.get('/sections/:sectionId/lessons', getLessonsBySection);
  router.get('/lessons/:id', getLessonById);
  router.post('/sections/:sectionId/lessons', createLesson);
  router.put('/lessons/:id', updateLesson);
  router.delete('/lessons/:id', deleteLesson);

  router.get('/lessons/:lessonId/contents', getContentsByLesson);
  router.get('/contents/:id', getContentById);
  router.post('/lessons/:lessonId/contents', createContent);
  router.put('/contents/:id', updateContent);
  router.delete('/contents/:id', deleteContent);

  router.get('/contents/:contentId/progress', getProgressByContent);
  router.get('/progress/:id', getProgressById);
  router.post('/contents/:contentId/progress', createProgress);
  router.put('/progress/:id', updateProgress);
  router.delete('/progress/:id', deleteProgress);

  return router;
};

export default createLessonsRouter();
