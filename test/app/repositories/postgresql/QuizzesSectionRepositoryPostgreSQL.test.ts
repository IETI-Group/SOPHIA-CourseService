import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { QuizzesSectionRepository } from '../../../../src/app/index.js';
import { QuizzesSectionRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/QuizzesSectionRepositoryPostgreSQL.js';
import type { FiltersQuizSection, SortingSectionQuizzes } from '../../../../src/utils/index.js';
import { SORT_QUIZ_SECTION } from '../../../../src/utils/index.js';

describe('Quizzes Section Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let quizzesSectionRepository: QuizzesSectionRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    quizzesSectionRepository = new QuizzesSectionRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(quizzesSectionRepository).toBeDefined();
  });

  describe('getQuizzes', () => {
    it('Should return paginated quizzes with light DTO', async () => {
      const filters: FiltersQuizSection = {
        sectionId: 'section-1',
        generationTaskId: null,
        title: null,
        active: true,
        aiGenerated: null,
        durationMinutesMin: null,
        durationMinutesMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingSectionQuizzes = {
        sortFields: [SORT_QUIZ_SECTION.TITLE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockQuizzes = [
        {
          id_quiz: 'quiz-1',
          section_id: 'section-1',
          description: 'Quiz description',
          created_at: new Date('2025-01-01'),
          active: true,
          title: 'Quiz 1',
          duration_minutes: 30,
          ai_generated: false,
          generation_task_id: null,
          difficulty_distribution: null,
          adaptative_logic: null,
        },
      ];

      prismaClient.quizzes.count.mockResolvedValueOnce(1);
      prismaClient.quizzes.findMany.mockResolvedValueOnce(mockQuizzes);

      const result = await quizzesSectionRepository.getQuizzes(filters, sort, true);

      expect(prismaClient.quizzes.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return paginated quizzes with heavy DTO', async () => {
      const filters: FiltersQuizSection = {
        sectionId: null,
        generationTaskId: null,
        title: 'Quiz',
        active: null,
        aiGenerated: true,
        durationMinutesMin: 20,
        durationMinutesMax: 40,
        createdAtStart: new Date('2025-01-01'),
        createdAtEnd: new Date('2025-12-31'),
      };
      const sort: SortingSectionQuizzes = {
        sortFields: [SORT_QUIZ_SECTION.CREATION_DATE, SORT_QUIZ_SECTION.DURATION_MINUTES],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockQuizzes = [
        {
          id_quiz: 'quiz-1',
          section_id: 'section-1',
          description: 'Quiz description',
          created_at: new Date('2025-01-01'),
          active: true,
          title: 'Quiz 1',
          duration_minutes: 30,
          ai_generated: true,
          generation_task_id: 'task-1',
          difficulty_distribution: { easy: 5, medium: 3, hard: 2 },
          adaptative_logic: { enabled: true },
        },
      ];

      prismaClient.quizzes.count.mockResolvedValueOnce(1);
      prismaClient.quizzes.findMany.mockResolvedValueOnce(mockQuizzes);

      const result = await quizzesSectionRepository.getQuizzes(filters, sort, false);

      expect(prismaClient.quizzes.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getQuizById', () => {
    it('Should return quiz by id with light DTO', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Quiz description',
        created_at: new Date('2025-01-01'),
        active: true,
        title: 'Quiz 1',
        duration_minutes: 30,
        ai_generated: false,
        generation_task_id: null,
        difficulty_distribution: null,
        adaptative_logic: null,
      };

      prismaClient.quizzes.findUniqueOrThrow.mockResolvedValueOnce(mockQuiz);

      const result = await quizzesSectionRepository.getQuizById('quiz-1', true);

      expect(prismaClient.quizzes.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idQuiz).toBe('quiz-1');
      expect(result.title).toBe('Quiz 1');
    });

    it('Should return quiz by id with heavy DTO', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Quiz description',
        created_at: new Date('2025-01-01'),
        active: true,
        title: 'Quiz 1',
        duration_minutes: 30,
        ai_generated: true,
        generation_task_id: 'task-1',
        difficulty_distribution: { easy: 5, medium: 3, hard: 2 },
        adaptative_logic: { enabled: true },
      };

      prismaClient.quizzes.findUniqueOrThrow.mockResolvedValueOnce(mockQuiz);

      const result = await quizzesSectionRepository.getQuizById('quiz-1', false);

      expect(prismaClient.quizzes.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idQuiz).toBe('quiz-1');
      expect(result.title).toBe('Quiz 1');
    });

    it('Should throw error when quiz not found', async () => {
      prismaClient.quizzes.findUniqueOrThrow.mockRejectedValueOnce(new Error('Not found'));

      await expect(
        quizzesSectionRepository.getQuizById('quiz-nonexistent', true)
      ).rejects.toThrow();
    });
  });

  describe('createQuiz', () => {
    it('Should create a new quiz with light DTO', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Quiz description',
        created_at: new Date('2025-01-01'),
        active: false,
        title: 'Quiz 1',
        duration_minutes: 0,
        ai_generated: false,
        generation_task_id: null,
        difficulty_distribution: null,
        adaptative_logic: null,
      };

      prismaClient.quizzes.create.mockResolvedValueOnce(mockQuiz);

      const result = await quizzesSectionRepository.createQuiz(
        {
          sectionId: 'section-1',
          description: 'Quiz description',
          title: 'Quiz 1',
          aiGenerated: false,
          generationTaskId: null,
          difficultyDistribution: null,
          adaptativeLogic: null,
        },
        true
      );

      expect(prismaClient.quizzes.create).toHaveBeenCalledOnce();
      expect(result.idQuiz).toBe('quiz-1');
      expect(result.title).toBe('Quiz 1');
    });

    it('Should create a new quiz with heavy DTO', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Quiz description',
        created_at: new Date('2025-01-01'),
        active: false,
        title: 'Quiz 1',
        duration_minutes: 0,
        ai_generated: true,
        generation_task_id: 'task-1',
        difficulty_distribution: { easy: 5, medium: 3, hard: 2 },
        adaptative_logic: { enabled: true },
      };

      prismaClient.quizzes.create.mockResolvedValueOnce(mockQuiz);

      const result = await quizzesSectionRepository.createQuiz(
        {
          sectionId: 'section-1',
          description: 'Quiz description',
          title: 'Quiz 1',
          aiGenerated: true,
          generationTaskId: 'task-1',
          difficultyDistribution: { easy: 5, medium: 3, hard: 2 },
          adaptativeLogic: { enabled: true },
        },
        false
      );

      expect(prismaClient.quizzes.create).toHaveBeenCalledOnce();
      expect(result.idQuiz).toBe('quiz-1');
      expect(result.title).toBe('Quiz 1');
    });
  });

  describe('updateQuiz', () => {
    it('Should update an existing quiz with light DTO', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Updated description',
        created_at: new Date('2025-01-01'),
        active: true,
        title: 'Updated Quiz',
        duration_minutes: 45,
        ai_generated: false,
        generation_task_id: null,
        difficulty_distribution: null,
        adaptative_logic: null,
      };

      prismaClient.quizzes.update.mockResolvedValueOnce(mockQuiz);

      const result = await quizzesSectionRepository.updateQuiz(
        'quiz-1',
        {
          sectionId: 'section-1',
          description: 'Updated description',
          title: 'Updated Quiz',
          aiGenerated: false,
          generationTaskId: null,
          difficultyDistribution: null,
          adaptativeLogic: null,
          active: true,
          durationMinutes: 45,
        },
        true
      );

      expect(prismaClient.quizzes.update).toHaveBeenCalledOnce();
      expect(result.title).toBe('Updated Quiz');
    });

    it('Should update an existing quiz with heavy DTO', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Updated description',
        created_at: new Date('2025-01-01'),
        active: true,
        title: 'Updated Quiz',
        duration_minutes: 45,
        ai_generated: true,
        generation_task_id: 'task-2',
        difficulty_distribution: { easy: 6, medium: 4, hard: 2 },
        adaptative_logic: { enabled: true, adaptive: true },
      };

      prismaClient.quizzes.update.mockResolvedValueOnce(mockQuiz);

      const result = await quizzesSectionRepository.updateQuiz(
        'quiz-1',
        {
          sectionId: 'section-1',
          description: 'Updated description',
          title: 'Updated Quiz',
          aiGenerated: true,
          generationTaskId: 'task-2',
          difficultyDistribution: { easy: 6, medium: 4, hard: 2 },
          adaptativeLogic: { enabled: true, adaptive: true },
          active: true,
          durationMinutes: 45,
        },
        false
      );

      expect(prismaClient.quizzes.update).toHaveBeenCalledOnce();
      expect(result.title).toBe('Updated Quiz');
    });

    it('Should throw error when trying to update non-existent quiz', async () => {
      prismaClient.quizzes.update.mockRejectedValueOnce(new Error('Not found'));

      await expect(
        quizzesSectionRepository.updateQuiz(
          'quiz-nonexistent',
          {
            sectionId: 'section-1',
            description: 'Updated description',
            title: 'Updated Quiz',
            aiGenerated: false,
            generationTaskId: null,
            difficultyDistribution: null,
            adaptativeLogic: null,
            active: true,
            durationMinutes: 45,
          },
          true
        )
      ).rejects.toThrow();
    });
  });

  describe('deleteQuizById', () => {
    it('Should delete a quiz by id', async () => {
      const mockQuiz = {
        id_quiz: 'quiz-1',
        section_id: 'section-1',
        description: 'Quiz description',
        created_at: new Date('2025-01-01'),
        active: true,
        title: 'Quiz 1',
        duration_minutes: 30,
        ai_generated: false,
        generation_task_id: null,
        difficulty_distribution: null,
        adaptative_logic: null,
      };

      prismaClient.quizzes.delete.mockResolvedValueOnce(mockQuiz);

      await quizzesSectionRepository.deleteQuizById('quiz-1');

      expect(prismaClient.quizzes.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent quiz', async () => {
      prismaClient.quizzes.delete.mockRejectedValueOnce(null);

      await expect(quizzesSectionRepository.deleteQuizById('quiz-nonexistent')).rejects.toThrow();
    });
  });
});
