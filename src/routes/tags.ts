import { type IRouter, type Request, type Response, Router } from 'express';
import type { TagCourseInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { TagsController } from '../controllers/index.js';
import {
  type FiltersTag,
  filtersTagSchema,
  idSchema,
  type SortingTags,
  sortingTagsSchema,
  tagCourseInDTOSchema,
  tagCourseUpdateDTOSchema,
} from '../utils/index.js';

export const createTagsRouter = (controller?: TagsController): IRouter => {
  const router: IRouter = Router();

  const tagsController = controller ?? container.resolve<TagsController>('tagsController');

  const getTags = async (req: Request, res: Response) => {
    const filters: FiltersTag = filtersTagSchema().parse(req.query);
    const sorting: SortingTags = sortingTagsSchema().parse(req.query);
    const result = await tagsController.getTags(filters, sorting);
    res.status(200).json(result);
  };

  const getTagById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await tagsController.getTagById(id);
    res.status(200).json(result);
  };

  const createTag = async (req: Request, res: Response) => {
    const dto: TagCourseInDTO = tagCourseInDTOSchema().parse(req.body);
    const result = await tagsController.postTag(dto);
    res.status(201).json(result);
  };

  const updateTag = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<TagCourseInDTO> = tagCourseUpdateDTOSchema().parse(req.body);
    const result = await tagsController.putTag(id, dto);
    res.status(200).json(result);
  };

  const deleteTag = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await tagsController.deleteTag(id);
    res.status(200).json(result);
  };

  router.get('/tags', getTags);
  router.get('/tags/:id', getTagById);
  router.post('/tags', createTag);
  router.put('/tags/:id', updateTag);
  router.delete('/tags/:id', deleteTag);

  return router;
};

export default createTagsRouter();
