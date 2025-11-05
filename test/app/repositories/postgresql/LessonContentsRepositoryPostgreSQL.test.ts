import {
  DifficultyLevel,
  LearningTechnique,
  LessonContentType,
  type PrismaClient,
} from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  ContentLessonInDTO,
  ContentLessonOutHeavyDTO,
  ContentLessonOutLightDTO,
  ContentLessonUpdateDTO,
  LessonContentsRepository,
} from '../../../../src/app/index.js';
import { LessonContentsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/LessonContentsRepositoryPostgreSQL.js';
import type { FiltersLessonContent, SortingLessonContent } from '../../../../src/utils/index.js';
import { SORT_LESSON_CONTENT } from '../../../../src/utils/index.js';

describe('Lesson Contents Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let lessonContentsRepository: LessonContentsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    lessonContentsRepository = new LessonContentsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(lessonContentsRepository).toBeDefined();
  });

  describe('getLessonContents', () => {
    it('Should return paginated lesson contents with light DTO', async () => {
      const filters: FiltersLessonContent = {
        lessonId: 'lesson_1',
        parentContentId: null,
        generationLogId: null,
        contentType: null,
        difficultyLevel: null,
        learningTechnique: null,
        active: true,
        aiGenerated: null,
        isCurrentVersion: null,
        versionMin: null,
        versionMax: null,
        orderPreferenceMin: null,
        orderPreferenceMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingLessonContent = {
        sortFields: [SORT_LESSON_CONTENT.VERSION],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockContents = [
        {
          id_lesson_content: 'content_1',
          version: 1,
          lesson_id: 'lesson_1',
          active: true,
          is_current_version: true,
          difficulty_level: DifficultyLevel.BEGINNER,
          learning_technique: LearningTechnique.VISUAL,
          order_preference: 1,
          created_at: new Date('2025-01-01'),
          metadata: { type: 'video' },
          ai_generated: false,
          generation_log_id: null,
          content_type: LessonContentType.VIDEO_SCRIPT,
          parent_content_id: null,
        },
      ];

      prismaClient.lessonContents.count.mockResolvedValueOnce(1);
      prismaClient.lessonContents.findMany.mockResolvedValueOnce(mockContents);

      const result = await lessonContentsRepository.getLessonContents(filters, sort, true);

      expect(prismaClient.lessonContents.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return paginated lesson contents with heavy DTO', async () => {
      const filters: FiltersLessonContent = {
        lessonId: null,
        parentContentId: null,
        generationLogId: null,
        contentType: LessonContentType.CODE_EXAMPLE,
        difficultyLevel: DifficultyLevel.INTERMEDIATE,
        learningTechnique: null,
        active: null,
        aiGenerated: true,
        isCurrentVersion: null,
        versionMin: null,
        versionMax: null,
        orderPreferenceMin: null,
        orderPreferenceMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingLessonContent = {
        sortFields: [SORT_LESSON_CONTENT.DIFFICULTY_LEVEL],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockContents = [
        {
          id_lesson_content: 'content_2',
          version: 2,
          lesson_id: 'lesson_2',
          active: true,
          is_current_version: true,
          difficulty_level: DifficultyLevel.INTERMEDIATE,
          learning_technique: LearningTechnique.PROBLEM_SOLVING,
          order_preference: 2,
          created_at: new Date('2025-02-01'),
          metadata: { language: 'javascript' },
          ai_generated: true,
          generation_log_id: 'log_123',
          content_type: LessonContentType.CODE_EXAMPLE,
          parent_content_id: null,
        },
      ];

      prismaClient.lessonContents.count.mockResolvedValueOnce(1);
      prismaClient.lessonContents.findMany.mockResolvedValueOnce(mockContents);

      const result = await lessonContentsRepository.getLessonContents(filters, sort, false);

      expect(prismaClient.lessonContents.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getLessonContentById', () => {
    it('Should return lesson content by id with light DTO', async () => {
      const contentId = 'content_123';
      const version = 1;
      const lessonId = 'lesson_456';
      const active = true;
      const isCurrentVersion = true;
      const difficultyLevel = DifficultyLevel.BEGINNER;
      const learningTechnique = LearningTechnique.VISUAL;
      const orderPreference = 1;
      const createdAt = new Date('2025-03-01');

      const expectedOutput: ContentLessonOutLightDTO = {
        idLessonContent: contentId,
        version,
        lessonId,
        active,
        isCurrentVersion,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        createdAt,
      };

      prismaClient.lessonContents.findUniqueOrThrow.mockResolvedValueOnce({
        id_lesson_content: contentId,
        version,
        lesson_id: lessonId,
        active,
        is_current_version: isCurrentVersion,
        difficulty_level: difficultyLevel,
        learning_technique: learningTechnique,
        order_preference: orderPreference,
        created_at: createdAt,
        metadata: { type: 'text' },
        ai_generated: false,
        generation_log_id: null,
        content_type: LessonContentType.TEXT,
        parent_content_id: null,
      });

      const result = await lessonContentsRepository.getLessonContentById(contentId, true);

      expect(prismaClient.lessonContents.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return lesson content by id with heavy DTO', async () => {
      const contentId = 'content_789';
      const version = 3;
      const lessonId = 'lesson_999';
      const active = true;
      const isCurrentVersion = true;
      const difficultyLevel = DifficultyLevel.ADVANCED;
      const learningTechnique = LearningTechnique.CASE_STUDY;
      const orderPreference = 5;
      const createdAt = new Date('2025-04-01');
      const metadata = { complexity: 'high' };
      const aiGenerated = true;
      const generationLogId = 'log_ai_456';
      const contentType = LessonContentType.CASE_STUDY;
      const parentContentId = 'parent_123';

      const expectedOutput: ContentLessonOutHeavyDTO = {
        idLessonContent: contentId,
        version,
        lessonId,
        active,
        isCurrentVersion,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        createdAt,
        metadata,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      prismaClient.lessonContents.findUniqueOrThrow.mockResolvedValueOnce({
        id_lesson_content: contentId,
        version,
        lesson_id: lessonId,
        active,
        is_current_version: isCurrentVersion,
        difficulty_level: difficultyLevel,
        learning_technique: learningTechnique,
        order_preference: orderPreference,
        created_at: createdAt,
        metadata,
        ai_generated: aiGenerated,
        generation_log_id: generationLogId,
        content_type: contentType,
        parent_content_id: parentContentId,
      });

      const result = await lessonContentsRepository.getLessonContentById(contentId, false);

      expect(prismaClient.lessonContents.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when lesson content not found', async () => {
      const contentId = 'non_existent_content';

      prismaClient.lessonContents.findUnique.mockResolvedValueOnce(null);

      await expect(
        lessonContentsRepository.getLessonContentById(contentId, true)
      ).rejects.toThrow();
    });
  });

  describe('createLessonContent', () => {
    it('Should create a new lesson content with light DTO', async () => {
      const lessonId = 'lesson_new';
      const metadata = { format: 'markdown' };
      const difficultyLevel = DifficultyLevel.BEGINNER;
      const learningTechnique = LearningTechnique.READING_WRITING;
      const orderPreference = 1;
      const aiGenerated = false;
      const generationLogId = null;
      const contentType = LessonContentType.TEXT;
      const parentContentId = null;

      const inputContent: ContentLessonInDTO = {
        lessonId,
        metadata,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      const expectedOutput: ContentLessonOutLightDTO = {
        idLessonContent: 'new_content_id',
        version: 1,
        lessonId,
        active: false,
        isCurrentVersion: true,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        createdAt: new Date('2025-05-01'),
      };

      prismaClient.lessonContents.create.mockResolvedValueOnce({
        id_lesson_content: 'new_content_id',
        version: 1,
        lesson_id: lessonId,
        active: false,
        is_current_version: true,
        difficulty_level: difficultyLevel,
        learning_technique: learningTechnique,
        order_preference: orderPreference,
        created_at: new Date('2025-05-01'),
        metadata,
        ai_generated: aiGenerated,
        generation_log_id: generationLogId,
        content_type: contentType,
        parent_content_id: parentContentId,
      });

      const result = await lessonContentsRepository.createLessonContent(inputContent, true);

      expect(prismaClient.lessonContents.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a new lesson content with heavy DTO', async () => {
      const lessonId = 'lesson_ai';
      const metadata = { aiModel: 'gpt-4' };
      const difficultyLevel = DifficultyLevel.INTERMEDIATE;
      const learningTechnique = LearningTechnique.GAMIFICATION;
      const orderPreference = 3;
      const aiGenerated = true;
      const generationLogId = 'log_new_789';
      const contentType = LessonContentType.INTERACTIVE;
      const parentContentId = 'parent_456';

      const inputContent: ContentLessonInDTO = {
        lessonId,
        metadata,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      const expectedOutput: ContentLessonOutHeavyDTO = {
        idLessonContent: 'new_ai_content_id',
        version: 1,
        lessonId,
        active: false,
        isCurrentVersion: true,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        createdAt: new Date('2025-05-01'),
        metadata,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      prismaClient.lessonContents.create.mockResolvedValueOnce({
        id_lesson_content: 'new_ai_content_id',
        version: 1,
        lesson_id: lessonId,
        active: false,
        is_current_version: true,
        difficulty_level: difficultyLevel,
        learning_technique: learningTechnique,
        order_preference: orderPreference,
        created_at: new Date('2025-05-01'),
        metadata,
        ai_generated: aiGenerated,
        generation_log_id: generationLogId,
        content_type: contentType,
        parent_content_id: parentContentId,
      });

      const result = await lessonContentsRepository.createLessonContent(inputContent, false);

      expect(prismaClient.lessonContents.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('updateLessonContent', () => {
    it('Should update an existing lesson content with light DTO', async () => {
      const contentId = 'content_to_update';
      const lessonId = 'lesson_updated';
      const metadata = { updated: true };
      const difficultyLevel = DifficultyLevel.INTERMEDIATE;
      const learningTechnique = LearningTechnique.VISUAL;
      const orderPreference = 2;
      const active = true;
      const isCurrentVersion = true;
      const aiGenerated = false;
      const generationLogId = null;
      const contentType = LessonContentType.VIDEO_SCRIPT;
      const parentContentId = null;

      const updateDTO: Partial<ContentLessonUpdateDTO> = {
        lessonId,
        metadata,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        active,
        isCurrentVersion,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      const expectedOutput: ContentLessonOutLightDTO = {
        idLessonContent: contentId,
        version: 2,
        lessonId,
        active,
        isCurrentVersion,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        createdAt: new Date('2025-01-01'),
      };

      prismaClient.lessonContents.update.mockResolvedValueOnce({
        id_lesson_content: contentId,
        version: 2,
        lesson_id: lessonId,
        active,
        is_current_version: isCurrentVersion,
        difficulty_level: difficultyLevel,
        learning_technique: learningTechnique,
        order_preference: orderPreference,
        created_at: new Date('2025-01-01'),
        metadata,
        ai_generated: aiGenerated,
        generation_log_id: generationLogId,
        content_type: contentType,
        parent_content_id: parentContentId,
      });

      const result = await lessonContentsRepository.updateLessonContent(contentId, updateDTO, true);

      expect(prismaClient.lessonContents.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update an existing lesson content with heavy DTO', async () => {
      const contentId = 'content_full_update';
      const lessonId = 'lesson_full';
      const metadata = { fully: 'updated' };
      const difficultyLevel = DifficultyLevel.EXPERT;
      const learningTechnique = LearningTechnique.COLLABORATIVE;
      const orderPreference = 10;
      const active = true;
      const isCurrentVersion = false;
      const aiGenerated = true;
      const generationLogId = 'log_updated_123';
      const contentType = LessonContentType.EXERCISE;
      const parentContentId = 'parent_789';

      const updateDTO: Partial<ContentLessonUpdateDTO> = {
        lessonId,
        metadata,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        active,
        isCurrentVersion,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      const expectedOutput: ContentLessonOutHeavyDTO = {
        idLessonContent: contentId,
        version: 5,
        lessonId,
        active,
        isCurrentVersion,
        difficultyLevel,
        learningTechnique,
        orderPreference,
        createdAt: new Date('2025-01-01'),
        metadata,
        aiGenerated,
        generationLogId,
        contentType,
        parentContentId,
      };

      prismaClient.lessonContents.update.mockResolvedValueOnce({
        id_lesson_content: contentId,
        version: 5,
        lesson_id: lessonId,
        active,
        is_current_version: isCurrentVersion,
        difficulty_level: difficultyLevel,
        learning_technique: learningTechnique,
        order_preference: orderPreference,
        created_at: new Date('2025-01-01'),
        metadata,
        ai_generated: aiGenerated,
        generation_log_id: generationLogId,
        content_type: contentType,
        parent_content_id: parentContentId,
      });

      const result = await lessonContentsRepository.updateLessonContent(
        contentId,
        updateDTO,
        false
      );

      expect(prismaClient.lessonContents.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update only some fields of lesson content', async () => {
      const contentId = 'content_partial_update';
      const partialDTO: Partial<ContentLessonUpdateDTO> = {
        active: false,
        difficultyLevel: DifficultyLevel.ADVANCED,
        orderPreference: 5,
      };

      const expectedOutput: ContentLessonOutHeavyDTO = {
        idLessonContent: contentId,
        version: 3,
        lessonId: 'lesson_original',
        active: false,
        isCurrentVersion: true,
        difficultyLevel: DifficultyLevel.ADVANCED,
        learningTechnique: LearningTechnique.VISUAL,
        orderPreference: 5,
        createdAt: new Date('2025-01-15'),
        metadata: { original: true },
        aiGenerated: false,
        generationLogId: null,
        contentType: LessonContentType.TEXT,
        parentContentId: null,
      };

      prismaClient.lessonContents.update.mockResolvedValueOnce({
        id_lesson_content: contentId,
        version: 3,
        lesson_id: 'lesson_original',
        active: false,
        is_current_version: true,
        difficulty_level: DifficultyLevel.ADVANCED,
        learning_technique: LearningTechnique.VISUAL,
        order_preference: 5,
        created_at: new Date('2025-01-15'),
        metadata: { original: true },
        ai_generated: false,
        generation_log_id: null,
        content_type: LessonContentType.TEXT,
        parent_content_id: null,
      });

      const result = await lessonContentsRepository.updateLessonContent(
        contentId,
        partialDTO,
        false
      );

      expect(prismaClient.lessonContents.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to update non-existent lesson content', async () => {
      const contentId = 'non_existent_content';
      const updateDTO: Partial<ContentLessonUpdateDTO> = {
        lessonId: 'lesson_1',
        metadata: {},
        difficultyLevel: DifficultyLevel.BEGINNER,
        learningTechnique: LearningTechnique.VISUAL,
        orderPreference: 1,
        active: true,
        isCurrentVersion: true,
        aiGenerated: false,
        generationLogId: null,
        contentType: LessonContentType.TEXT,
        parentContentId: null,
      };

      prismaClient.lessonContents.findUnique.mockResolvedValueOnce(null);

      await expect(
        lessonContentsRepository.updateLessonContent(contentId, updateDTO, true)
      ).rejects.toThrow();
    });
  });

  describe('deleteLessonContentById', () => {
    it('Should delete a lesson content by id', async () => {
      const contentId = 'content_to_delete';

      prismaClient.lessonContents.delete.mockResolvedValueOnce({
        id_lesson_content: contentId,
        version: 1,
        lesson_id: 'lesson_1',
        active: false,
        is_current_version: true,
        difficulty_level: DifficultyLevel.BEGINNER,
        learning_technique: LearningTechnique.VISUAL,
        order_preference: 1,
        created_at: new Date(),
        metadata: {},
        ai_generated: false,
        generation_log_id: null,
        content_type: LessonContentType.TEXT,
        parent_content_id: null,
      });

      await lessonContentsRepository.deleteLessonContentById(contentId);

      expect(prismaClient.lessonContents.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent lesson content', async () => {
      const contentId = 'non_existent_content';

      prismaClient.lessonContents.findUnique.mockResolvedValueOnce(null);

      await expect(lessonContentsRepository.deleteLessonContentById(contentId)).rejects.toThrow();
    });
  });
});
