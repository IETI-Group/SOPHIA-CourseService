import { CourseLevel, CourseStatus, type PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  CourseHeavyDTO,
  CourseInDTO,
  CourseLightDTO,
  CoursesRepository,
  CourseUpdateDTO,
} from '../../../../src/app/index.js';
import { CoursesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/CoursesRepositoryPostgreSQL.js';
import type { FiltersCourse, SortingCourses } from '../../../../src/utils/index.js';
import { SORT_COURSES } from '../../../../src/utils/index.js';

describe('Courses Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let coursesRepository: CoursesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    coursesRepository = new CoursesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(coursesRepository).toBeDefined();
  });

  describe('getCourses', () => {
    it('Should return paginated courses with light DTO', async () => {
      const filters: FiltersCourse = {
        instructorId: 'instructor_1',
        generationTaskId: null,
        title: null,
        level: null,
        status: null,
        active: true,
        aiGenerated: null,
        createdAtStart: null,
        createdAtEnd: null,
        updatedAtStart: null,
        updatedAtEnd: null,
        publishedAtStart: null,
        publishedAtEnd: null,
        lastAIUpdateAtStart: null,
        lastAIUpdateAtEnd: null,
        priceMin: null,
        priceMax: null,
        averageReviewsMin: null,
        averageReviewsMax: null,
        durationHoursMin: null,
        durationHoursMax: null,
        totalLessonsMin: null,
        totalLessonsMax: null,
        totalReviewsMin: null,
        totalReviewsMax: null,
        totalEnrollmentsMin: null,
        totalEnrollmentsMax: null,
      };
      const sort: SortingCourses = {
        sortFields: [SORT_COURSES.TITLE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockCourses = [
        {
          id_course: 'course_1',
          instructor_id: 'instructor_1',
          title: 'Introduction to Programming',
          description: 'Learn programming basics',
          price: 49.99,
          level: CourseLevel.BEGINNER,
          active: true,
          status: CourseStatus.PUBLISHED,
          average_reviews: 4.5,
          duration_hours: 10,
          total_lessons: 20,
          total_reviews: 100,
          total_enrollments: 500,
          created_at: new Date('2025-01-01'),
          updated_at: new Date('2025-01-10'),
          published_at: new Date('2025-01-05'),
          ai_generated: false,
          generation_task_id: null,
          generation_metadata: null,
          last_ai_update_at: null,
        },
      ];

      prismaClient.courses.count.mockResolvedValueOnce(1);
      prismaClient.courses.findMany.mockResolvedValueOnce(mockCourses);

      const result = await coursesRepository.getCourses(filters, sort, true);

      expect(prismaClient.courses.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return paginated courses with heavy DTO', async () => {
      const filters: FiltersCourse = {
        instructorId: null,
        generationTaskId: null,
        title: null,
        level: CourseLevel.INTERMEDIATE,
        status: null,
        active: null,
        aiGenerated: null,
        createdAtStart: null,
        createdAtEnd: null,
        updatedAtStart: null,
        updatedAtEnd: null,
        publishedAtStart: null,
        publishedAtEnd: null,
        lastAIUpdateAtStart: null,
        lastAIUpdateAtEnd: null,
        priceMin: null,
        priceMax: null,
        averageReviewsMin: null,
        averageReviewsMax: null,
        durationHoursMin: null,
        durationHoursMax: null,
        totalLessonsMin: null,
        totalLessonsMax: null,
        totalReviewsMin: null,
        totalReviewsMax: null,
        totalEnrollmentsMin: null,
        totalEnrollmentsMax: null,
      };
      const sort: SortingCourses = {
        sortFields: [SORT_COURSES.AVERAGE_REVIEWS],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockCourses = [
        {
          id_course: 'course_2',
          instructor_id: 'instructor_2',
          title: 'Advanced JavaScript',
          description: 'Master JavaScript concepts',
          price: 79.99,
          level: CourseLevel.INTERMEDIATE,
          active: true,
          status: CourseStatus.PUBLISHED,
          average_reviews: 4.8,
          duration_hours: 15,
          total_lessons: 30,
          total_reviews: 200,
          total_enrollments: 800,
          created_at: new Date('2025-02-01'),
          updated_at: new Date('2025-02-10'),
          published_at: new Date('2025-02-05'),
          ai_generated: true,
          generation_task_id: 'task_123',
          generation_metadata: { version: 1 },
          last_ai_update_at: new Date('2025-02-08'),
        },
      ];

      prismaClient.courses.count.mockResolvedValueOnce(1);
      prismaClient.courses.findMany.mockResolvedValueOnce(mockCourses);

      const result = await coursesRepository.getCourses(filters, sort, false);

      expect(prismaClient.courses.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getCourseById', () => {
    it('Should return course by id with light DTO', async () => {
      const courseId = 'course_123';
      const instructorId = 'instructor_456';
      const title = 'Data Science Fundamentals';
      const price = 99.99;
      const level = CourseLevel.BEGINNER;
      const active = true;
      const status = CourseStatus.PUBLISHED;
      const averageReviews = 4.7;
      const durationHours = 20;
      const totalLessons = 40;
      const totalReviews = 150;
      const totalEnrollments = 600;
      const createdAt = new Date('2025-03-01');
      const updatedAt = new Date('2025-03-10');
      const publishedAt = new Date('2025-03-05');

      const expectedOutput: CourseLightDTO = {
        idCourse: courseId,
        instructorId,
        title,
        price,
        level,
        active,
        status,
        averageReviews,
        durationHours,
        totalLessons,
        totalReviews,
        totalEnrollments,
        createdAt,
        updatedAt,
        publishedAt,
      };

      prismaClient.courses.findUniqueOrThrow.mockResolvedValueOnce({
        id_course: courseId,
        instructor_id: instructorId,
        title,
        description: 'Some description',
        price,
        level,
        active,
        status,
        average_reviews: averageReviews,
        duration_hours: durationHours,
        total_lessons: totalLessons,
        total_reviews: totalReviews,
        total_enrollments: totalEnrollments,
        created_at: createdAt,
        updated_at: updatedAt,
        published_at: publishedAt,
        ai_generated: false,
        generation_task_id: null,
        generation_metadata: null,
        last_ai_update_at: null,
      });

      const result = await coursesRepository.getCourseById(courseId, true);

      expect(prismaClient.courses.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return course by id with heavy DTO', async () => {
      const courseId = 'course_789';
      const instructorId = 'instructor_999';
      const title = 'AI and Machine Learning';
      const description = 'Complete AI course';
      const price = 149.99;
      const level = CourseLevel.ADVANCED;
      const active = true;
      const status = CourseStatus.PUBLISHED;
      const averageReviews = 4.9;
      const durationHours = 30;
      const totalLessons = 60;
      const totalReviews = 300;
      const totalEnrollments = 1000;
      const createdAt = new Date('2025-04-01');
      const updatedAt = new Date('2025-04-10');
      const publishedAt = new Date('2025-04-05');
      const aiGenerated = true;
      const generationTaskId = 'task_ai_456';
      const generationMetadata = { model: 'gpt-4', version: 2 };
      const lastAIUpdateAt = new Date('2025-04-08');

      const expectedOutput: CourseHeavyDTO = {
        idCourse: courseId,
        instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        averageReviews,
        durationHours,
        totalLessons,
        totalReviews,
        totalEnrollments,
        createdAt,
        updatedAt,
        publishedAt,
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      prismaClient.courses.findUniqueOrThrow.mockResolvedValueOnce({
        id_course: courseId,
        instructor_id: instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        average_reviews: averageReviews,
        duration_hours: durationHours,
        total_lessons: totalLessons,
        total_reviews: totalReviews,
        total_enrollments: totalEnrollments,
        created_at: createdAt,
        updated_at: updatedAt,
        published_at: publishedAt,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        generation_metadata: generationMetadata,
        last_ai_update_at: lastAIUpdateAt,
      });

      const result = await coursesRepository.getCourseById(courseId, false);

      expect(prismaClient.courses.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when course not found', async () => {
      const courseId = 'non_existent_course';

      prismaClient.courses.findUnique.mockResolvedValueOnce(null);

      await expect(coursesRepository.getCourseById(courseId, true)).rejects.toThrow();
    });
  });

  describe('createCourse', () => {
    it('Should create a new course with light DTO', async () => {
      const instructorId = 'instructor_new';
      const title = 'Web Development Bootcamp';
      const description = 'Complete web dev course';
      const price = 59.99;
      const level = CourseLevel.BEGINNER;
      const aiGenerated = false;
      const generationTaskId = null;
      const generationMetadata = null;
      const lastAIUpdateAt = null;

      const inputCourse: CourseInDTO = {
        instructorId,
        title,
        description,
        price,
        level,
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      const expectedOutput: CourseLightDTO = {
        idCourse: 'new_course_id',
        instructorId,
        title,
        price,
        level,
        active: false,
        status: CourseStatus.DRAFT,
        averageReviews: 0,
        durationHours: 0,
        totalLessons: 0,
        totalReviews: 0,
        totalEnrollments: 0,
        createdAt: new Date('2025-05-01'),
        updatedAt: null,
        publishedAt: null,
      };

      prismaClient.courses.create.mockResolvedValueOnce({
        id_course: 'new_course_id',
        instructor_id: instructorId,
        title,
        description,
        price,
        level,
        active: false,
        status: CourseStatus.DRAFT,
        average_reviews: 0,
        duration_hours: 0,
        total_lessons: 0,
        total_reviews: 0,
        total_enrollments: 0,
        created_at: new Date('2025-05-01'),
        updated_at: null,
        published_at: null,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        generation_metadata: generationMetadata,
        last_ai_update_at: lastAIUpdateAt,
      });

      const result = await coursesRepository.createCourse(inputCourse, true);

      expect(prismaClient.courses.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a new course with heavy DTO', async () => {
      const instructorId = 'instructor_ai';
      const title = 'AI Generated Course';
      const description = 'AI created content';
      const price = 89.99;
      const level = CourseLevel.INTERMEDIATE;
      const aiGenerated = true;
      const generationTaskId = 'task_new_789';
      const generationMetadata = { ai_model: 'gpt-4' };
      const lastAIUpdateAt = new Date('2025-05-10');

      const inputCourse: CourseInDTO = {
        instructorId,
        title,
        description,
        price,
        level,
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      const expectedOutput: CourseHeavyDTO = {
        idCourse: 'new_ai_course_id',
        instructorId,
        title,
        description,
        price,
        level,
        active: false,
        status: CourseStatus.DRAFT,
        averageReviews: 0,
        durationHours: 0,
        totalLessons: 0,
        totalReviews: 0,
        totalEnrollments: 0,
        createdAt: new Date('2025-05-01'),
        updatedAt: null,
        publishedAt: null,
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      prismaClient.courses.create.mockResolvedValueOnce({
        id_course: 'new_ai_course_id',
        instructor_id: instructorId,
        title,
        description,
        price,
        level,
        active: false,
        status: CourseStatus.DRAFT,
        average_reviews: 0,
        duration_hours: 0,
        total_lessons: 0,
        total_reviews: 0,
        total_enrollments: 0,
        created_at: new Date('2025-05-01'),
        updated_at: null,
        published_at: null,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        generation_metadata: generationMetadata,
        last_ai_update_at: lastAIUpdateAt,
      });

      const result = await coursesRepository.createCourse(inputCourse, false);

      expect(prismaClient.courses.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('updateCourse', () => {
    it('Should update an existing course with light DTO', async () => {
      const courseId = 'course_to_update';
      const instructorId = 'instructor_updated';
      const title = 'Updated Course Title';
      const description = 'Updated description';
      const price = 69.99;
      const level = CourseLevel.INTERMEDIATE;
      const active = true;
      const status = CourseStatus.PUBLISHED;
      const aiGenerated = false;
      const generationTaskId = null;
      const generationMetadata = null;
      const lastAIUpdateAt = null;

      const updateDTO: CourseUpdateDTO = {
        instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      const expectedOutput: CourseLightDTO = {
        idCourse: courseId,
        instructorId,
        title,
        price,
        level,
        active,
        status,
        averageReviews: 4.5,
        durationHours: 10,
        totalLessons: 20,
        totalReviews: 100,
        totalEnrollments: 500,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-06-01'),
        publishedAt: new Date('2025-05-20'),
      };

      prismaClient.courses.update.mockResolvedValueOnce({
        id_course: courseId,
        instructor_id: instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        average_reviews: 4.5,
        duration_hours: 10,
        total_lessons: 20,
        total_reviews: 100,
        total_enrollments: 500,
        created_at: new Date('2025-01-01'),
        updated_at: new Date('2025-06-01'),
        published_at: new Date('2025-05-20'),
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        generation_metadata: generationMetadata,
        last_ai_update_at: lastAIUpdateAt,
      });

      const result = await coursesRepository.updateCourse(courseId, updateDTO, true);

      expect(prismaClient.courses.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update an existing course with heavy DTO', async () => {
      const courseId = 'course_full_update';
      const instructorId = 'instructor_full';
      const title = 'Complete Updated Course';
      const description = 'Fully updated content';
      const price = 99.99;
      const level = CourseLevel.ADVANCED;
      const active = true;
      const status = CourseStatus.PUBLISHED;
      const aiGenerated = true;
      const generationTaskId = 'task_updated_123';
      const generationMetadata = { version: 3 };
      const lastAIUpdateAt = new Date('2025-06-15');

      const updateDTO: CourseUpdateDTO = {
        instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      const expectedOutput: CourseHeavyDTO = {
        idCourse: courseId,
        instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        averageReviews: 4.8,
        durationHours: 25,
        totalLessons: 50,
        totalReviews: 200,
        totalEnrollments: 900,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-06-15'),
        publishedAt: new Date('2025-05-20'),
        aiGenerated,
        generationTaskId,
        generationMetadata,
        lastAIUpdateAt,
      };

      prismaClient.courses.update.mockResolvedValueOnce({
        id_course: courseId,
        instructor_id: instructorId,
        title,
        description,
        price,
        level,
        active,
        status,
        average_reviews: 4.8,
        duration_hours: 25,
        total_lessons: 50,
        total_reviews: 200,
        total_enrollments: 900,
        created_at: new Date('2025-01-01'),
        updated_at: new Date('2025-06-15'),
        published_at: new Date('2025-05-20'),
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        generation_metadata: generationMetadata,
        last_ai_update_at: lastAIUpdateAt,
      });

      const result = await coursesRepository.updateCourse(courseId, updateDTO, false);

      expect(prismaClient.courses.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to update non-existent course', async () => {
      const courseId = 'non_existent_course';
      const updateDTO: CourseUpdateDTO = {
        instructorId: 'inst_1',
        title: 'Test',
        description: 'Test',
        price: 50,
        level: CourseLevel.BEGINNER,
        active: true,
        status: CourseStatus.DRAFT,
        aiGenerated: false,
        generationTaskId: null,
        generationMetadata: null,
        lastAIUpdateAt: null,
      };

      prismaClient.courses.findUnique.mockResolvedValueOnce(null);

      await expect(coursesRepository.updateCourse(courseId, updateDTO, true)).rejects.toThrow();
    });
  });

  describe('deleteCourseById', () => {
    it('Should delete a course by id', async () => {
      const courseId = 'course_to_delete';

      prismaClient.courses.delete.mockResolvedValueOnce({
        id_course: courseId,
        instructor_id: 'inst_1',
        title: 'Deleted Course',
        description: 'Deleted',
        price: 50,
        level: CourseLevel.BEGINNER,
        active: false,
        status: CourseStatus.DRAFT,
        average_reviews: 0,
        duration_hours: 0,
        total_lessons: 0,
        total_reviews: 0,
        total_enrollments: 0,
        created_at: new Date(),
        updated_at: null,
        published_at: null,
        ai_generated: false,
        generation_task_id: null,
        generation_metadata: null,
        last_ai_update_at: null,
      });

      await coursesRepository.deleteCourseById(courseId);

      expect(prismaClient.courses.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent course', async () => {
      const courseId = 'non_existent_course';

      prismaClient.courses.findUnique.mockResolvedValueOnce(null);

      await expect(coursesRepository.deleteCourseById(courseId)).rejects.toThrow();
    });
  });
});
