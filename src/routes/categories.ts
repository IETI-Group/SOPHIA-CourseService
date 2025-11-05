import { type IRouter, type Request, type Response, Router } from 'express';
import type { CategoryCourseInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { CategoriesController } from '../controllers/index.js';
import {
  categoryCourseInDTOSchema,
  categoryCourseUpdateDTOSchema,
  type FiltersCategory,
  filtersCategorySchema,
  idSchema,
  type SortingCategories,
  sortingCategoriesSchema,
} from '../utils/index.js';

export const createCategoriesRouter = (controller?: CategoriesController): IRouter => {
  const router: IRouter = Router();

  const categoriesController =
    controller ?? container.resolve<CategoriesController>('categoriesController');

  const getCategories = async (req: Request, res: Response) => {
    const filters: FiltersCategory = filtersCategorySchema().parse(req.query);
    const sorting: SortingCategories = sortingCategoriesSchema().parse(req.query);
    const result = await categoriesController.getCategories(filters, sorting);
    res.status(200).json(result);
  };

  const getCategoryById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await categoriesController.getCategoryById(id);
    res.status(200).json(result);
  };

  const createCategory = async (req: Request, res: Response) => {
    const dto: CategoryCourseInDTO = categoryCourseInDTOSchema().parse(req.body);
    const result = await categoriesController.postCategory(dto);
    res.status(201).json(result);
  };

  const updateCategory = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<CategoryCourseInDTO> = categoryCourseUpdateDTOSchema().parse(req.body);
    const result = await categoriesController.putCategory(id, dto);
    res.status(200).json(result);
  };

  const deleteCategory = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await categoriesController.deleteCategory(id);
    res.status(200).json(result);
  };

  router.get('/categories', getCategories);
  router.get('/categories/:id', getCategoryById);
  router.post('/categories', createCategory);
  router.put('/categories/:id', updateCategory);
  router.delete('/categories/:id', deleteCategory);

  return router;
};

export default createCategoriesRouter();
