import type { ResourceService, ResourcesInDTO } from '../app/index.js';
import type { ApiResponse, FiltersResource, SortingResources } from '../utils/index.js';

export class ResourcesController {
  private readonly resourceService: ResourceService;
  constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }
  getResources(
    filters: FiltersResource,
    sort: SortingResources,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.resourceService.getResources(filters, sort, lightDTO);
  }
  getResourceById(resourceId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.resourceService.getResourceById(resourceId, lightDTO);
  }
  postResources(dto: ResourcesInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.resourceService.postResources(dto, lightDTO);
  }
  putResources(
    resourceId: string,
    dto: Partial<ResourcesInDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.resourceService.putResources(resourceId, dto, lightDTO);
  }
  deleteResources(resourceId: string): Promise<ApiResponse<unknown>> {
    return this.resourceService.deleteResources(resourceId);
  }
}
