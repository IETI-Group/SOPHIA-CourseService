import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersAttemptQuiz,
  PaginatedQuizAttempts,
  SortingQuizAttempts,
} from '../../../utils/index.js';
import { SORT_ATTEMPT_QUIZ } from '../../../utils/index.js';
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

  private addExactFilter(
    whereClause: Prisma.QuizAttemptsWhereInput,
    field: keyof Prisma.QuizAttemptsWhereInput,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      whereClause[field] = value as never;
    }
  }

  private addNumericRangeFilter(
    whereClause: Prisma.QuizAttemptsWhereInput,
    field: keyof Prisma.QuizAttemptsWhereInput,
    min: number | null,
    max: number | null
  ): void {
    if (min !== null || max !== null) {
      whereClause[field] = {
        ...(min !== null && { gte: min }),
        ...(max !== null && { lte: max }),
      } as never;
    }
  }

  private addDateRangeFilter(
    whereClause: Prisma.QuizAttemptsWhereInput,
    field: keyof Prisma.QuizAttemptsWhereInput,
    start: Date | null,
    end: Date | null
  ): void {
    if (start !== null || end !== null) {
      whereClause[field] = {
        ...(start !== null && { gte: start }),
        ...(end !== null && { lte: end }),
      } as never;
    }
  }

  private buildWhere(filters: FiltersAttemptQuiz): Prisma.QuizAttemptsWhereInput {
    const whereClause: Prisma.QuizAttemptsWhereInput = {};

    this.addExactFilter(whereClause, 'quiz_id', filters.quizId);
    this.addExactFilter(whereClause, 'user_id', filters.userId);
    this.addNumericRangeFilter(
      whereClause,
      'duration_minutes',
      filters.durationMinutesMin,
      filters.durationMinutesMax
    );
    this.addNumericRangeFilter(whereClause, 'grade', filters.GRADEMin, filters.GRADEMax);
    this.addDateRangeFilter(
      whereClause,
      'submitted_at',
      filters.submittedAtStart,
      filters.submittedAtEnd
    );

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_ATTEMPT_QUIZ,
    keyof Prisma.QuizAttemptsOrderByWithRelationInput
  > = {
    [SORT_ATTEMPT_QUIZ.SUBMISSION_DATE]: 'submitted_at',
    [SORT_ATTEMPT_QUIZ.GRADE]: 'grade',
    [SORT_ATTEMPT_QUIZ.DURATION_MINUTES]: 'duration_minutes',
  };

  private buildSort(
    sortParams: SortingQuizAttempts
  ): Prisma.QuizAttemptsOrderByWithRelationInput[] {
    const orderBy: Prisma.QuizAttemptsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(): Prisma.QuizAttemptsSelect {
    return {
      id_quiz_attempt: true,
      quiz_id: true,
      user_id: true,
      submitted_at: true,
      grade: true,
      duration_minutes: true,
    };
  }

  private buildDTO(
    record: Prisma.QuizAttemptsGetPayload<{ select: Prisma.QuizAttemptsSelect }>
  ): AttemptQuizOutDTO {
    return {
      idQuizAttempt: record.id_quiz_attempt,
      quizId: record.quiz_id,
      userId: record.user_id,
      submittedAt: record.submitted_at,
      grade: record.grade,
      durationMinutes: record.duration_minutes,
    };
  }

  private buildPaginatedResponse(
    data: AttemptQuizOutDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedQuizAttempts {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Quiz attempts retrieved successfully',
      data,
      timestamp: new Date().toISOString(),
      page,
      size,
      total,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async getAttempts(
    filters: FiltersAttemptQuiz,
    sort: SortingQuizAttempts
  ): Promise<PaginatedQuizAttempts> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;
    const take = sort.size;
    const select = this.buildSelect();

    const [attempts, total] = await Promise.all([
      this.prismaClient.quizAttempts.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      this.prismaClient.quizAttempts.count({ where }),
    ]);

    const dtos = attempts.map((attempt) => this.buildDTO(attempt));
    return this.buildPaginatedResponse(dtos, total, sort.page, sort.size);
  }

  async getAttemptById(attemptId: string): Promise<AttemptQuizOutDTO> {
    const select = this.buildSelect();
    const attempt = await this.prismaClient.quizAttempts.findUniqueOrThrow({
      where: { id_quiz_attempt: attemptId },
      select,
    });

    return this.buildDTO(attempt);
  }

  async createAttempt(dto: AttemptQuizInDTO): Promise<AttemptQuizOutDTO> {
    const select = this.buildSelect();
    const attempt = await this.prismaClient.quizAttempts.create({
      data: {
        quiz_id: dto.quizId,
        user_id: dto.userId,
        submitted_at: new Date(),
        duration_minutes: 0,
      },
      select,
    });

    return this.buildDTO(attempt);
  }

  async updateAttempt(attemptId: string, dto: AttemptQuizUpdateDTO): Promise<AttemptQuizOutDTO> {
    const select = this.buildSelect();
    const attempt = await this.prismaClient.quizAttempts.update({
      where: { id_quiz_attempt: attemptId },
      data: {
        quiz_id: dto.quizId,
        user_id: dto.userId,
        grade: dto.grade,
      },
      select,
    });

    return this.buildDTO(attempt);
  }

  async deleteAttemptById(attemptId: string): Promise<void> {
    await this.prismaClient.quizAttempts.delete({
      where: { id_quiz_attempt: attemptId },
    });
  }
}
