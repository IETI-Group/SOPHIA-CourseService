import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersQuestionQuiz,
  PaginatedQuizQuestions,
  SortingQuizQuestions,
} from '../../../utils/index.js';
import type { QuestionQuizInDTO, QuestionQuizOutDTO } from '../../models/index.js';
import type { QuestionsQuizzRepository } from '../index.js';

export class QuestionsQuizzRepositoryPostgreSQL implements QuestionsQuizzRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getQuestionsQuiz(
    _filters: FiltersQuestionQuiz,
    _sort: SortingQuizQuestions
  ): Promise<PaginatedQuizQuestions> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getQuestionQuizById(_questionQuizId: string): Promise<QuestionQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  createQuestionQuiz(_dto: QuestionQuizInDTO): Promise<QuestionQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateQuestionQuiz(
    _questionQuizId: string,
    _dto: QuestionQuizInDTO
  ): Promise<QuestionQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteQuestionQuizById(_questionQuizId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
