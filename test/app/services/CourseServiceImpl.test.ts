import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { CourseInDTO, CourseUpdateDTO } from '../../../src/app/models/index.js';
import type { CoursesRepository } from '../../../src/app/repositories/index.js';
import { CourseServiceImpl } from '../../../src/app/services/implementations/CourseServiceImpl.js';
import type { FiltersCourse, SortingCourses } from '../../../src/utils/index.js';

describe('CourseServiceImpl', () => {
  const mockCoursesRepository = mockDeep<CoursesRepository>();
  let service: CourseServiceImpl;

  beforeEach(() => {
    service = new CourseServiceImpl(mockCoursesRepository);
  });

  afterEach(() => {
    mockReset(mockCoursesRepository);
  });

  it('should call coursesRepository.getCourses with filters, sort and lightDTO', async () => {
    const filters: FiltersCourse = {
      title: 'Test Course',
      active: true,
      instructorId: null,
      generationTaskId: null,
      level: null,
      status: null,
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
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getCourses(filters, sort, lightDTO);

    expect(mockCoursesRepository.getCourses).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call coursesRepository.getCourseById with courseId and lightDTO', async () => {
    const courseId: string = 'course-123';
    const lightDTO: boolean = false;

    await service.getCourseById(courseId, lightDTO);

    expect(mockCoursesRepository.getCourseById).toHaveBeenCalledWith(courseId, lightDTO);
  });

  it('should call coursesRepository.createCourse with dto and lightDTO', async () => {
    const dto: CourseInDTO = {
      title: 'New Course',
      description: 'Course description',
      instructorId: 'instructor-123',
      level: 'BEGINNER',
      price: 100,
      aiGenerated: false,
      generationTaskId: null,
      generationMetadata: {},
      lastAIUpdateAt: null,
    };
    const lightDTO: boolean = true;

    await service.postCourse(dto, lightDTO);

    expect(mockCoursesRepository.createCourse).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call coursesRepository.updateCourse with courseId, dto and lightDTO', async () => {
    const courseId: string = 'course-123';
    const dto: Partial<CourseUpdateDTO> = {
      title: 'Updated Course',
      active: false,
    };
    const lightDTO: boolean = false;

    await service.putCourse(courseId, dto, lightDTO);

    expect(mockCoursesRepository.updateCourse).toHaveBeenCalledWith(courseId, dto, lightDTO);
  });

  it('should call coursesRepository.deleteCourseById with courseId', async () => {
    const courseId: string = 'course-123';

    await service.deleteCourse(courseId);

    expect(mockCoursesRepository.deleteCourseById).toHaveBeenCalledWith(courseId);
  });
});
