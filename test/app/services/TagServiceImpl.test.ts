import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { TagCourseInDTO } from '../../../src/app/models/index.js';
import type { TagsCourseRepository } from '../../../src/app/repositories/index.js';
import { TagServiceImpl } from '../../../src/app/services/implementations/TagServiceImpl.js';
import type { FiltersTag, SortingTags } from '../../../src/utils/index.js';

describe('TagServiceImpl', () => {
  const mockTagsCourseRepository = mockDeep<TagsCourseRepository>();
  let service: TagServiceImpl;

  beforeEach(() => {
    service = new TagServiceImpl(mockTagsCourseRepository);
  });

  afterEach(() => {
    mockReset(mockTagsCourseRepository);
  });

  it('should call tagsCourseRepository.getTags with filters and sort', async () => {
    const filters: FiltersTag = {
      courseId: 'course-123',
      name: null,
      categoryId: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingTags = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getTags(filters, sort);

    expect(mockTagsCourseRepository.getTags).toHaveBeenCalledWith(filters, sort);
  });

  it('should call tagsCourseRepository.getTagById with tagId', async () => {
    const tagId: string = 'tag-123';

    await service.getTagById(tagId);

    expect(mockTagsCourseRepository.getTagById).toHaveBeenCalledWith(tagId);
  });

  it('should call tagsCourseRepository.createTag with dto', async () => {
    const dto: TagCourseInDTO = {
      categoryId: 'category-123',
      courseId: 'course-123',
    };

    await service.postTag(dto);

    expect(mockTagsCourseRepository.createTag).toHaveBeenCalledWith(dto);
  });

  it('should call tagsCourseRepository.updateTag with tagId and dto', async () => {
    const tagId: string = 'tag-123';
    const dto: Partial<TagCourseInDTO> = {
      categoryId: 'category-456',
    };

    await service.putTag(tagId, dto);

    expect(mockTagsCourseRepository.updateTag).toHaveBeenCalledWith(tagId, dto);
  });

  it('should call tagsCourseRepository.deleteTagById with tagId', async () => {
    const tagId: string = 'tag-123';

    await service.deleteTag(tagId);

    expect(mockTagsCourseRepository.deleteTagById).toHaveBeenCalledWith(tagId);
  });
});
