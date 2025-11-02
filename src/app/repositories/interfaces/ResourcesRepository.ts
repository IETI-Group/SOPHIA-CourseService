import type {
  FiltersResource,
  PaginatedResources,
  SortingResources,
} from '../../../utils/index.js';
import type { ResourcesInDTO, ResourcesOutLightDTO } from '../../models/index.js';

export interface ResourcesRepository {
  getResources(
    filters: FiltersResource,
    sort: SortingResources,
    lightDTO: boolean
  ): Promise<PaginatedResources>;
  getResourceById(resourceId: string, lightDTO: boolean): Promise<ResourcesOutLightDTO>;
  createResource(dto: ResourcesInDTO, lightDTO: boolean): Promise<ResourcesOutLightDTO>;
  updateResource(
    resourceId: string,
    dto: ResourcesInDTO,
    lightDTO: boolean
  ): Promise<ResourcesOutLightDTO>;
  deleteResourceById(resourceId: string): Promise<void>;
}
