import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersQuestionQuiz,
  PaginatedQuizQuestions,
  SortingQuizQuestions,
} from '../../../utils/index.js';
import { SORT_QUESTION_QUIZ } from '../../../utils/index.js';
import type { QuestionQuizInDTO, QuestionQuizOutDTO } from '../../models/index.js';
import type { QuestionsQuizzRepository } from '../index.js';

export class QuestionsQuizzRepositoryPostgreSQL implements QuestionsQuizzRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.QuizQuestionsWhereInput,
    field: keyof Prisma.QuizQuestionsWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.QuizQuestionsWhereInput,
    field: keyof Prisma.QuizQuestionsWhereInput,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as Prisma.StringFilter) = {
        contains: value,
        mode: 'insensitive',
      };
    }
  }

  private addNumericRangeFilter(
    whereClause: Prisma.QuizQuestionsWhereInput,
    field: keyof Prisma.QuizQuestionsWhereInput,
    min: number | null,
    max: number | null
  ): void {
    if (min !== null || max !== null) {
      const filter: Prisma.IntFilter = {};
      if (min !== null) filter.gte = min;
      if (max !== null) filter.lte = max;
      (whereClause[field] as Prisma.IntFilter) = filter;
    }
  }

  private buildWhere(filters: FiltersQuestionQuiz): Prisma.QuizQuestionsWhereInput {
    const whereClause: Prisma.QuizQuestionsWhereInput = {};

    this.addExactFilter(whereClause, 'quiz_id', filters.quizId);

    this.addTextFilter(whereClause, 'question', filters.question);

    this.addNumericRangeFilter(
      whereClause,
      'duration_minutes',
      filters.durationMinutesMin,
      filters.durationMinutesMax
    );

    return whereClause;
  }

  private buildSort(
    sortParams: SortingQuizQuestions
  ): Prisma.QuizQuestionsOrderByWithRelationInput[] {
    const orderBy: Prisma.QuizQuestionsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      switch (sortField) {
        case SORT_QUESTION_QUIZ.QUESTION:
          orderBy.push({ question: direction });
          break;
        case SORT_QUESTION_QUIZ.DURATION_MINUTES:
          orderBy.push({ duration_minutes: direction });
          break;
      }
    }

    return orderBy;
  }

  private buildSelect(): Prisma.QuizQuestionsSelect {
    return {
      id_quiz_question: true,
      quiz_id: true,
      question: true,
      duration_minutes: true,
    };
  }

  private buildDTO(
    record: Prisma.QuizQuestionsGetPayload<{ select: Prisma.QuizQuestionsSelect }>
  ): QuestionQuizOutDTO {
    return {
      idQuizQuestion: record.id_quiz_question,
      quizId: record.quiz_id,
      question: record.question,
      durationMinutes: record.duration_minutes,
    };
  }

  private buildPaginatedResponse(
    data: QuestionQuizOutDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedQuizQuestions {
    const totalPages = Math.ceil(total / size);
    return {
      success: true,
      message: 'Quiz questions retrieved successfully',
      data,
      page,
      size,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      timestamp: new Date().toISOString(),
    };
  }

  async getQuestionsQuiz(
    filters: FiltersQuestionQuiz,
    sort: SortingQuizQuestions
  ): Promise<PaginatedQuizQuestions> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect();

    const skip = (sort.page - 1) * sort.size;
    const take = sort.size;

    const [total, questions] = await Promise.all([
      this.prismaClient.quizQuestions.count({ where }),
      this.prismaClient.quizQuestions.findMany({
        where,
        orderBy,
        select,
        skip,
        take,
      }),
    ]);

    const dtos = questions.map((question) => this.buildDTO(question));

    return this.buildPaginatedResponse(dtos, total, sort.page, sort.size);
  }

  async getQuestionQuizById(questionQuizId: string): Promise<QuestionQuizOutDTO> {
    const select = this.buildSelect();

    const question = await this.prismaClient.quizQuestions.findUniqueOrThrow({
      where: { id_quiz_question: questionQuizId },
      select,
    });

    return this.buildDTO(question);
  }

  async createQuestionQuiz(dto: QuestionQuizInDTO): Promise<QuestionQuizOutDTO> {
    const select = this.buildSelect();

    const question = await this.prismaClient.quizQuestions.create({
      data: {
        quiz_id: dto.quizId,
        question: dto.question,
        duration_minutes: dto.durationMinutes,
      },
      select,
    });

    return this.buildDTO(question);
  }

  async updateQuestionQuiz(
    questionQuizId: string,
    dto: QuestionQuizInDTO
  ): Promise<QuestionQuizOutDTO> {
    const select = this.buildSelect();

    const question = await this.prismaClient.quizQuestions.update({
      where: { id_quiz_question: questionQuizId },
      data: {
        quiz_id: dto.quizId,
        question: dto.question,
        duration_minutes: dto.durationMinutes,
      },
      select,
    });

    return this.buildDTO(question);
  }

  async deleteQuestionQuizById(questionQuizId: string): Promise<void> {
    const result = await this.prismaClient.quizQuestions.delete({
      where: { id_quiz_question: questionQuizId },
    });
    if (!result) throw new Error('Quiz question not found');
  }
}
