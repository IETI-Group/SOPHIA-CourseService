import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  AISpecsLessonInDTO,
  AISpecsLessonOutHeavyDTO,
  AISpecsLessonOutLightDTO,
  AISpecsLessonRepository,
} from '../../../../src/app/index.js';
import { AISpecsLessonRepositoryPostgreSQL } from '../../../../src/app/index.js';
import {
  type FiltersAISpecsLesson,
  SORT_AI_SPECS_LESSON,
  type SortingAILessonSpecs,
} from '../../../../src/utils/index.js';

describe('AI Specs Lesson Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let aiSpecsLessonRepository: AISpecsLessonRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    aiSpecsLessonRepository = new AISpecsLessonRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(aiSpecsLessonRepository).toBeDefined();
  });

  describe('getAISpecs', () => {
    it('Should return paginated AI specs with light DTO', async () => {
      const filters: FiltersAISpecsLesson = {
        lessonContentId: 'lesson_1',
        generationPromptSummary: null,
        estimatedVideoDurationMin: null,
        estimatedVideoDurationMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingAILessonSpecs = {
        sortFields: [SORT_AI_SPECS_LESSON.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockAISpecs = [
        {
          id_lesson_spec: 'spec_1',
          created_at: new Date('2025-01-01'),
          lesson_content_id: 'lesson_1',
          generation_prompt_summary: 'Prompt 1',
          content_structure: { intro: 'test' },
          estimated_video_duration_mins: 5,
          video_script: null,
          video_generation_instructions: null,
          interactive_elements: null,
          exercise_parameters: null,
        },
      ];

      prismaClient.lessonAISpecs.count.mockResolvedValueOnce(1);
      prismaClient.lessonAISpecs.findMany.mockResolvedValueOnce(mockAISpecs);

      const result = await aiSpecsLessonRepository.getAISpecs(filters, sort, true);

      expect(prismaClient.lessonAISpecs.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });

    it('Should return paginated AI specs with heavy DTO', async () => {
      const filters: FiltersAISpecsLesson = {
        lessonContentId: null,
        generationPromptSummary: null,
        estimatedVideoDurationMin: null,
        estimatedVideoDurationMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingAILessonSpecs = {
        sortFields: [SORT_AI_SPECS_LESSON.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockAISpecs = [
        {
          id_lesson_spec: 'spec_2',
          created_at: new Date('2025-01-02'),
          lesson_content_id: 'lesson_2',
          generation_prompt_summary: 'Prompt 2',
          content_structure: { intro: 'test' },
          estimated_video_duration_mins: 10,
          video_script: 'Script content',
          video_generation_instructions: { instruction: 'test' },
          interactive_elements: { elements: [] },
          exercise_parameters: { params: {} },
        },
      ];

      prismaClient.lessonAISpecs.count.mockResolvedValueOnce(1);
      prismaClient.lessonAISpecs.findMany.mockResolvedValueOnce(mockAISpecs);

      const result = await aiSpecsLessonRepository.getAISpecs(filters, sort, false);

      expect(prismaClient.lessonAISpecs.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
    });
  });

  describe('getAISpecById', () => {
    it('Should return AI spec by id with light DTO', async () => {
      const aiSpecId = 'spec_123';
      const createdAt = new Date('2025-01-15');
      const lessonContentId = 'lesson_456';
      const generationPromptSummary = 'Generate cybersecurity content';
      const contentStructure = { intro: 'Introduction', main: 'Main content' };
      const estimatedVideoDurationMinutes = 8;

      const expectedOutput: AISpecsLessonOutLightDTO = {
        idLessonSpec: aiSpecId,
        createdAt,
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
      };

      prismaClient.lessonAISpecs.findUniqueOrThrow.mockResolvedValueOnce({
        id_lesson_spec: aiSpecId,
        created_at: createdAt,
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: 'Some script',
        video_generation_instructions: { test: 'data' },
        interactive_elements: null,
        exercise_parameters: null,
      });

      const result = await aiSpecsLessonRepository.getAISpecById(aiSpecId, true);

      expect(prismaClient.lessonAISpecs.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return AI spec by id with heavy DTO', async () => {
      const aiSpecId = 'spec_789';
      const createdAt = new Date('2025-02-01');
      const lessonContentId = 'lesson_999';
      const generationPromptSummary = 'Generate AI content';
      const contentStructure = { sections: ['s1', 's2'] };
      const estimatedVideoDurationMinutes = 12;
      const videoScript = 'Complete video script';
      const videoGenerationInstructions = { steps: [1, 2, 3] };
      const interactiveElements = { quiz: true };
      const exerciseParameters = { difficulty: 'medium' };

      const expectedOutput: AISpecsLessonOutHeavyDTO = {
        idLessonSpec: aiSpecId,
        createdAt,
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript,
        videoGenerationInstructions,
        interactiveElements,
        exerciseParameters,
      };

      prismaClient.lessonAISpecs.findUniqueOrThrow.mockResolvedValueOnce({
        id_lesson_spec: aiSpecId,
        created_at: createdAt,
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: videoScript,
        video_generation_instructions: videoGenerationInstructions,
        interactive_elements: interactiveElements,
        exercise_parameters: exerciseParameters,
      });

      const result = await aiSpecsLessonRepository.getAISpecById(aiSpecId, false);

      expect(prismaClient.lessonAISpecs.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when AI spec not found', async () => {
      const aiSpecId = 'non_existent_spec';

      prismaClient.lessonAISpecs.findUnique.mockResolvedValueOnce(null);

      await expect(aiSpecsLessonRepository.getAISpecById(aiSpecId, true)).rejects.toThrow();
    });
  });

  describe('createAISpec', () => {
    it('Should create a new AI Spec with light DTO', async () => {
      const lessonContentId = 'lesson_new';
      const generationPromptSummary = 'Generate programming content';
      const contentStructure = {
        intro: { text: 'Introduction to programming' },
        main: { text: 'Core concepts', time_seconds: 150 },
        end: { text: 'Summary and next steps' },
      };
      const estimatedVideoDurationMinutes = 6;

      const inputAISpec: AISpecsLessonInDTO = {
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript: null,
        videoGenerationInstructions: {
          stages: ['creation', 'editing', 'review'],
        },
        interactiveElements: null,
        exerciseParameters: null,
      };

      const expectedOutput: AISpecsLessonOutLightDTO = {
        idLessonSpec: 'new_spec_id',
        createdAt: new Date('2025-03-01'),
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
      };

      prismaClient.lessonAISpecs.create.mockResolvedValueOnce({
        id_lesson_spec: 'new_spec_id',
        created_at: new Date('2025-03-01'),
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: null,
        video_generation_instructions: { stages: ['creation', 'editing', 'review'] },
        interactive_elements: null,
        exercise_parameters: null,
      });

      const result = await aiSpecsLessonRepository.createAISpec(inputAISpec, true);

      expect(prismaClient.lessonAISpecs.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a new AI Spec with heavy DTO', async () => {
      const lessonContentId = 'lesson_full';
      const generationPromptSummary = 'Full AI content generation';
      const contentStructure = { full: true };
      const estimatedVideoDurationMinutes = 15;
      const videoScript = 'Full script text';
      const videoGenerationInstructions = { ai_model: 'gpt-4' };
      const interactiveElements = { quizzes: [1, 2, 3] };
      const exerciseParameters = { type: 'coding' };

      const inputAISpec: AISpecsLessonInDTO = {
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript,
        videoGenerationInstructions,
        interactiveElements,
        exerciseParameters,
      };

      const expectedOutput: AISpecsLessonOutHeavyDTO = {
        idLessonSpec: 'full_spec_id',
        createdAt: new Date('2025-03-05'),
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript,
        videoGenerationInstructions,
        interactiveElements,
        exerciseParameters,
      };

      prismaClient.lessonAISpecs.create.mockResolvedValueOnce({
        id_lesson_spec: 'full_spec_id',
        created_at: new Date('2025-03-05'),
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: videoScript,
        video_generation_instructions: videoGenerationInstructions,
        interactive_elements: interactiveElements,
        exercise_parameters: exerciseParameters,
      });

      const result = await aiSpecsLessonRepository.createAISpec(inputAISpec, false);

      expect(prismaClient.lessonAISpecs.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to create duplicate AI spec', async () => {
      const lessonContentId = 'lesson_duplicate';
      const generationPromptSummary = 'Duplicate content';
      const contentStructure = { test: true };
      const estimatedVideoDurationMinutes = 5;

      const inputAISpec: AISpecsLessonInDTO = {
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript: null,
        videoGenerationInstructions: null,
        interactiveElements: null,
        exerciseParameters: null,
      };

      prismaClient.lessonAISpecs.findFirst.mockResolvedValueOnce({
        id_lesson_spec: 'existing_spec',
        created_at: new Date(),
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: null,
        video_generation_instructions: null,
        interactive_elements: null,
        exercise_parameters: null,
      });

      await expect(aiSpecsLessonRepository.createAISpec(inputAISpec, true)).rejects.toThrow();
    });
  });

  describe('updateAISpec', () => {
    it('Should update an existing AI Spec with light DTO', async () => {
      const aiSpecId = 'spec_to_update';
      const lessonContentId = 'lesson_updated';
      const generationPromptSummary = 'Updated prompt';
      const contentStructure = { updated: true };
      const estimatedVideoDurationMinutes = 20;

      const updateDTO: AISpecsLessonInDTO = {
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript: null,
        videoGenerationInstructions: { updated: true },
        interactiveElements: null,
        exerciseParameters: null,
      };

      const expectedOutput: AISpecsLessonOutLightDTO = {
        idLessonSpec: aiSpecId,
        createdAt: new Date('2025-04-01'),
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
      };

      prismaClient.lessonAISpecs.update.mockResolvedValueOnce({
        id_lesson_spec: aiSpecId,
        created_at: new Date('2025-04-01'),
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: null,
        video_generation_instructions: { updated: true },
        interactive_elements: null,
        exercise_parameters: null,
      });

      const result = await aiSpecsLessonRepository.updateAISpec(aiSpecId, updateDTO, true);

      expect(prismaClient.lessonAISpecs.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update an existing AI Spec with heavy DTO', async () => {
      const aiSpecId = 'spec_full_update';
      const lessonContentId = 'lesson_full_updated';
      const generationPromptSummary = 'Complete update';
      const contentStructure = { complete: true };
      const estimatedVideoDurationMinutes = 25;
      const videoScript = 'Updated script';
      const videoGenerationInstructions = { model: 'updated' };
      const interactiveElements = { new_quiz: true };
      const exerciseParameters = { level: 'advanced' };

      const updateDTO: AISpecsLessonInDTO = {
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript,
        videoGenerationInstructions,
        interactiveElements,
        exerciseParameters,
      };

      const expectedOutput: AISpecsLessonOutHeavyDTO = {
        idLessonSpec: aiSpecId,
        createdAt: new Date('2025-04-10'),
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript,
        videoGenerationInstructions,
        interactiveElements,
        exerciseParameters,
      };

      prismaClient.lessonAISpecs.update.mockResolvedValueOnce({
        id_lesson_spec: aiSpecId,
        created_at: new Date('2025-04-10'),
        lesson_content_id: lessonContentId,
        generation_prompt_summary: generationPromptSummary,
        content_structure: contentStructure,
        estimated_video_duration_mins: estimatedVideoDurationMinutes,
        video_script: videoScript,
        video_generation_instructions: videoGenerationInstructions,
        interactive_elements: interactiveElements,
        exercise_parameters: exerciseParameters,
      });

      const result = await aiSpecsLessonRepository.updateAISpec(aiSpecId, updateDTO, false);

      expect(prismaClient.lessonAISpecs.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to update non-existent AI spec', async () => {
      const aiSpecId = 'non_existent_spec';
      const lessonContentId = 'lesson_update';
      const generationPromptSummary = 'Update content';
      const contentStructure = { test: true };
      const estimatedVideoDurationMinutes = 10;

      const updateDTO: AISpecsLessonInDTO = {
        lessonContentId,
        generationPromptSummary,
        contentStructure,
        estimatedVideoDurationMinutes,
        videoScript: null,
        videoGenerationInstructions: null,
        interactiveElements: null,
        exerciseParameters: null,
      };

      prismaClient.lessonAISpecs.findUnique.mockResolvedValueOnce(null);

      await expect(
        aiSpecsLessonRepository.updateAISpec(aiSpecId, updateDTO, true)
      ).rejects.toThrow();
    });
  });

  describe('deleteAISpecById', () => {
    it('Should delete an AI Spec by id', async () => {
      const aiSpecId = 'spec_to_delete';

      prismaClient.lessonAISpecs.delete.mockResolvedValueOnce({
        id_lesson_spec: aiSpecId,
        created_at: new Date(),
        lesson_content_id: 'lesson_1',
        generation_prompt_summary: 'deleted',
        content_structure: {},
        estimated_video_duration_mins: null,
        video_script: null,
        video_generation_instructions: null,
        interactive_elements: null,
        exercise_parameters: null,
      });

      await aiSpecsLessonRepository.deleteAISpecById(aiSpecId);

      expect(prismaClient.lessonAISpecs.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent AI spec', async () => {
      const aiSpecId = 'non_existent_spec';

      prismaClient.lessonAISpecs.findUnique.mockResolvedValueOnce(null);

      await expect(aiSpecsLessonRepository.deleteAISpecById(aiSpecId)).rejects.toThrow();
    });
  });
});
