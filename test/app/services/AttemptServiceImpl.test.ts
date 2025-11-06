import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AttemptQuizInDTO, AttemptQuizUpdateDTO } from '../../../src/app/models/index.js';
import type { AttemptsQuizzRepository } from '../../../src/app/repositories/index.js';
import { AttemptServiceImpl } from '../../../src/app/services/implementations/AttemptServiceImpl.js';
import type { FiltersAttemptQuiz, SortingQuizAttempts } from '../../../src/utils/index.js';

describe('AttemptServiceImpl', () => {
  const mockAttemptsQuizzRepository = mockDeep<AttemptsQuizzRepository>();
  let service: AttemptServiceImpl;

  beforeEach(() => {
    service = new AttemptServiceImpl(mockAttemptsQuizzRepository);
  });

  afterEach(() => {
    mockReset(mockAttemptsQuizzRepository);
  });

  it('should call attemptsQuizzRepository.getAttempts with filters and sort', async () => {
    const filters: FiltersAttemptQuiz = {
      quizId: 'quiz-123',
      userId: null,
      durationMinutesMin: null,
      durationMinutesMax: null,
      GRADEMin: null,
      GRADEMax: null,
      submittedAtStart: null,
      submittedAtEnd: null,
    };
    const sort: SortingQuizAttempts = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getAttemptsQuiz(filters, sort);

    expect(mockAttemptsQuizzRepository.getAttempts).toHaveBeenCalledWith(filters, sort);
  });

  it('should call attemptsQuizzRepository.getAttemptById with attemptId', async () => {
    const attemptId: string = 'attempt-123';

    await service.getAttempt(attemptId);

    expect(mockAttemptsQuizzRepository.getAttemptById).toHaveBeenCalledWith(attemptId);
  });

  it('should call attemptsQuizzRepository.createAttempt with dto', async () => {
    const dto: AttemptQuizInDTO = {
      quizId: 'quiz-123',
      userId: 'user-123',
    };

    await service.postAttemptQuiz(dto);

    expect(mockAttemptsQuizzRepository.createAttempt).toHaveBeenCalledWith(dto);
  });

  it('should call attemptsQuizzRepository.updateAttempt with attemptId and dto', async () => {
    const attemptId: string = 'attempt-123';
    const dto: Partial<AttemptQuizUpdateDTO> = {
      grade: 85,
    };

    await service.putAttempt(attemptId, dto);

    expect(mockAttemptsQuizzRepository.updateAttempt).toHaveBeenCalledWith(attemptId, dto);
  });

  it('should call attemptsQuizzRepository.deleteAttemptById with attemptId', async () => {
    const attemptId: string = 'attempt-123';

    await service.deleteAttempt(attemptId);

    expect(mockAttemptsQuizzRepository.deleteAttemptById).toHaveBeenCalledWith(attemptId);
  });
});
