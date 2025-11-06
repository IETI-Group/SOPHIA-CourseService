import {
  type ApiResponse,
  type FiltersAttemptQuiz,
  parseApiResponse,
  type SortingQuizAttempts,
} from '../../../utils/index.js';
import type { AttemptQuizInDTO, AttemptQuizUpdateDTO } from '../../models/index.js';
import type { AttemptsQuizzRepository } from '../../repositories/index.js';
import type { AttemptService } from '../index.js';

export class AttemptServiceImpl implements AttemptService {
  private readonly attemptsQuizzRepository: AttemptsQuizzRepository;
  constructor(attemptQuizRepository: AttemptsQuizzRepository) {
    this.attemptsQuizzRepository = attemptQuizRepository;
  }
  getAttemptsQuiz(
    filters: FiltersAttemptQuiz,
    sort: SortingQuizAttempts
  ): Promise<ApiResponse<unknown>> {
    return this.attemptsQuizzRepository.getAttempts(filters, sort);
  }
  async getAttempt(attemptId: string): Promise<ApiResponse<unknown>> {
    const result = await this.attemptsQuizzRepository.getAttemptById(attemptId);
    return parseApiResponse(result, 'Attempt retrieved successfully');
  }
  async postAttemptQuiz(dto: AttemptQuizInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.attemptsQuizzRepository.createAttempt(dto);
    return parseApiResponse(result, 'Attempt created successfully');
  }
  async putAttempt(
    attemptId: string,
    dto: Partial<AttemptQuizUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.attemptsQuizzRepository.updateAttempt(attemptId, dto);
    return parseApiResponse(result, 'Attempt updated successfully');
  }
  async deleteAttempt(attemptId: string): Promise<ApiResponse<unknown>> {
    await this.attemptsQuizzRepository.deleteAttemptById(attemptId);
    return parseApiResponse(null, 'Attempt deleted successfully');
  }
}
