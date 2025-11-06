import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  ContentLessonInDTO,
  ContentLessonUpdateDTO,
  LessonSectionInDTO,
  LessonSectionUpdateDTO,
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
} from '../../src/app/models/index.js';
import type { LessonContentService } from '../../src/app/services/interfaces/LessonContentService.js';
import type { LessonService } from '../../src/app/services/interfaces/LessonService.js';
import type { ProgressService } from '../../src/app/services/interfaces/ProgressService.js';
import { LessonsController } from '../../src/controllers/lessons.js';
import type {
  DIFFICULTY_LEVEL,
  FiltersLesson,
  FiltersLessonContent,
  FiltersProgressContent,
  LEARNING_TECHNIQUE,
  LESSON_CONTENT_TYPE,
  LESSON_TYPE,
  SORT_LESSON,
  SORT_LESSON_CONTENT,
  SORT_PROGRESS_CONTENT,
} from '../../src/utils/index.js';

describe('LessonsController', () => {
  const mockLessonService = mockDeep<LessonService>();
  const mockLessonContentService = mockDeep<LessonContentService>();
  const mockProgressService = mockDeep<ProgressService>();
  let controller: LessonsController;

  beforeEach(() => {
    controller = new LessonsController(
      mockLessonContentService,
      mockLessonService,
      mockProgressService
    );
  });

  afterEach(() => {
    mockReset(mockLessonService);
    mockReset(mockLessonContentService);
    mockReset(mockProgressService);
  });

  it('should call lessonService.getSectionLessons with filters, sort and lightDTO', async () => {
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
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_LESSON[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getSectionLessons(filters, sort, lightDTO);

    expect(mockLessonService.getSectionLessons).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call lessonService.getLessonById with lessonId and lightDTO', async () => {
    const lessonId: string = 'lesson-123';
    const lightDTO: boolean = false;

    await controller.getLessonById(lessonId, lightDTO);

    expect(mockLessonService.getLessonById).toHaveBeenCalledWith(lessonId, lightDTO);
  });

  it('should call lessonService.postSectionLesson with dto and lightDTO', async () => {
    const dto: LessonSectionInDTO = {
      sectionId: 'section-123',
      title: 'Test Lesson',
      description: 'Lesson description',
      order: 1,
      durationMinutes: 30,
      aiGenerated: false,
      generationTaskId: null,
      lessonType: 'VIDEO' as LESSON_TYPE,
      estimatedDifficulty: 3,
    };
    const lightDTO: boolean = true;

    await controller.postSectionLesson(dto, lightDTO);

    expect(mockLessonService.postSectionLesson).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call lessonService.putLesson with lessonId, dto and lightDTO', async () => {
    const lessonId: string = 'lesson-123';
    const dto: Partial<LessonSectionUpdateDTO> = {
      title: 'Updated Lesson',
      durationMinutes: 45,
    };
    const lightDTO: boolean = false;

    await controller.putLesson(lessonId, dto, lightDTO);

    expect(mockLessonService.putLesson).toHaveBeenCalledWith(lessonId, dto, lightDTO);
  });

  it('should call lessonService.deleteLesson with lessonId', async () => {
    const lessonId: string = 'lesson-123';

    await controller.deleteLesson(lessonId);

    expect(mockLessonService.deleteLesson).toHaveBeenCalledWith(lessonId);
  });

  it('should call lessonContentService.getLessonContents with filters, sort and lightDTO', async () => {
    const filters: FiltersLessonContent = {
      lessonId: 'lesson-123',
      parentContentId: null,
      generationLogId: null,
      contentType: null,
      difficultyLevel: null,
      learningTechnique: null,
      active: null,
      aiGenerated: null,
      isCurrentVersion: null,
      versionMin: null,
      versionMax: null,
      orderPreferenceMin: null,
      orderPreferenceMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_LESSON_CONTENT[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getLessonContents(filters, sort, lightDTO);

    expect(mockLessonContentService.getLessonContents).toHaveBeenCalledWith(
      filters,
      sort,
      lightDTO
    );
  });

  it('should call lessonContentService.getLessonContentsById with lessonContentId and lightDTO', async () => {
    const lessonContentId: string = 'content-123';
    const lightDTO: boolean = false;

    await controller.getLessonContentsById(lessonContentId, lightDTO);

    expect(mockLessonContentService.getLessonContentsById).toHaveBeenCalledWith(
      lessonContentId,
      lightDTO
    );
  });

  it('should call lessonContentService.postLessonContents with dto and lightDTO', async () => {
    const dto: ContentLessonInDTO = {
      lessonId: 'lesson-123',
      metadata: {},
      difficultyLevel: 'BEGINNER' as DIFFICULTY_LEVEL,
      learningTechnique: 'VISUAL' as LEARNING_TECHNIQUE,
      orderPreference: 1,
      aiGenerated: false,
      generationLogId: null,
      contentType: 'TEXT' as LESSON_CONTENT_TYPE,
      parentContentId: null,
    };
    const lightDTO: boolean = true;

    await controller.postLessonContents(dto, lightDTO);

    expect(mockLessonContentService.postLessonContents).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call lessonContentService.putLessonContents with lessonContentId, dto and lightDTO', async () => {
    const lessonContentId: string = 'content-123';
    const dto: ContentLessonUpdateDTO = {
      lessonId: 'lesson-123',
      metadata: {},
      difficultyLevel: 'INTERMEDIATE' as DIFFICULTY_LEVEL,
      learningTechnique: 'AUDITORY' as LEARNING_TECHNIQUE,
      orderPreference: 2,
      aiGenerated: true,
      generationLogId: 'log-123',
      contentType: 'VIDEO' as LESSON_CONTENT_TYPE,
      parentContentId: null,
      active: true,
      isCurrentVersion: true,
    };
    const lightDTO: boolean = false;

    await controller.putLessonContents(lessonContentId, dto, lightDTO);

    expect(mockLessonContentService.putLessonContents).toHaveBeenCalledWith(
      lessonContentId,
      dto,
      lightDTO
    );
  });

  it('should call lessonContentService.deleteLessonContents with lessonContentId', async () => {
    const lessonContentId: string = 'content-123';

    await controller.deleteLessonContents(lessonContentId);

    expect(mockLessonContentService.deleteLessonContents).toHaveBeenCalledWith(lessonContentId);
  });

  it('should call progressService.getProgressContent with filters and sort', async () => {
    const filters: FiltersProgressContent = {
      userId: 'user-123',
      lessonContentId: null,
      active: null,
      timeSpendMinutesMin: null,
      timeSpendMinutesMax: null,
      completionPercentageMin: null,
      completionPercentageMax: null,
      effectivinessScoreMin: null,
      effectivinessScoreMax: null,
      userRatingMin: null,
      userRatingMax: null,
      startedAtStart: null,
      startedAtEnd: null,
      completedAtStart: null,
      completedAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_PROGRESS_CONTENT[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'desc',
      sortFields: [],
    };

    await controller.getProgressContent(filters, sort);

    expect(mockProgressService.getProgressContent).toHaveBeenCalledWith(filters, sort);
  });

  it('should call progressService.getProgressById with progressId', async () => {
    const progressId: string = 'progress-123';

    await controller.getProgressById(progressId);

    expect(mockProgressService.getProgressById).toHaveBeenCalledWith(progressId);
  });

  it('should call progressService.postProgressContent with dto', async () => {
    const dto: ProgressContentInDTO = {
      userId: 'user-123',
      lessonContentId: 'content-123',
    };

    await controller.postProgressContent(dto);

    expect(mockProgressService.postProgressContent).toHaveBeenCalledWith(dto);
  });

  it('should call progressService.putProgress with progressId and dto', async () => {
    const progressId: string = 'progress-123';
    const dto: ProgressContentUpdateDTO = {
      userId: 'user-123',
      lessonContentId: 'content-123',
      timeSpendMinutes: 30,
      completionPercentage: 75,
      effectivinessScore: 85,
      active: true,
      userRating: 4,
    };

    await controller.putProgress(progressId, dto);

    expect(mockProgressService.putProgress).toHaveBeenCalledWith(progressId, dto);
  });

  it('should call progressService.deleteProgress with progressId', async () => {
    const progressId: string = 'progress-123';

    await controller.deleteProgress(progressId);

    expect(mockProgressService.deleteProgress).toHaveBeenCalledWith(progressId);
  });
});
