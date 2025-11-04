import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { QuestionsQuizzRepository } from '../../../../src/app/index.js';
import { QuestionsQuizzRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/QuestionsQuizzRepositoryPostgreSQL.js';
import type { FiltersQuestionQuiz, SortingQuizQuestions } from '../../../../src/utils/index.js';
import { SORT_QUESTION_QUIZ } from '../../../../src/utils/index.js';

describe('Questions Quizz Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let questionsQuizzRepository: QuestionsQuizzRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    questionsQuizzRepository = new QuestionsQuizzRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(questionsQuizzRepository).toBeDefined();
  });

  describe('getQuestionsQuiz', () => {
    it('Should return paginated quiz questions', async () => {
      const filters: FiltersQuestionQuiz = {
        quizId: 'quiz-1',
        question: null,
        durationMinutesMin: null,
        durationMinutesMax: null,
      };
      const sort: SortingQuizQuestions = {
        sortFields: [SORT_QUESTION_QUIZ.QUESTION],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockQuestions = [
        {
          id_quiz_question: 'question-1',
          quiz_id: 'quiz-1',
          question: 'What is JavaScript?',
          duration_minutes: 5,
        },
      ];

      prismaClient.quizQuestions.count.mockResolvedValueOnce(1);
      prismaClient.quizQuestions.findMany.mockResolvedValueOnce(mockQuestions);

      const result = await questionsQuizzRepository.getQuestionsQuiz(filters, sort);

      expect(prismaClient.quizQuestions.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return paginated quiz questions with filters', async () => {
      const filters: FiltersQuestionQuiz = {
        quizId: null,
        question: 'JavaScript',
        durationMinutesMin: 3,
        durationMinutesMax: 10,
      };
      const sort: SortingQuizQuestions = {
        sortFields: [SORT_QUESTION_QUIZ.DURATION_MINUTES],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockQuestions = [
        {
          id_quiz_question: 'question-1',
          quiz_id: 'quiz-1',
          question: 'What is JavaScript?',
          duration_minutes: 5,
        },
        {
          id_quiz_question: 'question-2',
          quiz_id: 'quiz-2',
          question: 'How does JavaScript work?',
          duration_minutes: 8,
        },
      ];

      prismaClient.quizQuestions.count.mockResolvedValueOnce(2);
      prismaClient.quizQuestions.findMany.mockResolvedValueOnce(mockQuestions);

      const result = await questionsQuizzRepository.getQuestionsQuiz(filters, sort);

      expect(prismaClient.quizQuestions.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe('getQuestionQuizById', () => {
    it('Should return quiz question by id', async () => {
      const mockQuestion = {
        id_quiz_question: 'question-1',
        quiz_id: 'quiz-1',
        question: 'What is JavaScript?',
        duration_minutes: 5,
      };

      prismaClient.quizQuestions.findUniqueOrThrow.mockResolvedValueOnce(mockQuestion);

      const result = await questionsQuizzRepository.getQuestionQuizById('question-1');

      expect(prismaClient.quizQuestions.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idQuizQuestion).toBe('question-1');
      expect(result.question).toBe('What is JavaScript?');
    });

    it('Should throw error when quiz question not found', async () => {
      prismaClient.quizQuestions.findUniqueOrThrow.mockRejectedValueOnce(new Error('Not found'));

      await expect(
        questionsQuizzRepository.getQuestionQuizById('question-nonexistent')
      ).rejects.toThrow();
    });
  });

  describe('createQuestionQuiz', () => {
    it('Should create a new quiz question', async () => {
      const mockQuestion = {
        id_quiz_question: 'question-1',
        quiz_id: 'quiz-1',
        question: 'What is JavaScript?',
        duration_minutes: 5,
      };

      prismaClient.quizQuestions.create.mockResolvedValueOnce(mockQuestion);

      const result = await questionsQuizzRepository.createQuestionQuiz({
        quizId: 'quiz-1',
        question: 'What is JavaScript?',
        durationMinutes: 5,
      });

      expect(prismaClient.quizQuestions.create).toHaveBeenCalledOnce();
      expect(result.idQuizQuestion).toBe('question-1');
      expect(result.question).toBe('What is JavaScript?');
    });
  });

  describe('updateQuestionQuiz', () => {
    it('Should update an existing quiz question', async () => {
      const mockQuestion = {
        id_quiz_question: 'question-1',
        quiz_id: 'quiz-1',
        question: 'What is TypeScript?',
        duration_minutes: 7,
      };

      prismaClient.quizQuestions.update.mockResolvedValueOnce(mockQuestion);

      const result = await questionsQuizzRepository.updateQuestionQuiz('question-1', {
        quizId: 'quiz-1',
        question: 'What is TypeScript?',
        durationMinutes: 7,
      });

      expect(prismaClient.quizQuestions.update).toHaveBeenCalledOnce();
      expect(result.question).toBe('What is TypeScript?');
      expect(result.durationMinutes).toBe(7);
    });

    it('Should throw error when trying to update non-existent quiz question', async () => {
      prismaClient.quizQuestions.update.mockRejectedValueOnce(new Error('Not found'));

      await expect(
        questionsQuizzRepository.updateQuestionQuiz('question-nonexistent', {
          quizId: 'quiz-1',
          question: 'Updated question',
          durationMinutes: 5,
        })
      ).rejects.toThrow();
    });
  });

  describe('deleteQuestionQuizById', () => {
    it('Should delete a quiz question by id', async () => {
      const mockQuestion = {
        id_quiz_question: 'question-1',
        quiz_id: 'quiz-1',
        question: 'What is JavaScript?',
        duration_minutes: 5,
      };

      prismaClient.quizQuestions.delete.mockResolvedValueOnce(mockQuestion);

      await questionsQuizzRepository.deleteQuestionQuizById('question-1');

      expect(prismaClient.quizQuestions.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent quiz question', async () => {
      prismaClient.quizQuestions.delete.mockRejectedValueOnce(null);

      await expect(
        questionsQuizzRepository.deleteQuestionQuizById('question-nonexistent')
      ).rejects.toThrow();
    });
  });
});
