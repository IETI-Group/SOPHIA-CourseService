import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { LessonSectionInDTO, LessonSectionUpdateDTO } from '../../../src/app/models/index.js';
import type { LessonsRepository } from '../../../src/app/repositories/index.js';
import { LessonServiceImpl } from '../../../src/app/services/implementations/LessonServiceImpl.js';
import type { FiltersLesson, SortingLessons } from '../../../src/utils/index.js';

describe('LessonServiceImpl', () => {
  const mockLessonsRepository = mockDeep<LessonsRepository>();
  let service: LessonServiceImpl;

  beforeEach(() => {
    service = new LessonServiceImpl(mockLessonsRepository);
  });

  afterEach(() => {
    mockReset(mockLessonsRepository);
  });

  it('should call lessonsRepository.getLessons with filters, sort and lightDTO', async () => {
    const filters: FiltersLesson = {
      sectionId: 'section-123',
      generationTaskId: null,
      title: null,
      lessonType: null,
      active: null,
      aiGenerated: null,
      durationMinutesMin: null,
      durationMinutesMax: null,
      orderMin: null,
      orderMax: null,
      estimatedDifficultyMin: null,
      estimatedDifficultyMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingLessons = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getSectionLessons(filters, sort, lightDTO);

    expect(mockLessonsRepository.getLessons).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call lessonsRepository.getLessonById with lessonId and lightDTO', async () => {
    const lessonId: string = 'lesson-123';
    const lightDTO: boolean = false;

    await service.getLessonById(lessonId, lightDTO);

    expect(mockLessonsRepository.getLessonById).toHaveBeenCalledWith(lessonId, lightDTO);
  });

  it('should call lessonsRepository.createLesson with dto and lightDTO', async () => {
    const dto: LessonSectionInDTO = {
      sectionId: 'section-123',
      title: 'New Lesson',
      description: 'Lesson description',
      lessonType: 'THEORY',
      order: 1,
      durationMinutes: 30,
      estimatedDifficulty: 5,
      aiGenerated: false,
      generationTaskId: null,
    };
    const lightDTO: boolean = true;

    await service.postSectionLesson(dto, lightDTO);

    expect(mockLessonsRepository.createLesson).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call lessonsRepository.updateLesson with lessonId, dto and lightDTO', async () => {
    const lessonId: string = 'lesson-123';
    const dto: Partial<LessonSectionUpdateDTO> = {
      title: 'Updated Lesson',
      active: false,
    };
    const lightDTO: boolean = false;

    await service.putLesson(lessonId, dto, lightDTO);

    expect(mockLessonsRepository.updateLesson).toHaveBeenCalledWith(lessonId, dto, lightDTO);
  });

  it('should call lessonsRepository.deleteLessonById with lessonId', async () => {
    const lessonId: string = 'lesson-123';

    await service.deleteLesson(lessonId);

    expect(mockLessonsRepository.deleteLessonById).toHaveBeenCalledWith(lessonId);
  });
});
