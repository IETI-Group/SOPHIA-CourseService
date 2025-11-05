import type {
  FiltersAttemptQuiz,
  PaginatedQuizAttempts,
  SortingQuizAttempts,
} from '../../../utils/index.js';
import type {
  AttemptQuizInDTO,
  AttemptQuizOutDTO,
  AttemptQuizUpdateDTO,
} from '../../models/index.js';

export interface AttemptsQuizzRepository {
  getAttempts(
    filters: FiltersAttemptQuiz,
    sort: SortingQuizAttempts
  ): Promise<PaginatedQuizAttempts>;
  getAttemptById(attemptId: string): Promise<AttemptQuizOutDTO>;
  createAttempt(dto: AttemptQuizInDTO): Promise<AttemptQuizOutDTO>;
  updateAttempt(attemptId: string, dto: Partial<AttemptQuizUpdateDTO>): Promise<AttemptQuizOutDTO>;
  deleteAttemptById(attemptId: string): Promise<void>;
}
