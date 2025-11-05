import type { ApiResponse, FiltersResource, SortingResources } from '../../../utils/index.js';
import type { ResourcesInDTO } from '../../models/index.js';
import type { ResourceService } from '../index.js';

export class ResourceServiceImpl implements ResourceService {
  getResources(
    _filters: FiltersResource,
    _sort: SortingResources,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getResourceById(_resourceId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postResources(_dto: ResourcesInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putResources(
    _resourceId: string,
    _dto: Partial<ResourcesInDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteResources(_resourceId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
