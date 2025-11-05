import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ProgressContentRepository } from '../../../../src/app/index.js';
import type {
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
} from '../../../../src/app/models/index.js';
import { ProgressContentRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/ProgressContentRepositoryPostgreSQL.js';
import type { FiltersProgressContent } from '../../../../src/utils/filters/index.js';
import type { SortingContentProgress } from '../../../../src/utils/request/index.js';
import { SORT_PROGRESS_CONTENT } from '../../../../src/utils/sort_types/index.js';

describe('Progress Content Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let progressContentRepository: ProgressContentRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    progressContentRepository = new ProgressContentRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(progressContentRepository).toBeDefined();
  });

  describe('getProgress', () => {
    it('Should return paginated progress records', async () => {
      const filters: FiltersProgressContent = {
        userId: 'user_1',
        lessonContentId: null,
        active: true,
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
      const sort: SortingContentProgress = {
        sortFields: [SORT_PROGRESS_CONTENT.START_DATE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockProgress = [
        {
          id_content_progress: 'progress_1',
          user_id: 'user_1',
          lesson_content_id: 'content_1',
          started_at: new Date('2025-01-01'),
          completed_at: null,
          time_spend_minutes: 15,
          completion_percentage: 50.0,
          effectiviness_score: 4.2,
          active: true,
          user_rating: null,
        },
      ];

      prismaClient.lessonContentProgress.count.mockResolvedValueOnce(1);
      prismaClient.lessonContentProgress.findMany.mockResolvedValueOnce(mockProgress);

      const result = await progressContentRepository.getProgress(filters, sort);

      expect(prismaClient.lessonContentProgress.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return filtered progress by completion percentage range', async () => {
      const filters: FiltersProgressContent = {
        userId: null,
        lessonContentId: null,
        active: null,
        timeSpendMinutesMin: null,
        timeSpendMinutesMax: null,
        completionPercentageMin: 80.0,
        completionPercentageMax: 100.0,
        effectivinessScoreMin: null,
        effectivinessScoreMax: null,
        userRatingMin: null,
        userRatingMax: null,
        startedAtStart: null,
        startedAtEnd: null,
        completedAtStart: null,
        completedAtEnd: null,
      };
      const sort: SortingContentProgress = {
        sortFields: [SORT_PROGRESS_CONTENT.COMPLETION_PERCENTAGE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockProgress = [
        {
          id_content_progress: 'progress_2',
          user_id: 'user_2',
          lesson_content_id: 'content_2',
          started_at: new Date('2025-01-05'),
          completed_at: new Date('2025-01-10'),
          time_spend_minutes: 30,
          completion_percentage: 100.0,
          effectiviness_score: 4.8,
          active: true,
          user_rating: 5,
        },
      ];

      prismaClient.lessonContentProgress.count.mockResolvedValueOnce(1);
      prismaClient.lessonContentProgress.findMany.mockResolvedValueOnce(mockProgress);

      const result = await progressContentRepository.getProgress(filters, sort);

      expect(prismaClient.lessonContentProgress.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return filtered progress by effectiviness score range', async () => {
      const filters: FiltersProgressContent = {
        userId: null,
        lessonContentId: 'content_3',
        active: null,
        timeSpendMinutesMin: null,
        timeSpendMinutesMax: null,
        completionPercentageMin: null,
        completionPercentageMax: null,
        effectivinessScoreMin: 4.0,
        effectivinessScoreMax: 5.0,
        userRatingMin: null,
        userRatingMax: null,
        startedAtStart: null,
        startedAtEnd: null,
        completedAtStart: null,
        completedAtEnd: null,
      };
      const sort: SortingContentProgress = {
        sortFields: [SORT_PROGRESS_CONTENT.EFFECTIVINESS_SCORE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockProgress = [
        {
          id_content_progress: 'progress_3',
          user_id: 'user_3',
          lesson_content_id: 'content_3',
          started_at: new Date('2025-01-15'),
          completed_at: new Date('2025-01-20'),
          time_spend_minutes: 45,
          completion_percentage: 100.0,
          effectiviness_score: 4.5,
          active: true,
          user_rating: 4,
        },
      ];

      prismaClient.lessonContentProgress.count.mockResolvedValueOnce(1);
      prismaClient.lessonContentProgress.findMany.mockResolvedValueOnce(mockProgress);

      const result = await progressContentRepository.getProgress(filters, sort);

      expect(prismaClient.lessonContentProgress.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('getProgressById', () => {
    it('Should return progress by id', async () => {
      const progressId = 'progress_123';
      const mockProgress = {
        id_content_progress: 'progress_123',
        user_id: 'user_1',
        lesson_content_id: 'content_1',
        started_at: new Date('2025-01-01'),
        completed_at: new Date('2025-01-05'),
        time_spend_minutes: 25,
        completion_percentage: 100.0,
        effectiviness_score: 4.7,
        active: true,
        user_rating: 5,
      };

      prismaClient.lessonContentProgress.findUniqueOrThrow.mockResolvedValueOnce(mockProgress);

      const result = await progressContentRepository.getProgressById(progressId);

      expect(prismaClient.lessonContentProgress.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idContentProgress).toBe('progress_123');
      expect(result.userId).toBe('user_1');
      expect(result.lessonContentId).toBe('content_1');
      expect(result.completionPercentage).toBe(100.0);
      expect(result.effectivinessScore).toBe(4.7);
    });

    it('Should throw error when progress not found', async () => {
      const progressId = 'nonexistent';
      prismaClient.lessonContentProgress.findUniqueOrThrow.mockRejectedValueOnce(
        new Error('Not found')
      );

      await expect(progressContentRepository.getProgressById(progressId)).rejects.toThrow();
    });
  });

  describe('createProgress', () => {
    it('Should create a new progress record', async () => {
      const dto: ProgressContentInDTO = {
        userId: 'user_1',
        lessonContentId: 'content_1',
      };

      const mockCreated = {
        id_content_progress: 'new_progress_123',
        user_id: 'user_1',
        lesson_content_id: 'content_1',
        started_at: new Date('2025-01-01'),
        completed_at: null,
        time_spend_minutes: 0,
        completion_percentage: 0.0,
        effectiviness_score: 0.0,
        active: false,
        user_rating: null,
      };

      prismaClient.lessonContentProgress.create.mockResolvedValueOnce(mockCreated);

      const result = await progressContentRepository.createProgress(dto);

      expect(prismaClient.lessonContentProgress.create).toHaveBeenCalledOnce();
      expect(result.idContentProgress).toBe('new_progress_123');
      expect(result.userId).toBe('user_1');
      expect(result.lessonContentId).toBe('content_1');
      expect(result.timeSpendMinutes).toBe(0);
      expect(result.completionPercentage).toBe(0.0);
    });
  });

  describe('updateProgress', () => {
    it('Should update an existing progress record', async () => {
      const progressId = 'progress_123';
      const dto: Partial<ProgressContentUpdateDTO> = {
        userId: 'user_1',
        lessonContentId: 'content_1',
        timeSpendMinutes: 30,
        completionPercentage: 75.0,
        effectivinessScore: 4.3,
        active: true,
        userRating: 4,
      };

      const mockUpdated = {
        id_content_progress: 'progress_123',
        user_id: 'user_1',
        lesson_content_id: 'content_1',
        started_at: new Date('2025-01-01'),
        completed_at: null,
        time_spend_minutes: 30,
        completion_percentage: 75.0,
        effectiviness_score: 4.3,
        active: true,
        user_rating: 4,
      };

      prismaClient.lessonContentProgress.update.mockResolvedValueOnce(mockUpdated);

      const result = await progressContentRepository.updateProgress(progressId, dto);

      expect(prismaClient.lessonContentProgress.update).toHaveBeenCalledOnce();
      expect(result.idContentProgress).toBe('progress_123');
      expect(result.timeSpendMinutes).toBe(30);
      expect(result.completionPercentage).toBe(75.0);
      expect(result.effectivinessScore).toBe(4.3);
    });

    it('Should update only completion percentage and user rating', async () => {
      const progressId = 'progress_456';
      const partialDTO: Partial<ProgressContentUpdateDTO> = {
        completionPercentage: 100.0,
        userRating: 5,
      };

      const mockUpdated = {
        id_content_progress: 'progress_456',
        user_id: 'user_1',
        lesson_content_id: 'content_1',
        started_at: new Date('2025-01-01'),
        completed_at: new Date('2025-01-05'),
        time_spend_minutes: 45,
        completion_percentage: 100.0,
        effectiviness_score: 4.5,
        active: true,
        user_rating: 5,
      };

      prismaClient.lessonContentProgress.update.mockResolvedValueOnce(mockUpdated);

      const result = await progressContentRepository.updateProgress(progressId, partialDTO);

      expect(prismaClient.lessonContentProgress.update).toHaveBeenCalledOnce();
      expect(result.completionPercentage).toBe(100.0);
      expect(result.userRating).toBe(5);
      expect(result.completedAt).toEqual(new Date('2025-01-05'));
    });

    it('Should throw error when trying to update non-existent progress', async () => {
      const progressId = 'nonexistent';
      const dto: ProgressContentUpdateDTO = {
        userId: 'user_1',
        lessonContentId: 'content_1',
        timeSpendMinutes: 30,
        completionPercentage: 75.0,
        effectivinessScore: 4.3,
        active: true,
        userRating: 4,
      };

      prismaClient.lessonContentProgress.update.mockRejectedValueOnce(new Error('Not found'));

      await expect(progressContentRepository.updateProgress(progressId, dto)).rejects.toThrow();
    });
  });

  describe('deleteProgressById', () => {
    it('Should delete a progress record by id', async () => {
      const progressId = 'progress_123';

      const mockDeleted = {
        id_content_progress: 'progress_123',
        user_id: 'user_1',
        lesson_content_id: 'content_1',
        started_at: new Date('2025-01-01'),
        completed_at: null,
        time_spend_minutes: 20,
        completion_percentage: 60.0,
        effectiviness_score: 4.0,
        active: true,
        user_rating: 3,
      };

      prismaClient.lessonContentProgress.delete.mockResolvedValueOnce(mockDeleted);

      await progressContentRepository.deleteProgressById(progressId);

      expect(prismaClient.lessonContentProgress.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent progress', async () => {
      const progressId = 'nonexistent';

      prismaClient.lessonContentProgress.delete.mockRejectedValueOnce(null);

      await expect(progressContentRepository.deleteProgressById(progressId)).rejects.toThrow();
    });
  });
});
