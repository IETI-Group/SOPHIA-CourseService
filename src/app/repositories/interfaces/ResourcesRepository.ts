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
  ): PaginatedResources;
  getResourceById(resourceId: string, lightDTO: boolean): ResourcesOutLightDTO;
  createResource(dto: ResourcesInDTO, lightDTO: boolean): ResourcesOutLightDTO;
  updateResource(resourceId: string, dto: ResourcesInDTO, lightDTO: boolean): ResourcesOutLightDTO;
  deleteResourceById(resourceId: string): void;
}
