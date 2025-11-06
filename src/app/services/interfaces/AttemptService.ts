import type { ApiResponse, FiltersAttemptQuiz, SortingQuizAttempts } from '../../../utils/index.js';
import type { AttemptQuizInDTO, AttemptQuizUpdateDTO } from '../../models/index.js';

export interface AttemptService {
  getAttemptsQuiz(
    filters: FiltersAttemptQuiz,
    sort: SortingQuizAttempts
  ): Promise<ApiResponse<unknown>>;
  getAttempt(attemptId: string): Promise<ApiResponse<unknown>>;
  postAttemptQuiz(dto: AttemptQuizInDTO): Promise<ApiResponse<unknown>>;
  putAttempt(attemptId: string, dto: Partial<AttemptQuizUpdateDTO>): Promise<ApiResponse<unknown>>;
  deleteAttempt(attemptId: string): Promise<ApiResponse<unknown>>;
}
