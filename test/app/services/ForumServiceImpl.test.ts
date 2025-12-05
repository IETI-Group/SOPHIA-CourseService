import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ForumInDTO, ForumUpdateDTO } from '../../../src/app/models/index.js';
import type { ForumsRepository } from '../../../src/app/repositories/index.js';
import { ForumServiceImpl } from '../../../src/app/services/implementations/ForumServiceImpl.js';
import type { FiltersForum, SortingForums } from '../../../src/utils/index.js';

describe('ForumServiceImpl', () => {
  const mockForumsRepository = mockDeep<ForumsRepository>();
  let service: ForumServiceImpl;

  beforeEach(() => {
    service = new ForumServiceImpl(mockForumsRepository);
  });

  afterEach(() => {
    mockReset(mockForumsRepository);
  });

  it('should call forumsRepository.getForums with filters, sort and lightDTO', async () => {
    const filters: FiltersForum = {
      courseId: 'course-123',
      active: true,
      commentsCountMin: null,
      commentsCountMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingForums = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO = true;

    await service.getForums(filters, sort, lightDTO);

    expect(mockForumsRepository.getForums).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call forumsRepository.getForumById with forumId and lightDTO', async () => {
    const forumId = 'forum-123';
    const lightDTO = false;

    await service.getForumById(forumId, lightDTO);

    expect(mockForumsRepository.getForumById).toHaveBeenCalledWith(forumId, lightDTO);
  });

  it('should call forumsRepository.getForumByCourseId with courseId and lightDTO', async () => {
    const courseId = 'course-123';
    const lightDTO = true;

    await service.getForumByCourseId(courseId, lightDTO);

    expect(mockForumsRepository.getForumByCourseId).toHaveBeenCalledWith(courseId, lightDTO);
  });

  it('should call forumsRepository.createForum with dto and lightDTO', async () => {
    const dto: ForumInDTO = {
      courseId: 'course-456',
      active: true,
    };
    const lightDTO = true;

    await service.postForum(dto, lightDTO);

    expect(mockForumsRepository.createForum).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call forumsRepository.updateForum with forumId, dto and lightDTO', async () => {
    const forumId = 'forum-123';
    const dto: Partial<ForumUpdateDTO> = {
      active: false,
      commentsCount: 25,
    };
    const lightDTO = false;

    await service.putForum(forumId, dto, lightDTO);

    expect(mockForumsRepository.updateForum).toHaveBeenCalledWith(forumId, dto, lightDTO);
  });

  it('should call forumsRepository.deleteForumById with forumId', async () => {
    const forumId = 'forum-123';

    await service.deleteForum(forumId);

    expect(mockForumsRepository.deleteForumById).toHaveBeenCalledWith(forumId);
  });
});
