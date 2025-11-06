import { type IRouter, type Request, type Response, Router } from 'express';
import type { SectionCourseInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { SectionsController } from '../controllers/index.js';
import {
  type FiltersSection,
  filtersSectionSchema,
  idSchema,
  lightDTOSchema,
  type SortingSections,
  sectionCourseInDTOSchema,
  sectionCourseUpdateDTOSchema,
  sortingSectionsSchema,
} from '../utils/index.js';

export const createSectionsRouter = (controller?: SectionsController): IRouter => {
  const router: IRouter = Router();

  const sectionsController =
    controller ?? container.resolve<SectionsController>('sectionsController');

  const getSectionsByCourse = async (req: Request, res: Response) => {
    const filters: FiltersSection = filtersSectionSchema().parse(req.query);
    const sorting: SortingSections = sortingSectionsSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await sectionsController.getCourseSections(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getSectionById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await sectionsController.getSectionById(id, lightDTO);
    res.status(200).json(result);
  };

  const createSection = async (req: Request, res: Response) => {
    const dto: SectionCourseInDTO = sectionCourseInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await sectionsController.postCourseSection(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateSection = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<SectionCourseInDTO> = sectionCourseUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await sectionsController.putSection(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteSection = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await sectionsController.deleteSection(id);
    res.status(200).json(result);
  };

  router.get('/courses/:courseId/sections', getSectionsByCourse);
  router.get('/sections/:id', getSectionById);
  router.post('/courses/:courseId/sections', createSection);
  router.put('/sections/:id', updateSection);
  router.delete('/sections/:id', deleteSection);

  return router;
};

export default createSectionsRouter();
