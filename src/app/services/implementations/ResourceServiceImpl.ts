import {
  type ApiResponse,
  type FiltersResource,
  parseApiResponse,
  type SortingResources,
} from '../../../utils/index.js';
import type { ResourcesInDTO } from '../../models/index.js';
import type { ResourcesRepository } from '../../repositories/index.js';
import type { ResourceService } from '../index.js';

export class ResourceServiceImpl implements ResourceService {
  private readonly resourcesRepository: ResourcesRepository;
  constructor(resourcesRepository: ResourcesRepository) {
    this.resourcesRepository = resourcesRepository;
  }
  getResources(
    filters: FiltersResource,
    sort: SortingResources,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.resourcesRepository.getResources(filters, sort, lightDTO);
  }
  async getResourceById(resourceId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.resourcesRepository.getResourceById(resourceId, lightDTO);
    return parseApiResponse(result, 'Resource retrieved successfully');
  }
  async postResources(dto: ResourcesInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.resourcesRepository.createResource(dto, lightDTO);
    return parseApiResponse(result, 'Resource created successfully');
  }
  async putResources(
    resourceId: string,
    dto: Partial<ResourcesInDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.resourcesRepository.updateResource(resourceId, dto, lightDTO);
    return parseApiResponse(result, 'Resource updated successfully');
  }
  async deleteResources(resourceId: string): Promise<ApiResponse<unknown>> {
    await this.resourcesRepository.deleteResourceById(resourceId);
    return parseApiResponse(null, 'Resource deleted successfully');
  }
}
