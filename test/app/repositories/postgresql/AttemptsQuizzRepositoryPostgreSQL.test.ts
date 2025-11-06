import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AttemptsQuizzRepository } from '../../../../src/app/index.js';
import type { AttemptQuizInDTO, AttemptQuizUpdateDTO } from '../../../../src/app/models/index.js';
import { AttemptsQuizzRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/AttemptsQuizzRepositoryPostgreSQL.js';
import type { FiltersAttemptQuiz } from '../../../../src/utils/filters/index.js';
import type { SortingQuizAttempts } from '../../../../src/utils/request/index.js';
import { SORT_ATTEMPT_QUIZ } from '../../../../src/utils/sort_types/index.js';

describe('Attempts Quizz Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let attemptsQuizzRepository: AttemptsQuizzRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    attemptsQuizzRepository = new AttemptsQuizzRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(attemptsQuizzRepository).toBeDefined();
  });

  describe('getAttempts', () => {
    it('Should return paginated attempts', async () => {
      const filters: FiltersAttemptQuiz = {
        quizId: 'quiz_1',
        userId: null,
        durationMinutesMin: null,
        durationMinutesMax: null,
        GRADEMin: null,
        GRADEMax: null,
        submittedAtStart: null,
        submittedAtEnd: null,
      };
      const sort: SortingQuizAttempts = {
        sortFields: [SORT_ATTEMPT_QUIZ.SUBMISSION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockAttempts = [
        {
          id_quiz_attempt: 'attempt_1',
          quiz_id: 'quiz_1',
          user_id: 'user_1',
          submitted_at: new Date('2025-01-10'),
          grade: 85.5,
          duration_minutes: 45,
        },
      ];

      prismaClient.quizAttempts.count.mockResolvedValueOnce(1);
      prismaClient.quizAttempts.findMany.mockResolvedValueOnce(mockAttempts);

      const result = await attemptsQuizzRepository.getAttempts(filters, sort);

      expect(prismaClient.quizAttempts.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return filtered attempts by grade range', async () => {
      const filters: FiltersAttemptQuiz = {
        quizId: null,
        userId: 'user_1',
        durationMinutesMin: null,
        durationMinutesMax: null,
        GRADEMin: 80.0,
        GRADEMax: 100.0,
        submittedAtStart: null,
        submittedAtEnd: null,
      };
      const sort: SortingQuizAttempts = {
        sortFields: [SORT_ATTEMPT_QUIZ.GRADE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockAttempts = [
        {
          id_quiz_attempt: 'attempt_2',
          quiz_id: 'quiz_2',
          user_id: 'user_1',
          submitted_at: new Date('2025-01-15'),
          grade: 95.0,
          duration_minutes: 50,
        },
        {
          id_quiz_attempt: 'attempt_3',
          quiz_id: 'quiz_3',
          user_id: 'user_1',
          submitted_at: new Date('2025-01-20'),
          grade: 88.0,
          duration_minutes: 40,
        },
      ];

      prismaClient.quizAttempts.count.mockResolvedValueOnce(2);
      prismaClient.quizAttempts.findMany.mockResolvedValueOnce(mockAttempts);

      const result = await attemptsQuizzRepository.getAttempts(filters, sort);

      expect(prismaClient.quizAttempts.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('Should return filtered attempts by duration range', async () => {
      const filters: FiltersAttemptQuiz = {
        quizId: null,
        userId: null,
        durationMinutesMin: 30,
        durationMinutesMax: 60,
        GRADEMin: null,
        GRADEMax: null,
        submittedAtStart: null,
        submittedAtEnd: null,
      };
      const sort: SortingQuizAttempts = {
        sortFields: [SORT_ATTEMPT_QUIZ.DURATION_MINUTES],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockAttempts = [
        {
          id_quiz_attempt: 'attempt_4',
          quiz_id: 'quiz_4',
          user_id: 'user_2',
          submitted_at: new Date('2025-01-25'),
          grade: 75.0,
          duration_minutes: 35,
        },
      ];

      prismaClient.quizAttempts.count.mockResolvedValueOnce(1);
      prismaClient.quizAttempts.findMany.mockResolvedValueOnce(mockAttempts);

      const result = await attemptsQuizzRepository.getAttempts(filters, sort);

      expect(prismaClient.quizAttempts.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getAttemptById', () => {
    it('Should return attempt by id', async () => {
      const attemptId = 'attempt_123';
      const mockAttempt = {
        id_quiz_attempt: 'attempt_123',
        quiz_id: 'quiz_1',
        user_id: 'user_1',
        submitted_at: new Date('2025-01-10'),
        grade: 90.0,
        duration_minutes: 45,
      };

      prismaClient.quizAttempts.findUniqueOrThrow.mockResolvedValueOnce(mockAttempt);

      const result = await attemptsQuizzRepository.getAttemptById(attemptId);

      expect(prismaClient.quizAttempts.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idQuizAttempt).toBe('attempt_123');
      expect(result.quizId).toBe('quiz_1');
      expect(result.userId).toBe('user_1');
      expect(result.grade).toBe(90.0);
      expect(result.durationMinutes).toBe(45);
    });

    it('Should throw error when attempt not found', async () => {
      const attemptId = 'nonexistent';
      prismaClient.quizAttempts.findUniqueOrThrow.mockRejectedValueOnce(new Error('Not found'));

      await expect(attemptsQuizzRepository.getAttemptById(attemptId)).rejects.toThrow();
    });
  });

  describe('createAttempt', () => {
    it('Should create a new attempt', async () => {
      const dto: AttemptQuizInDTO = {
        quizId: 'quiz_1',
        userId: 'user_1',
      };

      const mockCreated = {
        id_quiz_attempt: 'new_attempt_123',
        quiz_id: 'quiz_1',
        user_id: 'user_1',
        submitted_at: new Date('2025-01-10'),
        grade: null,
        duration_minutes: 0,
      };

      prismaClient.quizAttempts.create.mockResolvedValueOnce(mockCreated);

      const result = await attemptsQuizzRepository.createAttempt(dto);

      expect(prismaClient.quizAttempts.create).toHaveBeenCalledOnce();
      expect(result.idQuizAttempt).toBe('new_attempt_123');
      expect(result.quizId).toBe('quiz_1');
      expect(result.userId).toBe('user_1');
      expect(result.grade).toBe(null);
      expect(result.durationMinutes).toBe(0);
    });
  });

  describe('updateAttempt', () => {
    it('Should update an existing attempt', async () => {
      const attemptId = 'attempt_123';
      const dto: Partial<AttemptQuizUpdateDTO> = {
        quizId: 'quiz_1',
        userId: 'user_1',
        grade: 95.5,
      };

      const mockUpdated = {
        id_quiz_attempt: 'attempt_123',
        quiz_id: 'quiz_1',
        user_id: 'user_1',
        submitted_at: new Date('2025-01-10'),
        grade: 95.5,
        duration_minutes: 50,
      };

      prismaClient.quizAttempts.update.mockResolvedValueOnce(mockUpdated);

      const result = await attemptsQuizzRepository.updateAttempt(attemptId, dto);

      expect(prismaClient.quizAttempts.update).toHaveBeenCalledOnce();
      expect(result.idQuizAttempt).toBe('attempt_123');
      expect(result.grade).toBe(95.5);
    });

    it('Should update only some fields of an attempt', async () => {
      const attemptId = 'attempt_456';
      const partialDto: Partial<AttemptQuizUpdateDTO> = {
        grade: 88.0,
      };

      const mockUpdated = {
        id_quiz_attempt: 'attempt_456',
        quiz_id: 'quiz_2',
        user_id: 'user_2',
        submitted_at: new Date('2025-01-15'),
        grade: 88.0,
        duration_minutes: 40,
      };

      prismaClient.quizAttempts.update.mockResolvedValueOnce(mockUpdated);

      const result = await attemptsQuizzRepository.updateAttempt(attemptId, partialDto);

      expect(prismaClient.quizAttempts.update).toHaveBeenCalledOnce();
      expect(result.idQuizAttempt).toBe('attempt_456');
      expect(result.grade).toBe(88.0);
      expect(result.quizId).toBe('quiz_2');
      expect(result.userId).toBe('user_2');
    });

    it('Should throw error when trying to update non-existent attempt', async () => {
      const attemptId = 'nonexistent';
      const dto: Partial<AttemptQuizUpdateDTO> = {
        quizId: 'quiz_1',
        userId: 'user_1',
        grade: 95.5,
      };

      prismaClient.quizAttempts.update.mockRejectedValueOnce(new Error('Not found'));

      await expect(attemptsQuizzRepository.updateAttempt(attemptId, dto)).rejects.toThrow();
    });
  });

  describe('deleteAttemptById', () => {
    it('Should delete an attempt by id', async () => {
      const attemptId = 'attempt_123';

      const mockDeleted = {
        id_quiz_attempt: 'attempt_123',
        quiz_id: 'quiz_1',
        user_id: 'user_1',
        submitted_at: new Date('2025-01-10'),
        grade: 85.0,
        duration_minutes: 45,
      };

      prismaClient.quizAttempts.delete.mockResolvedValueOnce(mockDeleted);

      await attemptsQuizzRepository.deleteAttemptById(attemptId);

      expect(prismaClient.quizAttempts.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent attempt', async () => {
      const attemptId = 'nonexistent';

      prismaClient.quizAttempts.delete.mockRejectedValueOnce(null);

      await expect(attemptsQuizzRepository.deleteAttemptById(attemptId)).rejects.toThrow();
    });
  });
});
