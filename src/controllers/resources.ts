import type { ResourceService, ResourcesInDTO } from '../app/index.js';
import type { ApiResponse, FiltersResource, SortingResources } from '../utils/index.js';

export class ResourcesController {
  private readonly resourceService: ResourceService;
  constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }
  getResources(
    _filters: FiltersResource,
    _sort: SortingResources,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.resourceService;
    throw new Error('Method not implemented');
  }
  getResourceById(_resourceId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postResources(_dto: ResourcesInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putResources(
    _resourceId: string,
    _dto: Partial<ResourcesInDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteResources(_resourceId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
