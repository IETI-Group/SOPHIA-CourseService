import { LessonType, type PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  LessonSectionInDTO,
  LessonSectionOutHeavyDTO,
  LessonSectionOutLightDTO,
  LessonSectionUpdateDTO,
  LessonsRepository,
} from '../../../../src/app/index.js';
import { LessonsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/LessonsRepositoryPostgreSQL.js';
import type { FiltersLesson, SortingLessons } from '../../../../src/utils/index.js';
import { SORT_LESSON } from '../../../../src/utils/index.js';

describe('Lessons Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let lessonsRepository: LessonsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    lessonsRepository = new LessonsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(lessonsRepository).toBeDefined();
  });

  describe('getLessons', () => {
    it('Should return paginated lessons with light DTO', async () => {
      const filters: FiltersLesson = {
        sectionId: 'section_1',
        generationTaskId: null,
        title: null,
        lessonType: null,
        active: true,
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
        sortFields: [SORT_LESSON.ORDER],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockLessons = [
        {
          id_lesson: 'lesson_1',
          section_id: 'section_1',
          title: 'Introduction to Programming',
          description: 'Learn programming basics',
          active: true,
          order: 1,
          created_at: new Date('2025-01-01'),
          duration_minutes: 30,
          ai_generated: false,
          generation_task_id: null,
          lesson_type: LessonType.THEORY,
          estimated_difficulty: 2.5,
        },
      ];

      prismaClient.lessons.count.mockResolvedValueOnce(1);
      prismaClient.lessons.findMany.mockResolvedValueOnce(mockLessons);

      const result = await lessonsRepository.getLessons(filters, sort, true);

      expect(prismaClient.lessons.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return paginated lessons with heavy DTO', async () => {
      const filters: FiltersLesson = {
        sectionId: null,
        generationTaskId: null,
        title: 'Advanced',
        lessonType: LessonType.PRACTICE,
        active: null,
        aiGenerated: true,
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
        sortFields: [SORT_LESSON.DURATION_MINUTES],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockLessons = [
        {
          id_lesson: 'lesson_2',
          section_id: 'section_2',
          title: 'Advanced Topics',
          description: 'Advanced lesson content',
          active: true,
          order: 2,
          created_at: new Date('2025-02-01'),
          duration_minutes: 60,
          ai_generated: true,
          generation_task_id: 'task_123',
          lesson_type: LessonType.PRACTICE,
          estimated_difficulty: 4.0,
        },
      ];

      prismaClient.lessons.count.mockResolvedValueOnce(1);
      prismaClient.lessons.findMany.mockResolvedValueOnce(mockLessons);

      const result = await lessonsRepository.getLessons(filters, sort, false);

      expect(prismaClient.lessons.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getLessonById', () => {
    it('Should return lesson by id with light DTO', async () => {
      const lessonId = 'lesson_123';
      const sectionId = 'section_456';
      const title = 'Getting Started';
      const active = true;
      const createdAt = new Date('2025-03-01');
      const order = 1;
      const durationMinutes = 45;
      const lessonType = LessonType.THEORY;

      const expectedOutput: LessonSectionOutLightDTO = {
        idLesson: lessonId,
        active,
        createdAt,
        sectionId,
        title,
        order,
        durationMinutes,
        lessonType,
      };

      prismaClient.lessons.findUniqueOrThrow.mockResolvedValueOnce({
        id_lesson: lessonId,
        section_id: sectionId,
        title,
        description: 'Some description',
        active,
        order,
        created_at: createdAt,
        duration_minutes: durationMinutes,
        ai_generated: false,
        generation_task_id: null,
        lesson_type: lessonType,
        estimated_difficulty: 2.0,
      });

      const result = await lessonsRepository.getLessonById(lessonId, true);

      expect(prismaClient.lessons.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return lesson by id with heavy DTO', async () => {
      const lessonId = 'lesson_789';
      const sectionId = 'section_999';
      const title = 'AI Generated Lesson';
      const description = 'Complete lesson content';
      const active = true;
      const createdAt = new Date('2025-04-01');
      const order = 3;
      const durationMinutes = 90;
      const aiGenerated = true;
      const generationTaskId = 'task_ai_456';
      const lessonType = LessonType.MIXED;
      const estimatedDifficulty = 3.5;

      const expectedOutput: LessonSectionOutHeavyDTO = {
        idLesson: lessonId,
        active,
        createdAt,
        sectionId,
        title,
        order,
        durationMinutes,
        lessonType,
        description,
        aiGenerated,
        generationTaskId,
        estimatedDifficulty,
      };

      prismaClient.lessons.findUniqueOrThrow.mockResolvedValueOnce({
        id_lesson: lessonId,
        section_id: sectionId,
        title,
        description,
        active,
        order,
        created_at: createdAt,
        duration_minutes: durationMinutes,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        lesson_type: lessonType,
        estimated_difficulty: estimatedDifficulty,
      });

      const result = await lessonsRepository.getLessonById(lessonId, false);

      expect(prismaClient.lessons.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when lesson not found', async () => {
      const lessonId = 'non_existent_lesson';

      prismaClient.lessons.findUnique.mockResolvedValueOnce(null);

      await expect(lessonsRepository.getLessonById(lessonId, true)).rejects.toThrow();
    });
  });

  describe('createLesson', () => {
    it('Should create a new lesson with light DTO', async () => {
      const sectionId = 'section_new';
      const title = 'New Lesson';
      const description = 'New lesson description';
      const order = 1;
      const durationMinutes = 30;
      const aiGenerated = false;
      const generationTaskId = null;
      const lessonType = LessonType.THEORY;
      const estimatedDifficulty = 2.0;

      const inputLesson: LessonSectionInDTO = {
        sectionId,
        title,
        description,
        order,
        durationMinutes,
        aiGenerated,
        generationTaskId,
        lessonType,
        estimatedDifficulty,
      };

      const expectedOutput: LessonSectionOutLightDTO = {
        idLesson: 'new_lesson_id',
        active: false,
        createdAt: new Date('2025-05-01'),
        sectionId,
        title,
        order,
        durationMinutes,
        lessonType,
      };

      prismaClient.lessons.create.mockResolvedValueOnce({
        id_lesson: 'new_lesson_id',
        section_id: sectionId,
        title,
        description,
        active: false,
        order,
        created_at: new Date('2025-05-01'),
        duration_minutes: durationMinutes,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        lesson_type: lessonType,
        estimated_difficulty: estimatedDifficulty,
      });

      const result = await lessonsRepository.createLesson(inputLesson, true);

      expect(prismaClient.lessons.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a new lesson with heavy DTO', async () => {
      const sectionId = 'section_ai';
      const title = 'AI Generated Lesson';
      const description = 'AI created content';
      const order = 2;
      const durationMinutes = 60;
      const aiGenerated = true;
      const generationTaskId = 'task_new_789';
      const lessonType = LessonType.PRACTICE;
      const estimatedDifficulty = 3.0;

      const inputLesson: LessonSectionInDTO = {
        sectionId,
        title,
        description,
        order,
        durationMinutes,
        aiGenerated,
        generationTaskId,
        lessonType,
        estimatedDifficulty,
      };

      const expectedOutput: LessonSectionOutHeavyDTO = {
        idLesson: 'new_ai_lesson_id',
        active: false,
        createdAt: new Date('2025-05-01'),
        sectionId,
        title,
        order,
        durationMinutes,
        lessonType,
        description,
        aiGenerated,
        generationTaskId,
        estimatedDifficulty,
      };

      prismaClient.lessons.create.mockResolvedValueOnce({
        id_lesson: 'new_ai_lesson_id',
        section_id: sectionId,
        title,
        description,
        active: false,
        order,
        created_at: new Date('2025-05-01'),
        duration_minutes: durationMinutes,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        lesson_type: lessonType,
        estimated_difficulty: estimatedDifficulty,
      });

      const result = await lessonsRepository.createLesson(inputLesson, false);

      expect(prismaClient.lessons.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('updateLesson', () => {
    it('Should update an existing lesson with light DTO', async () => {
      const lessonId = 'lesson_to_update';
      const sectionId = 'section_updated';
      const title = 'Updated Lesson Title';
      const description = 'Updated description';
      const order = 5;
      const durationMinutes = 45;
      const active = true;
      const aiGenerated = false;
      const generationTaskId = null;
      const lessonType = LessonType.THEORY;
      const estimatedDifficulty = 2.5;

      const updateDTO: Partial<LessonSectionUpdateDTO> = {
        sectionId,
        title,
        description,
        order,
        durationMinutes,
        active,
        aiGenerated,
        generationTaskId,
        lessonType,
        estimatedDifficulty,
      };

      const expectedOutput: LessonSectionOutLightDTO = {
        idLesson: lessonId,
        active,
        createdAt: new Date('2025-01-01'),
        sectionId,
        title,
        order,
        durationMinutes,
        lessonType,
      };

      prismaClient.lessons.update.mockResolvedValueOnce({
        id_lesson: lessonId,
        section_id: sectionId,
        title,
        description,
        active,
        order,
        created_at: new Date('2025-01-01'),
        duration_minutes: durationMinutes,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        lesson_type: lessonType,
        estimated_difficulty: estimatedDifficulty,
      });

      const result = await lessonsRepository.updateLesson(lessonId, updateDTO, true);

      expect(prismaClient.lessons.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update an existing lesson with heavy DTO', async () => {
      const lessonId = 'lesson_full_update';
      const sectionId = 'section_full';
      const title = 'Complete Updated Lesson';
      const description = 'Fully updated content';
      const order = 8;
      const durationMinutes = 120;
      const active = true;
      const aiGenerated = true;
      const generationTaskId = 'task_updated_123';
      const lessonType = LessonType.PROJECT;
      const estimatedDifficulty = 4.5;

      const updateDTO: Partial<LessonSectionUpdateDTO> = {
        sectionId,
        title,
        description,
        order,
        durationMinutes,
        active,
        aiGenerated,
        generationTaskId,
        lessonType,
        estimatedDifficulty,
      };

      const expectedOutput: LessonSectionOutHeavyDTO = {
        idLesson: lessonId,
        active,
        createdAt: new Date('2025-01-01'),
        sectionId,
        title,
        order,
        durationMinutes,
        lessonType,
        description,
        aiGenerated,
        generationTaskId,
        estimatedDifficulty,
      };

      prismaClient.lessons.update.mockResolvedValueOnce({
        id_lesson: lessonId,
        section_id: sectionId,
        title,
        description,
        active,
        order,
        created_at: new Date('2025-01-01'),
        duration_minutes: durationMinutes,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        lesson_type: lessonType,
        estimated_difficulty: estimatedDifficulty,
      });

      const result = await lessonsRepository.updateLesson(lessonId, updateDTO, false);

      expect(prismaClient.lessons.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update only some fields of a lesson', async () => {
      const lessonId = 'lesson_partial_update';
      const partialDTO: Partial<LessonSectionUpdateDTO> = {
        title: 'Updated Title Only',
        active: false,
        order: 3,
      };

      const expectedOutput: LessonSectionOutLightDTO = {
        idLesson: lessonId,
        active: false,
        createdAt: new Date('2025-01-10'),
        sectionId: 'section_original',
        title: 'Updated Title Only',
        order: 3,
        durationMinutes: 30,
        lessonType: LessonType.THEORY,
      };

      prismaClient.lessons.update.mockResolvedValueOnce({
        id_lesson: lessonId,
        section_id: 'section_original',
        title: 'Updated Title Only',
        description: 'Original description',
        active: false,
        order: 3,
        created_at: new Date('2025-01-10'),
        duration_minutes: 30,
        ai_generated: false,
        generation_task_id: null,
        lesson_type: LessonType.THEORY,
        estimated_difficulty: 2.0,
      });

      const result = await lessonsRepository.updateLesson(lessonId, partialDTO, true);

      expect(prismaClient.lessons.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to update non-existent lesson', async () => {
      const lessonId = 'non_existent_lesson';
      const updateDTO: Partial<LessonSectionUpdateDTO> = {
        sectionId: 'section_1',
        title: 'Test',
        description: 'Test',
        order: 1,
        durationMinutes: 30,
        active: true,
        aiGenerated: false,
        generationTaskId: null,
        lessonType: LessonType.THEORY,
        estimatedDifficulty: 2.0,
      };

      prismaClient.lessons.findUnique.mockResolvedValueOnce(null);

      await expect(lessonsRepository.updateLesson(lessonId, updateDTO, true)).rejects.toThrow();
    });
  });

  describe('deleteLessonById', () => {
    it('Should delete a lesson by id', async () => {
      const lessonId = 'lesson_to_delete';

      prismaClient.lessons.delete.mockResolvedValueOnce({
        id_lesson: lessonId,
        section_id: 'section_1',
        title: 'Deleted Lesson',
        description: 'Deleted',
        active: false,
        order: 1,
        created_at: new Date(),
        duration_minutes: 30,
        ai_generated: false,
        generation_task_id: null,
        lesson_type: LessonType.THEORY,
        estimated_difficulty: 2.0,
      });

      await lessonsRepository.deleteLessonById(lessonId);

      expect(prismaClient.lessons.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent lesson', async () => {
      const lessonId = 'non_existent_lesson';

      prismaClient.lessons.findUnique.mockResolvedValueOnce(null);

      await expect(lessonsRepository.deleteLessonById(lessonId)).rejects.toThrow();
    });
  });
});
