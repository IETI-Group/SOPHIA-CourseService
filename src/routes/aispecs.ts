import { type IRouter, type Request, type Response, Router } from 'express';
import type { AISpecsLessonInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { AISpecsController } from '../controllers/index.js';
import {
  aiSpecsLessonInDTOSchema,
  aiSpecsLessonUpdateDTOSchema,
  type FiltersAISpecsLesson,
  filtersAISpecsLessonSchema,
  idSchema,
  lightDTOSchema,
  type SortingAILessonSpecs,
  sortingAILessonSpecsSchema,
} from '../utils/index.js';

export const createAISpecsRouter = (controller?: AISpecsController): IRouter => {
  const router: IRouter = Router();

  const aiSpecsController = controller ?? container.resolve<AISpecsController>('aiSpecsController');

  const getAISpecsByLesson = async (req: Request, res: Response) => {
    const filters: FiltersAISpecsLesson = filtersAISpecsLessonSchema().parse(req.query);
    const sorting: SortingAILessonSpecs = sortingAILessonSpecsSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await aiSpecsController.getAISpecs(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getAISpecById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await aiSpecsController.getAISpecById(id, lightDTO);
    res.status(200).json(result);
  };

  const createAISpec = async (req: Request, res: Response) => {
    const dto: AISpecsLessonInDTO = aiSpecsLessonInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await aiSpecsController.postAISpec(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateAISpec = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<AISpecsLessonInDTO> = aiSpecsLessonUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await aiSpecsController.putAISpec(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteAISpec = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await aiSpecsController.deleteAISpec(id);
    res.status(200).json(result);
  };

  router.get('/lessons/:lessonId/ai-specs', getAISpecsByLesson);
  router.get('/ai-specs/:id', getAISpecById);
  router.post('/lessons/:lessonId/ai-specs', createAISpec);
  router.put('/ai-specs/:id', updateAISpec);
  router.delete('/ai-specs/:id', deleteAISpec);

  return router;
};

export default createAISpecsRouter();
