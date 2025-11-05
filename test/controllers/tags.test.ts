import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { TagCourseInDTO } from '../../src/app/models/index.js';
import type { TagService } from '../../src/app/services/interfaces/TagService.js';
import { TagsController } from '../../src/controllers/tags.js';
import type { FiltersTag, SORT_TAG } from '../../src/utils/index.js';

describe('TagsController', () => {
  const mockTagService = mockDeep<TagService>();
  let controller: TagsController;

  beforeEach(() => {
    controller = new TagsController(mockTagService);
  });

  afterEach(() => {
    mockReset(mockTagService);
  });

  it('should call tagService.getTags with filters and sort', async () => {
    const filters: FiltersTag = {
      courseId: null,
      name: null,
      categoryId: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_TAG[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await controller.getTags(filters, sort);

    expect(mockTagService.getTags).toHaveBeenCalledWith(filters, sort);
  });

  it('should call tagService.getTagById with tagId', async () => {
    const tagId: string = 'tag-123';

    await controller.getTagById(tagId);

    expect(mockTagService.getTagById).toHaveBeenCalledWith(tagId);
  });

  it('should call tagService.postTag with dto', async () => {
    const dto: TagCourseInDTO = {
      categoryId: 'category-123',
      courseId: 'course-123',
    };

    await controller.postTag(dto);

    expect(mockTagService.postTag).toHaveBeenCalledWith(dto);
  });

  it('should call tagService.putTag with tagId and dto', async () => {
    const tagId: string = 'tag-123';
    const dto: Partial<TagCourseInDTO> = {
      courseId: 'course-456',
    };

    await controller.putTag(tagId, dto);

    expect(mockTagService.putTag).toHaveBeenCalledWith(tagId, dto);
  });

  it('should call tagService.deleteTag with tagId', async () => {
    const tagId: string = 'tag-123';

    await controller.deleteTag(tagId);

    expect(mockTagService.deleteTag).toHaveBeenCalledWith(tagId);
  });
});
