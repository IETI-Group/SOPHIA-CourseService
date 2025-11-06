import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
} from '../../../src/app/models/index.js';
import type { ProgressContentRepository } from '../../../src/app/repositories/index.js';
import { ProgressServiceImpl } from '../../../src/app/services/implementations/ProgressServiceImpl.js';
import type { FiltersProgressContent, SortingContentProgress } from '../../../src/utils/index.js';

describe('ProgressServiceImpl', () => {
  const mockProgressContentRepository = mockDeep<ProgressContentRepository>();
  let service: ProgressServiceImpl;

  beforeEach(() => {
    service = new ProgressServiceImpl(mockProgressContentRepository);
  });

  afterEach(() => {
    mockReset(mockProgressContentRepository);
  });

  it('should call progressContentRepository.getProgress with filters and sort', async () => {
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
    const sort: SortingContentProgress = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getProgressContent(filters, sort);

    expect(mockProgressContentRepository.getProgress).toHaveBeenCalledWith(filters, sort);
  });

  it('should call progressContentRepository.getProgressById with progressId', async () => {
    const progressId: string = 'progress-123';

    await service.getProgressById(progressId);

    expect(mockProgressContentRepository.getProgressById).toHaveBeenCalledWith(progressId);
  });

  it('should call progressContentRepository.createProgress with dto', async () => {
    const dto: ProgressContentInDTO = {
      userId: 'user-123',
      lessonContentId: 'content-123',
    };

    await service.postProgressContent(dto);

    expect(mockProgressContentRepository.createProgress).toHaveBeenCalledWith(dto);
  });

  it('should call progressContentRepository.updateProgress with progressId and dto', async () => {
    const progressId: string = 'progress-123';
    const dto: Partial<ProgressContentUpdateDTO> = {
      completionPercentage: 80,
      active: true,
    };

    await service.putProgress(progressId, dto);

    expect(mockProgressContentRepository.updateProgress).toHaveBeenCalledWith(progressId, dto);
  });

  it('should call progressContentRepository.deleteProgressById with progressId', async () => {
    const progressId: string = 'progress-123';

    await service.deleteProgress(progressId);

    expect(mockProgressContentRepository.deleteProgressById).toHaveBeenCalledWith(progressId);
  });
});
