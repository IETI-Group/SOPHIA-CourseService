import { type IRouter, type Request, type Response, Router } from 'express';
import type { ResourcesInDTO } from '../app/index.js';
import container from '../config/diContainer.js';
import type { ResourcesController } from '../controllers/index.js';
import {
  type FiltersResource,
  filtersResourceSchema,
  idSchema,
  lightDTOSchema,
  resourcesInDTOSchema,
  resourcesUpdateDTOSchema,
  type SortingResources,
  sortingResourcesSchema,
} from '../utils/index.js';

export const createResourcesRouter = (controller?: ResourcesController): IRouter => {
  const router: IRouter = Router();

  const resourcesController =
    controller ?? container.resolve<ResourcesController>('resourcesController');

  const getResources = async (req: Request, res: Response) => {
    const filters: FiltersResource = filtersResourceSchema().parse(req.query);
    const sorting: SortingResources = sortingResourcesSchema().parse(req.query);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await resourcesController.getResources(filters, sorting, lightDTO);
    res.status(200).json(result);
  };

  const getResourceById = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await resourcesController.getResourceById(id, lightDTO);
    res.status(200).json(result);
  };

  const createResource = async (req: Request, res: Response) => {
    const dto: ResourcesInDTO = resourcesInDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await resourcesController.postResources(dto, lightDTO);
    res.status(201).json(result);
  };

  const updateResource = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const dto: Partial<ResourcesInDTO> = resourcesUpdateDTOSchema().parse(req.body);
    const { lightDTO } = lightDTOSchema().parse(req.query);
    const result = await resourcesController.putResources(id, dto, lightDTO);
    res.status(200).json(result);
  };

  const deleteResource = async (req: Request, res: Response) => {
    const id: string = idSchema().parse(req.params.id);
    const result = await resourcesController.deleteResources(id);
    res.status(200).json(result);
  };

  router.get('/resources', getResources);
  router.get('/resources/:id', getResourceById);
  router.post('/resources', createResource);
  router.put('/resources/:id', updateResource);
  router.delete('/resources/:id', deleteResource);

  return router;
};

export default createResourcesRouter();
