import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ResourcesInDTO } from '../../../src/app/models/index.js';
import type { ResourcesRepository } from '../../../src/app/repositories/index.js';
import { ResourceServiceImpl } from '../../../src/app/services/implementations/ResourceServiceImpl.js';
import type { FiltersResource, SortingResources } from '../../../src/utils/index.js';

describe('ResourceServiceImpl', () => {
  const mockResourcesRepository = mockDeep<ResourcesRepository>();
  let service: ResourceServiceImpl;

  beforeEach(() => {
    service = new ResourceServiceImpl(mockResourcesRepository);
  });

  afterEach(() => {
    mockReset(mockResourcesRepository);
  });

  it('should call resourcesRepository.getResources with filters, sort and lightDTO', async () => {
    const filters: FiltersResource = {
      entityReference: 'entity-123',
      name: null,
      discriminant: null,
      type: null,
      orderMin: null,
      orderMax: null,
      durationSecondsMin: null,
      durationSecondsMax: null,
      fileSizeMbMin: null,
      fileSizeMbMax: null,
    };
    const sort: SortingResources = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getResources(filters, sort, lightDTO);

    expect(mockResourcesRepository.getResources).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call resourcesRepository.getResourceById with resourceId and lightDTO', async () => {
    const resourceId: string = 'resource-123';
    const lightDTO: boolean = false;

    await service.getResourceById(resourceId, lightDTO);

    expect(mockResourcesRepository.getResourceById).toHaveBeenCalledWith(resourceId, lightDTO);
  });

  it('should call resourcesRepository.createResource with dto and lightDTO', async () => {
    const dto: ResourcesInDTO = {
      entityReference: 'entity-123',
      discriminant: 'LESSON',
      name: 'Resource Name',
      type: 'VIDEO',
      url: 'https://example.com',
      content: null,
      order: 1,
      durationSeconds: 120,
      fileSizeMb: 5,
      mimeType: 'video/mp4',
      thumnailUrl: null,
      metadata: {},
    };
    const lightDTO: boolean = true;

    await service.postResources(dto, lightDTO);

    expect(mockResourcesRepository.createResource).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call resourcesRepository.updateResource with resourceId, dto and lightDTO', async () => {
    const resourceId: string = 'resource-123';
    const dto: Partial<ResourcesInDTO> = {
      name: 'Updated Resource',
    };
    const lightDTO: boolean = false;

    await service.putResources(resourceId, dto, lightDTO);

    expect(mockResourcesRepository.updateResource).toHaveBeenCalledWith(resourceId, dto, lightDTO);
  });

  it('should call resourcesRepository.deleteResourceById with resourceId', async () => {
    const resourceId: string = 'resource-123';

    await service.deleteResources(resourceId);

    expect(mockResourcesRepository.deleteResourceById).toHaveBeenCalledWith(resourceId);
  });
});
