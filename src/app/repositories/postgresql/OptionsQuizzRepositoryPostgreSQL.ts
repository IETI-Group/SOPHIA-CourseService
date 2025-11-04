import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersOptionQuiz,
  PaginatedQuizOptions,
  SortingQuizOptions,
} from '../../../utils/index.js';
import { SORT_OPTION_QUIZ } from '../../../utils/sort_types/index.js';
import type { OptionQuizInDTO, OptionQuizOutDTO } from '../../models/index.js';
import type { OptionsQuizzRepository } from '../index.js';

export class OptionsQuizzRepositoryPostgreSQL implements OptionsQuizzRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.QuizOptionsWhereInput,
    field: keyof Prisma.QuizOptionsWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.QuizOptionsWhereInput,
    field: keyof Prisma.QuizOptionsWhereInput,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as { contains: string; mode: Prisma.QueryMode }) = {
        contains: value,
        mode: 'insensitive',
      };
    }
  }

  private buildWhere(filters: FiltersOptionQuiz): Prisma.QuizOptionsWhereInput {
    const whereClause: Prisma.QuizOptionsWhereInput = {};

    this.addExactFilter(whereClause, 'quiz_question_id', filters.quizQuestionId);
    this.addExactFilter(whereClause, 'is_correct', filters.isCorrect);

    this.addTextFilter(whereClause, 'option', filters.option);

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_OPTION_QUIZ,
    keyof Prisma.QuizOptionsOrderByWithRelationInput
  > = {
    [SORT_OPTION_QUIZ.OPTION]: 'option',
  };

  private buildSort(sortParams: SortingQuizOptions): Prisma.QuizOptionsOrderByWithRelationInput[] {
    const orderBy: Prisma.QuizOptionsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(): Prisma.QuizOptionsSelect {
    return {
      id_option: true,
      quiz_question_id: true,
      option: true,
      is_correct: true,
    };
  }

  private buildDTO(
    record: Prisma.QuizOptionsGetPayload<{ select: Prisma.QuizOptionsSelect }>
  ): OptionQuizOutDTO {
    return {
      idQuizOption: record.id_option,
      quizQuestionId: record.quiz_question_id,
      option: record.option,
      isCorrect: record.is_correct,
    };
  }

  private buildPaginatedResponse(
    data: OptionQuizOutDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedQuizOptions {
    const totalPages = Math.ceil(total / size);

    return {
      success: true,
      message: 'Quiz options retrieved successfully',
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

  async getOptions(
    filters: FiltersOptionQuiz,
    sort: SortingQuizOptions
  ): Promise<PaginatedQuizOptions> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect();

    const total = await this.prismaClient.quizOptions.count({ where });

    const records = await this.prismaClient.quizOptions.findMany({
      where,
      orderBy,
      select,
      skip: (sort.page - 1) * sort.size,
      take: sort.size,
    });

    const data = records.map((record) => this.buildDTO(record));

    return this.buildPaginatedResponse(data, total, sort.page, sort.size);
  }

  async getOptionById(optionId: string): Promise<OptionQuizOutDTO> {
    const select = this.buildSelect();

    const record = await this.prismaClient.quizOptions.findUniqueOrThrow({
      where: { id_option: optionId },
      select,
    });

    return this.buildDTO(record);
  }

  async createOption(dto: OptionQuizInDTO): Promise<OptionQuizOutDTO> {
    const select = this.buildSelect();

    const record = await this.prismaClient.quizOptions.create({
      data: {
        quiz_question_id: dto.quizQuestionId,
        option: dto.option,
        is_correct: dto.isCorrect,
      },
      select,
    });

    return this.buildDTO(record);
  }

  async updateOption(optionId: string, dto: OptionQuizInDTO): Promise<OptionQuizOutDTO> {
    const select = this.buildSelect();

    const record = await this.prismaClient.quizOptions.update({
      where: { id_option: optionId },
      data: {
        quiz_question_id: dto.quizQuestionId,
        option: dto.option,
        is_correct: dto.isCorrect,
      },
      select,
    });

    return this.buildDTO(record);
  }

  async deleteOptionById(optionId: string): Promise<void> {
    await this.prismaClient.quizOptions.delete({
      where: { id_option: optionId },
    });
  }
}
