import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  ForumHeavyDTO,
  ForumInDTO,
  ForumLightDTO,
  ForumsRepository,
  ForumUpdateDTO,
} from '../../../../src/app/index.js';
import { ForumsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/ForumsRepositoryPostgreSQL.js';
import type { FiltersForum, SortingForums } from '../../../../src/utils/index.js';
import { SORT_FORUM } from '../../../../src/utils/index.js';

describe('Forums Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let forumsRepository: ForumsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    forumsRepository = new ForumsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(forumsRepository).toBeDefined();
  });

  describe('getForums', () => {
    it('Should return paginated forums with light DTO', async () => {
      const filters: FiltersForum = {
        courseId: 'course_1',
        active: true,
        commentsCountMin: null,
        commentsCountMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingForums = {
        sortFields: [SORT_FORUM.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockForums = [
        {
          id_forum: 'forum_1',
          course_id: 'course_1',
          created_at: new Date('2025-01-01'),
          active: true,
          comments_count: 25,
        },
      ];

      prismaClient.courseForum.count.mockResolvedValueOnce(1);
      prismaClient.courseForum.findMany.mockResolvedValueOnce(mockForums);

      const result = await forumsRepository.getForums(filters, sort, true);

      expect(prismaClient.courseForum.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.data[0].courseId).toBe('course_1');
      expect(result.data[0].commentsCount).toBe(25);
    });

    it('Should return paginated forums with heavy DTO', async () => {
      const filters: FiltersForum = {
        courseId: null,
        active: null,
        commentsCountMin: 10,
        commentsCountMax: 50,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingForums = {
        sortFields: [SORT_FORUM.COMMENTS_COUNT],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockForums = [
        {
          id_forum: 'forum_2',
          course_id: 'course_2',
          created_at: new Date('2025-02-01'),
          active: true,
          comments_count: 45,
        },
        {
          id_forum: 'forum_3',
          course_id: 'course_3',
          created_at: new Date('2025-02-05'),
          active: true,
          comments_count: 30,
        },
      ];

      prismaClient.courseForum.count.mockResolvedValueOnce(2);
      prismaClient.courseForum.findMany.mockResolvedValueOnce(mockForums);

      const result = await forumsRepository.getForums(filters, sort, false);

      expect(prismaClient.courseForum.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe('getForumById', () => {
    it('Should return forum by id with light DTO', async () => {
      const forumId = 'forum_123';
      const courseId = 'course_456';
      const createdAt = new Date('2025-03-01');
      const active = true;
      const commentsCount = 15;

      const expectedOutput: ForumLightDTO = {
        idForum: forumId,
        courseId,
        createdAt,
        active,
        commentsCount,
      };

      prismaClient.courseForum.findUniqueOrThrow.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: courseId,
        created_at: createdAt,
        active,
        comments_count: commentsCount,
      });

      const result = await forumsRepository.getForumById(forumId, true);

      expect(prismaClient.courseForum.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return forum by id with heavy DTO', async () => {
      const forumId = 'forum_789';
      const courseId = 'course_999';
      const createdAt = new Date('2025-04-01');
      const active = true;
      const commentsCount = 100;

      const expectedOutput: ForumHeavyDTO = {
        idForum: forumId,
        courseId,
        createdAt,
        active,
        commentsCount,
      };

      prismaClient.courseForum.findUniqueOrThrow.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: courseId,
        created_at: createdAt,
        active,
        comments_count: commentsCount,
      });

      const result = await forumsRepository.getForumById(forumId, false);

      expect(prismaClient.courseForum.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when forum not found', async () => {
      const forumId = 'non_existent_forum';

      prismaClient.courseForum.findUniqueOrThrow.mockRejectedValueOnce(
        new Error('Forum not found')
      );

      await expect(forumsRepository.getForumById(forumId, true)).rejects.toThrow();
    });
  });

  describe('getForumByCourseId', () => {
    it('Should return forum by course id', async () => {
      const courseId = 'course_123';
      const forumId = 'forum_456';
      const createdAt = new Date('2025-05-01');
      const active = true;
      const commentsCount = 20;

      const expectedOutput: ForumLightDTO = {
        idForum: forumId,
        courseId,
        createdAt,
        active,
        commentsCount,
      };

      prismaClient.courseForum.findFirst.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: courseId,
        created_at: createdAt,
        active,
        comments_count: commentsCount,
      });

      const result = await forumsRepository.getForumByCourseId(courseId, true);

      expect(prismaClient.courseForum.findFirst).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return null when forum not found for course', async () => {
      const courseId = 'course_without_forum';

      prismaClient.courseForum.findFirst.mockResolvedValueOnce(null);

      const result = await forumsRepository.getForumByCourseId(courseId, true);

      expect(prismaClient.courseForum.findFirst).toHaveBeenCalledOnce();
      expect(result).toBeNull();
    });
  });

  describe('createForum', () => {
    it('Should create a new forum with light DTO', async () => {
      const courseId = 'course_new';
      const active = true;

      const inputForum: ForumInDTO = {
        courseId,
        active,
      };

      const expectedOutput: ForumLightDTO = {
        idForum: 'new_forum_id',
        courseId,
        createdAt: new Date('2025-06-01'),
        active,
        commentsCount: 0,
      };

      prismaClient.courseForum.create.mockResolvedValueOnce({
        id_forum: 'new_forum_id',
        course_id: courseId,
        created_at: new Date('2025-06-01'),
        active,
        comments_count: 0,
      });

      const result = await forumsRepository.createForum(inputForum, true);

      expect(prismaClient.courseForum.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
      expect(result.commentsCount).toBe(0);
    });

    it('Should create a new forum with heavy DTO', async () => {
      const courseId = 'course_advanced';
      const active = true;

      const inputForum: ForumInDTO = {
        courseId,
        active,
      };

      const expectedOutput: ForumHeavyDTO = {
        idForum: 'new_forum_heavy_id',
        courseId,
        createdAt: new Date('2025-06-15'),
        active,
        commentsCount: 0,
      };

      prismaClient.courseForum.create.mockResolvedValueOnce({
        id_forum: 'new_forum_heavy_id',
        course_id: courseId,
        created_at: new Date('2025-06-15'),
        active,
        comments_count: 0,
      });

      const result = await forumsRepository.createForum(inputForum, false);

      expect(prismaClient.courseForum.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('updateForum', () => {
    it('Should update an existing forum with light DTO', async () => {
      const forumId = 'forum_to_update';
      const courseId = 'course_updated';
      const active = false;
      const commentsCount = 50;

      const updateDTO: Partial<ForumUpdateDTO> = {
        courseId,
        active,
        commentsCount,
      };

      const expectedOutput: ForumLightDTO = {
        idForum: forumId,
        courseId,
        createdAt: new Date('2025-01-01'),
        active,
        commentsCount,
      };

      prismaClient.courseForum.update.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: courseId,
        created_at: new Date('2025-01-01'),
        active,
        comments_count: commentsCount,
      });

      const result = await forumsRepository.updateForum(forumId, updateDTO, true);

      expect(prismaClient.courseForum.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
      expect(result.active).toBe(false);
      expect(result.commentsCount).toBe(50);
    });

    it('Should update an existing forum with heavy DTO', async () => {
      const forumId = 'forum_full_update';
      const courseId = 'course_complete';
      const active = true;
      const commentsCount = 100;

      const updateDTO: Partial<ForumUpdateDTO> = {
        courseId,
        active,
        commentsCount,
      };

      const expectedOutput: ForumHeavyDTO = {
        idForum: forumId,
        courseId,
        createdAt: new Date('2025-02-01'),
        active,
        commentsCount,
      };

      prismaClient.courseForum.update.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: courseId,
        created_at: new Date('2025-02-01'),
        active,
        comments_count: commentsCount,
      });

      const result = await forumsRepository.updateForum(forumId, updateDTO, false);

      expect(prismaClient.courseForum.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update only some fields of a forum', async () => {
      const forumId = 'forum_partial_update';
      const partialDTO: Partial<ForumUpdateDTO> = {
        active: false,
        commentsCount: 75,
      };

      const expectedOutput: ForumHeavyDTO = {
        idForum: forumId,
        courseId: 'original_course',
        createdAt: new Date('2025-01-01'),
        active: false,
        commentsCount: 75,
      };

      prismaClient.courseForum.update.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: 'original_course',
        created_at: new Date('2025-01-01'),
        active: false,
        comments_count: 75,
      });

      const result = await forumsRepository.updateForum(forumId, partialDTO, false);

      expect(prismaClient.courseForum.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
      expect(result.active).toBe(false);
      expect(result.commentsCount).toBe(75);
      expect(result.courseId).toBe('original_course');
    });

    it('Should throw error when trying to update non-existent forum', async () => {
      const forumId = 'non_existent_forum';
      const updateDTO: Partial<ForumUpdateDTO> = {
        active: true,
      };

      prismaClient.courseForum.update.mockRejectedValueOnce(new Error('Forum not found'));

      await expect(forumsRepository.updateForum(forumId, updateDTO, true)).rejects.toThrow();
    });
  });

  describe('deleteForumById', () => {
    it('Should delete a forum by id', async () => {
      const forumId = 'forum_to_delete';

      prismaClient.courseForum.delete.mockResolvedValueOnce({
        id_forum: forumId,
        course_id: 'course_1',
        created_at: new Date(),
        active: true,
        comments_count: 10,
      });

      await forumsRepository.deleteForumById(forumId);

      expect(prismaClient.courseForum.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent forum', async () => {
      const forumId = 'non_existent_forum';

      prismaClient.courseForum.delete.mockRejectedValueOnce(new Error('Forum not found'));

      await expect(forumsRepository.deleteForumById(forumId)).rejects.toThrow();
    });
  });
});
