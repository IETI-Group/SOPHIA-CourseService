import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersProgressContent,
  PaginatedContentProgress,
  SortingContentProgress,
} from '../../../utils/index.js';
import { SORT_PROGRESS_CONTENT } from '../../../utils/sort_types/index.js';
import type {
  ProgressContentInDTO,
  ProgressContentOutDTO,
  ProgressContentUpdateDTO,
} from '../../models/index.js';
import type { ProgressContentRepository } from '../index.js';

export class ProgressContentRepositoryPostgreSQL implements ProgressContentRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.LessonContentProgressWhereInput,
    field: keyof Prisma.LessonContentProgressWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addNumericRangeFilter(
    whereClause: Prisma.LessonContentProgressWhereInput,
    field: keyof Prisma.LessonContentProgressWhereInput,
    min: number | null,
    max: number | null
  ): void {
    if (min !== null || max !== null) {
      const range: Prisma.IntFilter | Prisma.FloatFilter = {};
      if (min !== null) range.gte = min;
      if (max !== null) range.lte = max;
      (whereClause[field] as Prisma.IntFilter | Prisma.FloatFilter) = range;
    }
  }

  private addDateRangeFilter(
    whereClause: Prisma.LessonContentProgressWhereInput,
    field: keyof Prisma.LessonContentProgressWhereInput,
    start: Date | null,
    end: Date | null
  ): void {
    if (start !== null || end !== null) {
      const range: Prisma.DateTimeNullableFilter = {};
      if (start !== null) range.gte = start;
      if (end !== null) range.lte = end;
      (whereClause[field] as Prisma.DateTimeNullableFilter) = range;
    }
  }

  private buildWhere(filters: FiltersProgressContent): Prisma.LessonContentProgressWhereInput {
    const whereClause: Prisma.LessonContentProgressWhereInput = {};

    this.addExactFilter(whereClause, 'user_id', filters.userId);
    this.addExactFilter(whereClause, 'lesson_content_id', filters.lessonContentId);
    this.addExactFilter(whereClause, 'active', filters.active);

    this.addNumericRangeFilter(
      whereClause,
      'time_spend_minutes',
      filters.timeSpendMinutesMin,
      filters.timeSpendMinutesMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'completion_percentage',
      filters.completionPercentageMin,
      filters.completionPercentageMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'effectiviness_score',
      filters.effectivinessScoreMin,
      filters.effectivinessScoreMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'user_rating',
      filters.userRatingMin,
      filters.userRatingMax
    );

    this.addDateRangeFilter(
      whereClause,
      'started_at',
      filters.startedAtStart,
      filters.startedAtEnd
    );
    this.addDateRangeFilter(
      whereClause,
      'completed_at',
      filters.completedAtStart,
      filters.completedAtEnd
    );

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_PROGRESS_CONTENT,
    keyof Prisma.LessonContentProgressOrderByWithRelationInput
  > = {
    [SORT_PROGRESS_CONTENT.START_DATE]: 'started_at',
    [SORT_PROGRESS_CONTENT.COMPLETED_DATE]: 'completed_at',
    [SORT_PROGRESS_CONTENT.EFFECTIVINESS_SCORE]: 'effectiviness_score',
    [SORT_PROGRESS_CONTENT.ACTIVE]: 'active',
    [SORT_PROGRESS_CONTENT.USER_RATING]: 'user_rating',
    [SORT_PROGRESS_CONTENT.TIME_SPEND_MINUTES]: 'time_spend_minutes',
    [SORT_PROGRESS_CONTENT.COMPLETION_PERCENTAGE]: 'completion_percentage',
  };

  private buildSort(
    sortParams: SortingContentProgress
  ): Prisma.LessonContentProgressOrderByWithRelationInput[] {
    const orderBy: Prisma.LessonContentProgressOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(): Prisma.LessonContentProgressSelect {
    return {
      id_content_progress: true,
      user_id: true,
      lesson_content_id: true,
      started_at: true,
      completed_at: true,
      time_spend_minutes: true,
      completion_percentage: true,
      effectiviness_score: true,
      active: true,
      user_rating: true,
    };
  }

  private buildDTO(
    record: Prisma.LessonContentProgressGetPayload<{ select: Prisma.LessonContentProgressSelect }>
  ): ProgressContentOutDTO {
    return {
      idContentProgress: record.id_content_progress,
      userId: record.user_id,
      lessonContentId: record.lesson_content_id,
      startedAt: record.started_at,
      completedAt: record.completed_at,
      timeSpendMinutes: record.time_spend_minutes,
      completionPercentage: record.completion_percentage,
      effectivinessScore: record.effectiviness_score,
      active: record.active,
      userRating: record.user_rating,
    };
  }

  private buildPaginatedResponse(
    data: ProgressContentOutDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedContentProgress {
    const totalPages = Math.ceil(total / size);

    return {
      success: true,
      message: 'Content progress retrieved successfully',
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

  async getProgress(
    filters: FiltersProgressContent,
    sort: SortingContentProgress
  ): Promise<PaginatedContentProgress> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect();

    const total = await this.prismaClient.lessonContentProgress.count({ where });

    const records = await this.prismaClient.lessonContentProgress.findMany({
      where,
      orderBy,
      select,
      skip: (sort.page - 1) * sort.size,
      take: sort.size,
    });

    const data = records.map((record) => this.buildDTO(record));

    return this.buildPaginatedResponse(data, total, sort.page, sort.size);
  }

  async getProgressById(progressId: string): Promise<ProgressContentOutDTO> {
    const select = this.buildSelect();

    const record = await this.prismaClient.lessonContentProgress.findUniqueOrThrow({
      where: { id_content_progress: progressId },
      select,
    });

    return this.buildDTO(record);
  }

  async createProgress(dto: ProgressContentInDTO): Promise<ProgressContentOutDTO> {
    const select = this.buildSelect();

    const record = await this.prismaClient.lessonContentProgress.create({
      data: {
        user_id: dto.userId,
        lesson_content_id: dto.lessonContentId,
        started_at: new Date(),
        time_spend_minutes: 0,
        completion_percentage: 0.0,
        effectiviness_score: 0.0,
        active: false,
      },
      select,
    });

    return this.buildDTO(record);
  }

  async updateProgress(
    progressId: string,
    dto: ProgressContentUpdateDTO
  ): Promise<ProgressContentOutDTO> {
    const select = this.buildSelect();

    const record = await this.prismaClient.lessonContentProgress.update({
      where: { id_content_progress: progressId },
      data: {
        user_id: dto.userId,
        lesson_content_id: dto.lessonContentId,
        time_spend_minutes: dto.timeSpendMinutes,
        completion_percentage: dto.completionPercentage,
        effectiviness_score: dto.effectivinessScore,
        active: dto.active,
        user_rating: dto.userRating,
        completed_at: dto.completionPercentage === 100 ? new Date() : undefined,
      },
      select,
    });

    return this.buildDTO(record);
  }

  async deleteProgressById(progressId: string): Promise<void> {
    await this.prismaClient.lessonContentProgress.delete({
      where: { id_content_progress: progressId },
    });
  }
}
