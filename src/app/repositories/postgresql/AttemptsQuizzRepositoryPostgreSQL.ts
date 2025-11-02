import type { PrismaClient } from '@prisma/client/default.js';
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
import type { AttemptsQuizzRepository } from '../index.js';

export class AttemptsQuizzRepositoryPostgreSQL implements AttemptsQuizzRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getAttempts(
    _filters: FiltersAttemptQuiz,
    _sort: SortingQuizAttempts
  ): Promise<PaginatedQuizAttempts> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getAttemptById(_attemptId: string): Promise<AttemptQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  createAttempt(_dto: AttemptQuizInDTO): Promise<AttemptQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateAttempt(_attemptId: string, _dto: AttemptQuizUpdateDTO): Promise<AttemptQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteAttemptById(_attemptId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
