import type { ApiResponse, FiltersResource, SortingResources } from '../../../utils/index.js';
import type { ResourcesInDTO } from '../../models/index.js';

export interface ResourceService {
  getResources(
    filters: FiltersResource,
    sort: SortingResources,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  getResourceById(resourceId: string, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  postResources(dto: ResourcesInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  putResources(
    resourceId: string,
    dto: Partial<ResourcesInDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteResources(resourceId: string): Promise<ApiResponse<unknown>>;
}
