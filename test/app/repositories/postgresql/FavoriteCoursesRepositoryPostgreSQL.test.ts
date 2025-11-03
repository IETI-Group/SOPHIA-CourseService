import { CourseLevel, type PrismaClient } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { FavoriteCoursesRepository } from '../../../../src/app/index.js';
import { FavoriteCoursesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/FavoriteCoursesRepositoryPostgreSQL.js';
import { SORT_FAVORITE_COURSE } from '../../../../src/utils/index.js';

describe('Favorite Courses Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let favoriteCoursesRepository: FavoriteCoursesRepository;

  beforeEach(() => {
    mockReset(prismaClient);
    favoriteCoursesRepository = new FavoriteCoursesRepositoryPostgreSQL(prismaClient);
  });

  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(favoriteCoursesRepository).toBeDefined();
  });

  describe('getFavoriteCourses', () => {
    it('Should return paginated favorite courses', async () => {
      const mockFavoriteCourses = [
        {
          user_id: 'user-1',
          course_id: 'course-1',
          created_at: new Date('2024-01-10'),
          courses: {
            title: 'Introduction to TypeScript',
            average_reviews: 4.8,
            total_enrollments: 1500,
            level: CourseLevel.BEGINNER,
          },
        },
        {
          user_id: 'user-1',
          course_id: 'course-2',
          created_at: new Date('2024-01-15'),
          courses: {
            title: 'Advanced React Patterns',
            average_reviews: 4.9,
            total_enrollments: 800,
            level: CourseLevel.ADVANCED,
          },
        },
      ];

      prismaClient.favouritesCourses.findMany.mockResolvedValue(mockFavoriteCourses as never);
      prismaClient.favouritesCourses.count.mockResolvedValue(2);

      const result = await favoriteCoursesRepository.getFavoriteCourses(
        {
          courseId: null,
          courseTitle: null,
          userId: 'user-1',
          courseLevel: null,
          courseAverageReviewsMin: null,
          courseAverageReviewsMax: null,
          courseTotalEnrollmentsMin: null,
          courseTotalEnrollmentsMax: null,
          createdAtStart: null,
          createdAtEnd: null,
        },
        {
          page: 1,
          size: 10,
          sortFields: [SORT_FAVORITE_COURSE.CREATION_DATE],
          sortDirection: 'desc',
        }
      );

      expect(result).toMatchObject({
        data: [
          {
            userId: 'user-1',
            courseId: 'course-1',
            createdAt: new Date('2024-01-10'),
            courseTitle: 'Introduction to TypeScript',
            courseAverageReviews: 4.8,
            courseTotalEnrollments: 1500,
            courseLevel: CourseLevel.BEGINNER,
          },
          {
            userId: 'user-1',
            courseId: 'course-2',
            createdAt: new Date('2024-01-15'),
            courseTitle: 'Advanced React Patterns',
            courseAverageReviews: 4.9,
            courseTotalEnrollments: 800,
            courseLevel: CourseLevel.ADVANCED,
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
      expect(result.message).toBe('Favorite courses retrieved successfully');
    });
  });

  describe('getFavoriteCourseById', () => {
    it('Should return favorite course by composite key', async () => {
      const mockFavoriteCourse = {
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        courses: {
          title: 'Introduction to TypeScript',
          average_reviews: 4.8,
          total_enrollments: 1500,
          level: CourseLevel.BEGINNER,
        },
      };

      prismaClient.favouritesCourses.findUniqueOrThrow.mockResolvedValue(
        mockFavoriteCourse as never
      );

      const result = await favoriteCoursesRepository.getFavoriteCourseById('user-1_course-1');

      expect(result).toEqual({
        userId: 'user-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        courseTitle: 'Introduction to TypeScript',
        courseAverageReviews: 4.8,
        courseTotalEnrollments: 1500,
        courseLevel: CourseLevel.BEGINNER,
      });
    });

    it('Should throw error when favorite course not found', async () => {
      prismaClient.favouritesCourses.findUniqueOrThrow.mockRejectedValue(
        new Error('Favorite course not found')
      );

      await expect(
        favoriteCoursesRepository.getFavoriteCourseById('user-999_course-999')
      ).rejects.toThrow('Favorite course not found');
    });
  });

  describe('createFavoriteCourse', () => {
    it('Should create a new favorite course', async () => {
      const favoriteCourseIn = {
        userId: 'user-1',
        courseId: 'course-1',
      };

      const mockCreatedFavoriteCourse = {
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        courses: {
          title: 'Introduction to TypeScript',
          average_reviews: 4.8,
          total_enrollments: 1500,
          level: CourseLevel.BEGINNER,
        },
      };

      prismaClient.favouritesCourses.create.mockResolvedValue(mockCreatedFavoriteCourse as never);

      const result = await favoriteCoursesRepository.createFavoriteCourse(favoriteCourseIn);

      expect(result).toEqual({
        userId: 'user-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        courseTitle: 'Introduction to TypeScript',
        courseAverageReviews: 4.8,
        courseTotalEnrollments: 1500,
        courseLevel: CourseLevel.BEGINNER,
      });
    });
  });

  describe('updateFavoriteCourse', () => {
    it('Should update an existing favorite course', async () => {
      const favoriteCourseUpdate = {
        userId: 'user-1',
        courseId: 'course-2',
      };

      const mockUpdatedFavoriteCourse = {
        user_id: 'user-1',
        course_id: 'course-2',
        created_at: new Date('2024-01-15'),
        courses: {
          title: 'Advanced React Patterns',
          average_reviews: 4.9,
          total_enrollments: 800,
          level: CourseLevel.ADVANCED,
        },
      };

      prismaClient.favouritesCourses.update.mockResolvedValue(mockUpdatedFavoriteCourse as never);

      const result = await favoriteCoursesRepository.updateFavoriteCourse(
        'user-1_course-1',
        favoriteCourseUpdate
      );

      expect(result).toEqual({
        userId: 'user-1',
        courseId: 'course-2',
        createdAt: new Date('2024-01-15'),
        courseTitle: 'Advanced React Patterns',
        courseAverageReviews: 4.9,
        courseTotalEnrollments: 800,
        courseLevel: CourseLevel.ADVANCED,
      });
    });

    it('Should throw error when updating non-existent favorite course', async () => {
      const favoriteCourseUpdate = {
        userId: 'user-1',
        courseId: 'course-2',
      };

      prismaClient.favouritesCourses.update.mockRejectedValue(
        new Error('Favorite course not found')
      );

      await expect(
        favoriteCoursesRepository.updateFavoriteCourse('user-999_course-999', favoriteCourseUpdate)
      ).rejects.toThrow('Favorite course not found');
    });
  });

  describe('deleteFavoriteCourseById', () => {
    it('Should delete favorite course by composite key', async () => {
      prismaClient.favouritesCourses.delete.mockResolvedValue({
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
      });

      await favoriteCoursesRepository.deleteFavoriteCourseById('user-1_course-1');

      expect(prismaClient.favouritesCourses.delete).toHaveBeenCalledWith({
        where: { user_id_course_id: { user_id: 'user-1', course_id: 'course-1' } },
      });
    });

    it('Should throw error when deleting non-existent favorite course', async () => {
      prismaClient.favouritesCourses.delete.mockRejectedValue(null);

      await expect(
        favoriteCoursesRepository.deleteFavoriteCourseById('user-999_course-999')
      ).rejects.toThrow();
    });
  });
});
