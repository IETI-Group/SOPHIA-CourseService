import { type IRouter, type Request, type Response, Router } from 'express';
import type {
  CourseInDTO,
  FavoriteCourseInDTO,
  ForumInDTO,
  ForumMessageInDTO,
  InscriptionCourseInDTO,
} from '../app/index.js';
import container from '../config/diContainer.js';
import type { CoursesController } from '../controllers/index.js';
import {
  courseInDTOSchema,
  courseUpdateDTOSchema,
  type FiltersCourse,
  type FiltersFavoriteCourse,
  type FiltersForum,
  type FiltersForumMessage,
  type FiltersInscription,
  favoriteCourseInDTOSchema,
  favoriteCourseUpdateDTOSchema,
  filtersCourseSchema,
  filtersFavoriteCourseSchema,
  filtersForumMessageSchema,
  filtersForumSchema,
  filtersInscriptionSchema,
  forumInDTOSchema,
  forumMessageInDTOSchema,
  forumMessageUpdateDTOSchema,
  forumUpdateDTOSchema,
  idSchema,
  inscriptionCourseInDTOSchema,
  inscriptionCourseUpdateDTOSchema,
  lightDTOSchema,
  type SortingCourses,
  type SortingFavoriteCourses,
  type SortingForumMessages,
  type SortingForums,
  type SortingInscriptions,
  sortingCoursesSchema,
  sortingFavoriteCoursesSchema,
  sortingForumMessagesSchema,
  sortingForumsSchema,
  sortingInscriptionsSchema,
} from '../utils/index.js';

