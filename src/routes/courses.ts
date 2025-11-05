import { type IRouter, type Request, type Response, Router } from 'express';
import type { CourseInDTO, FavoriteCourseInDTO, InscriptionCourseInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { CoursesController } from '../controllers/index.js';
import {
  courseInDTOSchema,
  courseUpdateDTOSchema,
  type FiltersCourse,
  type FiltersFavoriteCourse,
  type FiltersInscription,
  favoriteCourseInDTOSchema,
  favoriteCourseUpdateDTOSchema,
  filtersCourseSchema,
  filtersFavoriteCourseSchema,
  filtersInscriptionSchema,
  idSchema,
  inscriptionCourseInDTOSchema,
  inscriptionCourseUpdateDTOSchema,
  lightDTOSchema,
  type SortingCourses,
  type SortingFavoriteCourses,
  type SortingInscriptions,
  sortingCoursesSchema,
  sortingFavoriteCoursesSchema,
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
    const filters: FiltersInscription = filtersInscriptionSchema().parse(req.query);
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
    const filters: FiltersFavoriteCourse = filtersFavoriteCourseSchema().parse(req.query);
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

  return router;
};

export default createCoursesRouter();
