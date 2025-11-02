import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersQuizSection,
  PaginatedQuizzes,
  SortingSectionQuizzes,
} from '../../../utils/index.js';
import type {
  QuizSectionInDTO,
  QuizSectionOutLightDTO,
  QuizSectionUpdateDTO,
} from '../../models/index.js';
import type { QuizzesSectionRepository } from '../index.js';

export class QuizzesSectionRepositoryPostgreSQL implements QuizzesSectionRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getQuizzes(
    _filters: FiltersQuizSection,
    _sort: SortingSectionQuizzes,
    _lightDTO: boolean
  ): Promise<PaginatedQuizzes> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getQuizById(_quizId: string, _lightDTO: boolean): Promise<QuizSectionOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  createQuiz(_dto: QuizSectionInDTO, _lightDTO: boolean): Promise<QuizSectionOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateQuiz(
    _quizId: string,
    _dto: QuizSectionUpdateDTO,
    _lightDTO: boolean
  ): Promise<QuizSectionOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteQuizById(_quizId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
