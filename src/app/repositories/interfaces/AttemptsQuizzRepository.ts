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
  getAttempts(filters: FiltersAttemptQuiz, sort: SortingQuizAttempts): PaginatedQuizAttempts;
  getAttemptById(attemptId: string): AttemptQuizOutDTO;
  createAttempt(dto: AttemptQuizInDTO): AttemptQuizOutDTO;
  updateAttempt(attemptId: string, dto: AttemptQuizUpdateDTO): AttemptQuizOutDTO;
  deleteAttemptById(attemptId: string): void;
}
