import type { ApiResponse, FiltersAttemptQuiz, SortingQuizAttempts } from '../../../utils/index.js';
import type { AttemptQuizInDTO, AttemptQuizUpdateDTO } from '../../models/index.js';
import type { AttemptsQuizzRepository } from '../../repositories/index.js';
import type { AttemptService } from '../index.js';

export class AttemptServiceImpl implements AttemptService {
  private readonly attemptsQuizzRepository: AttemptsQuizzRepository;
  constructor(attemptQuizRepository: AttemptsQuizzRepository) {
    this.attemptsQuizzRepository = attemptQuizRepository;
  }
  getAttemptsQuiz(
    _filters: FiltersAttemptQuiz,
    _sort: SortingQuizAttempts
  ): Promise<ApiResponse<unknown>> {
    this.attemptsQuizzRepository;
    throw new Error('Method not implemented.');
  }
  getAttempt(_attemptId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postAttemptQuiz(_dto: AttemptQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putAttempt(
    _attemptId: string,
    _dto: Partial<AttemptQuizUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteAttempt(_attemptId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
