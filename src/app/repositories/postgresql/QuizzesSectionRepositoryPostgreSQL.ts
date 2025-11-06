import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersQuizSection,
  PaginatedQuizzes,
  SortingSectionQuizzes,
} from '../../../utils/index.js';
import { SORT_QUIZ_SECTION } from '../../../utils/index.js';
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

  private addExactFilter<T>(
    whereClause: Prisma.QuizzesWhereInput,
    field: keyof Prisma.QuizzesWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.QuizzesWhereInput,
    field: keyof Prisma.QuizzesWhereInput,
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
    whereClause: Prisma.QuizzesWhereInput,
    field: keyof Prisma.QuizzesWhereInput,
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

  private addDateRangeFilter(
    whereClause: Prisma.QuizzesWhereInput,
    field: keyof Prisma.QuizzesWhereInput,
    start: Date | null,
    end: Date | null
  ): void {
    if (start !== null || end !== null) {
      const filter: Prisma.DateTimeFilter = {};
      if (start !== null) filter.gte = start;
      if (end !== null) filter.lte = end;
      (whereClause[field] as Prisma.DateTimeFilter) = filter;
    }
  }

  private buildWhere(filters: FiltersQuizSection): Prisma.QuizzesWhereInput {
    const whereClause: Prisma.QuizzesWhereInput = {};

    this.addExactFilter(whereClause, 'section_id', filters.sectionId);
    this.addExactFilter(whereClause, 'generation_task_id', filters.generationTaskId);
    this.addExactFilter(whereClause, 'active', filters.active);
    this.addExactFilter(whereClause, 'ai_generated', filters.aiGenerated);

    this.addTextFilter(whereClause, 'title', filters.title);

    this.addNumericRangeFilter(
      whereClause,
      'duration_minutes',
      filters.durationMinutesMin,
      filters.durationMinutesMax
    );

    this.addDateRangeFilter(
      whereClause,
      'created_at',
      filters.createdAtStart,
      filters.createdAtEnd
    );

    return whereClause;
  }

  private buildSort(sortParams: SortingSectionQuizzes): Prisma.QuizzesOrderByWithRelationInput[] {
    const orderBy: Prisma.QuizzesOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      switch (sortField) {
        case SORT_QUIZ_SECTION.AI_GENERATED:
          orderBy.push({ ai_generated: direction });
          break;
        case SORT_QUIZ_SECTION.CREATION_DATE:
          orderBy.push({ created_at: direction });
          break;
        case SORT_QUIZ_SECTION.ACTIVE:
          orderBy.push({ active: direction });
          break;
        case SORT_QUIZ_SECTION.DURATION_MINUTES:
          orderBy.push({ duration_minutes: direction });
          break;
        case SORT_QUIZ_SECTION.TITLE:
          orderBy.push({ title: direction });
          break;
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.QuizzesSelect {
    const select: Prisma.QuizzesSelect = {
      id_quiz: true,
      created_at: true,
      active: true,
      duration_minutes: true,
      section_id: true,
      title: true,
    };

    if (!lightDTO) {
      select.description = true;
      select.ai_generated = true;
      select.generation_task_id = true;
      select.difficulty_distribution = true;
      select.adaptative_logic = true;
    }

    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.QuizzesGetPayload<{ select: Prisma.QuizzesSelect }>
  ): QuizSectionOutLightDTO {
    const dto: QuizSectionOutLightDTO = {
      idQuiz: record.id_quiz,
      createdAt: record.created_at,
      active: record.active,
      durationMinutes: record.duration_minutes,
      sectionId: record.section_id,
      title: record.title,
    };

    if (!lightDTO && 'description' in record) {
      return {
        ...dto,
        description: record.description,
        aiGenerated: record.ai_generated,
        generationTaskId: record.generation_task_id,
        difficultyDistribution: record.difficulty_distribution,
        adaptativeLogic: record.adaptative_logic,
      } as never;
    }

    return dto;
  }

  private buildPaginatedResponse(
    data: QuizSectionOutLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedQuizzes {
    const totalPages = Math.ceil(total / size);
    return {
      success: true,
      message: 'Quizzes retrieved successfully',
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

  async getQuizzes(
    filters: FiltersQuizSection,
    sort: SortingSectionQuizzes,
    lightDTO: boolean
  ): Promise<PaginatedQuizzes> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const skip = (sort.page - 1) * sort.size;
    const take = sort.size;

    const [total, quizzes] = await Promise.all([
      this.prismaClient.quizzes.count({ where }),
      this.prismaClient.quizzes.findMany({
        where,
        orderBy,
        select,
        skip,
        take,
      }),
    ]);

    const dtos = quizzes.map((quiz) => this.buildDTO(lightDTO, quiz));

    return this.buildPaginatedResponse(dtos, total, sort.page, sort.size);
  }

  async getQuizById(quizId: string, lightDTO: boolean): Promise<QuizSectionOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const quiz = await this.prismaClient.quizzes.findUniqueOrThrow({
      where: { id_quiz: quizId },
      select,
    });

    return this.buildDTO(lightDTO, quiz);
  }

  async createQuiz(dto: QuizSectionInDTO, lightDTO: boolean): Promise<QuizSectionOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const quiz = await this.prismaClient.quizzes.create({
      data: {
        section_id: dto.sectionId,
        description: dto.description,
        title: dto.title,
        duration_minutes: 0,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        difficulty_distribution: dto.difficultyDistribution as never,
        adaptative_logic: dto.adaptativeLogic as never,
      },
      select,
    });

    return this.buildDTO(lightDTO, quiz);
  }

  async updateQuiz(
    quizId: string,
    dto: Partial<QuizSectionUpdateDTO>,
    lightDTO: boolean
  ): Promise<QuizSectionOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const dataToUpdate: Record<string, unknown> = {};

    if (dto.sectionId !== undefined) {
      dataToUpdate.section_id = dto.sectionId;
    }
    if (dto.description !== undefined) {
      dataToUpdate.description = dto.description;
    }
    if (dto.title !== undefined) {
      dataToUpdate.title = dto.title;
    }
    if (dto.aiGenerated !== undefined) {
      dataToUpdate.ai_generated = dto.aiGenerated;
    }
    if (dto.generationTaskId !== undefined) {
      dataToUpdate.generation_task_id = dto.generationTaskId;
    }
    if (dto.difficultyDistribution !== undefined) {
      dataToUpdate.difficulty_distribution = dto.difficultyDistribution as never;
    }
    if (dto.adaptativeLogic !== undefined) {
      dataToUpdate.adaptative_logic = dto.adaptativeLogic as never;
    }
    if (dto.active !== undefined) {
      dataToUpdate.active = dto.active;
    }
    if (dto.durationMinutes !== undefined) {
      dataToUpdate.duration_minutes = dto.durationMinutes;
    }

    const quiz = await this.prismaClient.quizzes.update({
      where: { id_quiz: quizId },
      data: dataToUpdate,
      select,
    });

    return this.buildDTO(lightDTO, quiz);
  }

  async deleteQuizById(quizId: string): Promise<void> {
    await this.prismaClient.quizzes.delete({
      where: { id_quiz: quizId },
    });
  }
}
