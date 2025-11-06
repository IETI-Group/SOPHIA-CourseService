import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ResourcesInDTO } from '../../src/app/models/index.js';
import type { ResourceService } from '../../src/app/services/interfaces/ResourceService.js';
import { ResourcesController } from '../../src/controllers/resources.js';
import type {
  DISCRIMINANT_RESOURCE,
  FiltersResource,
  RESOURCE_TYPE,
  SORT_RESOURCE,
} from '../../src/utils/index.js';

describe('ResourcesController', () => {
  const mockResourceService = mockDeep<ResourceService>();
  let controller: ResourcesController;

  beforeEach(() => {
    controller = new ResourcesController(mockResourceService);
  });

  afterEach(() => {
    mockReset(mockResourceService);
  });

  it('should call resourceService.getResources with filters, sort and lightDTO', async () => {
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
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_RESOURCE[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getResources(filters, sort, lightDTO);

    expect(mockResourceService.getResources).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call resourceService.getResourceById with resourceId and lightDTO', async () => {
    const resourceId: string = 'resource-123';
    const lightDTO: boolean = false;

    await controller.getResourceById(resourceId, lightDTO);

    expect(mockResourceService.getResourceById).toHaveBeenCalledWith(resourceId, lightDTO);
  });

  it('should call resourceService.postResources with dto and lightDTO', async () => {
    const dto: ResourcesInDTO = {
      entityReference: 'entity-123',
      discriminant: 'LESSON' as DISCRIMINANT_RESOURCE,
      name: 'Test Resource',
      type: 'VIDEO' as RESOURCE_TYPE,
      url: 'https://example.com/resource',
      content: null,
      order: 1,
      durationSeconds: 300,
      fileSizeMb: 50,
      mimeType: 'video/mp4',
      thumnailUrl: null,
      metadata: {},
    };
    const lightDTO: boolean = true;

    await controller.postResources(dto, lightDTO);

    expect(mockResourceService.postResources).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call resourceService.putResources with resourceId, dto and lightDTO', async () => {
    const resourceId: string = 'resource-123';
    const dto: Partial<ResourcesInDTO> = {
      name: 'Updated Resource',
      order: 2,
    };
    const lightDTO: boolean = false;

    await controller.putResources(resourceId, dto, lightDTO);

    expect(mockResourceService.putResources).toHaveBeenCalledWith(resourceId, dto, lightDTO);
  });

  it('should call resourceService.deleteResources with resourceId', async () => {
    const resourceId: string = 'resource-123';

    await controller.deleteResources(resourceId);

    expect(mockResourceService.deleteResources).toHaveBeenCalledWith(resourceId);
  });
});
