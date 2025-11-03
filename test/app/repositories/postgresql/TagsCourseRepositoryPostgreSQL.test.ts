import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { TagsCourseRepository } from '../../../../src/app/index.js';
import { TagsCourseRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/TagsCourseRepositoryPostgreSQL.js';
import { SORT_TAG } from '../../../../src/utils/index.js';

describe('Tags Course Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let tagsCourseRepository: TagsCourseRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    tagsCourseRepository = new TagsCourseRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(tagsCourseRepository).toBeDefined();
  });

  describe('getTags', () => {
    it('Should return paginated tags', async () => {
      const mockTags = [
        {
          category_id: 'category-1',
          course_id: 'course-1',
          created_at: new Date('2024-01-10'),
          categories: {
            name: 'Web Development',
          },
        },
        {
          category_id: 'category-2',
          course_id: 'course-1',
          created_at: new Date('2024-01-15'),
          categories: {
            name: 'JavaScript',
          },
        },
      ];

      prismaClient.tags.findMany.mockResolvedValue(mockTags as never);
      prismaClient.tags.count.mockResolvedValue(2);

      const result = await tagsCourseRepository.getTags(
        {
          courseId: 'course-1',
          name: null,
          categoryId: null,
          createdAtStart: null,
          createdAtEnd: null,
        },
        {
          page: 1,
          size: 10,
          sortFields: [SORT_TAG.CREATION_DATE],
          sortDirection: 'desc',
        }
      );

      expect(result).toMatchObject({
        data: [
          {
            categoryId: 'category-1',
            courseId: 'course-1',
            createdAt: new Date('2024-01-10'),
            name: 'Web Development',
          },
          {
            categoryId: 'category-2',
            courseId: 'course-1',
            createdAt: new Date('2024-01-15'),
            name: 'JavaScript',
          },
        ],
        page: 1,
        size: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
      expect(result.success).toBe(true);
      expect(result.message).toBe('Tags retrieved successfully');
    });
  });

  describe('getTagById', () => {
    it('Should return tag by composite key', async () => {
      const mockTag = {
        category_id: 'category-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        categories: {
          name: 'Web Development',
        },
      };

      prismaClient.tags.findUniqueOrThrow.mockResolvedValue(mockTag as never);

      const result = await tagsCourseRepository.getTagById('category-1_course-1');

      expect(result).toEqual({
        categoryId: 'category-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        name: 'Web Development',
      });
    });

    it('Should throw error when tag not found', async () => {
      prismaClient.tags.findUniqueOrThrow.mockRejectedValue(new Error('Tag not found'));

      await expect(tagsCourseRepository.getTagById('category-999_course-999')).rejects.toThrow(
        'Tag not found'
      );
    });
  });

  describe('createTag', () => {
    it('Should create a new tag', async () => {
      const tagIn = {
        categoryId: 'category-1',
        courseId: 'course-1',
      };

      const mockCreatedTag = {
        category_id: 'category-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        categories: {
          name: 'Web Development',
        },
      };

      prismaClient.tags.create.mockResolvedValue(mockCreatedTag as never);

      const result = await tagsCourseRepository.createTag(tagIn);

      expect(result).toEqual({
        categoryId: 'category-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        name: 'Web Development',
      });
    });
  });

  describe('updateTag', () => {
    it('Should update an existing tag', async () => {
      const tagUpdate = {
        categoryId: 'category-2',
        courseId: 'course-2',
      };

      const mockUpdatedTag = {
        category_id: 'category-2',
        course_id: 'course-2',
        created_at: new Date('2024-01-15'),
        categories: {
          name: 'JavaScript',
        },
      };

      prismaClient.tags.update.mockResolvedValue(mockUpdatedTag as never);

      const result = await tagsCourseRepository.updateTag('category-1_course-1', tagUpdate);

      expect(result).toEqual({
        categoryId: 'category-2',
        courseId: 'course-2',
        createdAt: new Date('2024-01-15'),
        name: 'JavaScript',
      });
    });

    it('Should throw error when updating non-existent tag', async () => {
      const tagUpdate = {
        categoryId: 'category-2',
        courseId: 'course-2',
      };

      prismaClient.tags.update.mockRejectedValue(new Error('Tag not found'));

      await expect(
        tagsCourseRepository.updateTag('category-999_course-999', tagUpdate)
      ).rejects.toThrow('Tag not found');
    });
  });

  describe('deleteTagById', () => {
    it('Should delete tag by composite key', async () => {
      prismaClient.tags.delete.mockResolvedValue({
        category_id: 'category-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
      });

      await tagsCourseRepository.deleteTagById('category-1_course-1');

      expect(prismaClient.tags.delete).toHaveBeenCalledWith({
        where: {
          category_id_course_id: {
            category_id: 'category-1',
            course_id: 'course-1',
          },
        },
      });
    });

    it('Should throw error when deleting non-existent tag', async () => {
      prismaClient.tags.delete.mockRejectedValue(null);

      await expect(tagsCourseRepository.deleteTagById('category-999_course-999')).rejects.toThrow();
    });
  });
});