export const createCoursesRouter = (controller?: CoursesController): IRouter => {
  const router: IRouter = Router();

  const coursesController = controller ?? container.resolve<CoursesController>('coursesController');

  const getCourses = async (req: Request, res: Response) => {
    const filters: FiltersCourse = filtersCourseSchema().parse(req.query);
    const sorting: SortingCourses = sortingCoursesSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getCourses(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getCourseById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getCourseById(id, lightDTO);
    res.status(200).json(result);
  };

  const createCourse = async (req: Request, res: Response) => {
    const dto: CourseInDTO = courseInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.postCourse(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateCourse = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<CourseInDTO> = courseUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.putCourse(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteCourse = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.deleteCourse(id);
    res.status(200).json(result);
  };

  const getInscriptionsByCourse = async (req: Request, res: Response) => {
    const courseId = idSchema().parse(req.params.courseId);
    const filters: FiltersInscription = filtersInscriptionSchema().parse(req.query);
    filters.courseId = courseId;
    const sorting: SortingInscriptions = sortingInscriptionsSchema().parse(req.query);
    const result = await coursesController.getInscriptionsCourse(filters, sorting);
    res.status(200).json(result);
  };

  const getInscriptionById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.getInscriptionById(id);
    res.status(200).json(result);
  };

  const createInscription = async (req: Request, res: Response) => {
    const dto: InscriptionCourseInDTO = inscriptionCourseInDTOSchema().parse(req.body);
    const result = await coursesController.postInscriptionCourse(dto);
    res.status(201).json(result);
  };

  const updateInscription = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<InscriptionCourseInDTO> = inscriptionCourseUpdateDTOSchema().parse(req.body);
    const result = await coursesController.putInscription(id, dto);
    res.status(200).json(result);
  };

  const deleteInscription = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.deleteInscription(id);
    res.status(200).json(result);
  };

  const getFavoritesByCourse = async (req: Request, res: Response) => {
    const courseId = idSchema().parse(req.params.courseId);
    const filters: FiltersFavoriteCourse = filtersFavoriteCourseSchema().parse(req.query);
    filters.courseId = courseId;
    const sorting: SortingFavoriteCourses = sortingFavoriteCoursesSchema().parse(req.query);
    const result = await coursesController.getFavoriteCourses(filters, sorting);
    res.status(200).json(result);
  };

  const getFavoriteById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.getFavorite(id);
    res.status(200).json(result);
  };

  const createFavorite = async (req: Request, res: Response) => {
    const dto: FavoriteCourseInDTO = favoriteCourseInDTOSchema().parse(req.body);
    const result = await coursesController.postFavoriteCourse(dto);
    res.status(201).json(result);
  };

  const updateFavorite = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<FavoriteCourseInDTO> = favoriteCourseUpdateDTOSchema().parse(req.body);
    const result = await coursesController.putFavorite(id, dto);
    res.status(200).json(result);
  };

  const deleteFavorite = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.deleteFavorite(id);
    res.status(200).json(result);
  };

  // Forum handlers
  const getForums = async (req: Request, res: Response) => {
    const filters: FiltersForum = filtersForumSchema().parse(req.query);
    const sorting: SortingForums = sortingForumsSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getForums(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getForumById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getForumById(id, lightDTO);
    res.status(200).json(result);
  };

  const getForumByCourseId = async (req: Request, res: Response) => {
    const courseId: string = idSchema().parse(req.params.courseId);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getForumByCourseId(courseId, lightDTO);
    res.status(200).json(result);
  };

  const createForum = async (req: Request, res: Response) => {
    const dto: ForumInDTO = forumInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.postForum(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateForum = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<ForumInDTO> = forumUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.putForum(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteForum = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.deleteForum(id);
    res.status(200).json(result);
  };

  // ForumMessage handlers
  const getForumMessages = async (req: Request, res: Response) => {
    const filters: FiltersForumMessage = filtersForumMessageSchema().parse(req.query);
    const sorting: SortingForumMessages = sortingForumMessagesSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getForumMessages(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getForumMessageById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getForumMessageById(id, lightDTO);
    res.status(200).json(result);
  };

  const getMessagesByForumId = async (req: Request, res: Response) => {
    const forumId: string = idSchema().parse(req.params.forumId);
    const sorting: SortingForumMessages = sortingForumMessagesSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getMessagesByForumId(forumId, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getRepliesByParentId = async (req: Request, res: Response) => {
    const parentMessageId: string = idSchema().parse(req.params.parentMessageId);
    const sorting: SortingForumMessages = sortingForumMessagesSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.getRepliesByParentId(parentMessageId, sorting, lightDTO);
    res.status(200).json(result);
  };

  const createForumMessage = async (req: Request, res: Response) => {
    const dto: ForumMessageInDTO = forumMessageInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.postForumMessage(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateForumMessage = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<ForumMessageInDTO> = forumMessageUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await coursesController.putForumMessage(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteForumMessage = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await coursesController.deleteForumMessage(id);
    res.status(200).json(result);
  };

  router.get('/courses', getCourses);
  router.get('/courses/:id', getCourseById);
  router.post('/courses', createCourse);
  router.put('/courses/:id', updateCourse);
  router.delete('/courses/:id', deleteCourse);

  router.get('/courses/:courseId/inscriptions', getInscriptionsByCourse);
  router.get('/inscriptions/:id', getInscriptionById);
  router.post('/courses/:courseId/inscriptions', createInscription);
  router.put('/inscriptions/:id', updateInscription);
  router.delete('/inscriptions/:id', deleteInscription);

  router.get('/courses/:courseId/favorites', getFavoritesByCourse);
  router.get('/favorites/:id', getFavoriteById);
  router.post('/courses/:courseId/favorites', createFavorite);
  router.put('/favorites/:id', updateFavorite);
  router.delete('/favorites/:id', deleteFavorite);

  // Forum routes
  router.get('/forums', getForums);
  router.get('/forums/:id', getForumById);
  router.get('/courses/:courseId/forum', getForumByCourseId);
  router.post('/forums', createForum);
  router.put('/forums/:id', updateForum);
  router.delete('/forums/:id', deleteForum);

  // ForumMessage routes
  router.get('/forum-messages', getForumMessages);
  router.get('/forum-messages/:id', getForumMessageById);
  router.get('/forums/:forumId/messages', getMessagesByForumId);
  router.get('/forum-messages/:parentMessageId/replies', getRepliesByParentId);
  router.post('/forum-messages', createForumMessage);
  router.put('/forum-messages/:id', updateForumMessage);
  router.delete('/forum-messages/:id', deleteForumMessage);

  return router;
};

export default createCoursesRouter();
