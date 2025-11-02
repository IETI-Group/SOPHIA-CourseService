import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersResource,
  PaginatedResources,
  SortingResources,
} from '../../../utils/index.js';
import type { ResourcesInDTO, ResourcesOutLightDTO } from '../../models/index.js';
import type { ResourcesRepository } from '../index.js';

export class ResourcesRepositoryPostgreSQL implements ResourcesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getResources(
    _filters: FiltersResource,
    _sort: SortingResources,
    _lightDTO: boolean
  ): Promise<PaginatedResources> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getResourceById(_resourceId: string, _lightDTO: boolean): Promise<ResourcesOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  createResource(_dto: ResourcesInDTO, _lightDTO: boolean): Promise<ResourcesOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateResource(
    _resourceId: string,
    _dto: ResourcesInDTO,
    _lightDTO: boolean
  ): Promise<ResourcesOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteResourceById(_resourceId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
