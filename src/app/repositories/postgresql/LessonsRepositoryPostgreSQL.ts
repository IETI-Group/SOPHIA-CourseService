import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type { FiltersLesson, PaginatedLessons, SortingLessons } from '../../../utils/index.js';
import { SORT_LESSON } from '../../../utils/index.js';
import type {
  LessonSectionInDTO,
  LessonSectionOutLightDTO,
  LessonSectionUpdateDTO,
} from '../../models/index.js';
import type { LessonsRepository } from '../index.js';

export class LessonsRepositoryPostgreSQL implements LessonsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.LessonsWhereInput,
    field: keyof Prisma.LessonsWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.LessonsWhereInput,
    field: keyof Prisma.LessonsWhereInput,
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
    whereClause: Prisma.LessonsWhereInput,
    field: keyof Prisma.LessonsWhereInput,
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
    whereClause: Prisma.LessonsWhereInput,
    field: keyof Prisma.LessonsWhereInput,
    start: Date | null,
    end: Date | null
  ): void {
    if (start !== null || end !== null) {
      const range: Prisma.DateTimeFilter = {};
      if (start !== null) range.gte = start;
      if (end !== null) range.lte = end;
      (whereClause[field] as Prisma.DateTimeFilter) = range;
    }
  }

  private buildWhere(filters: FiltersLesson): Prisma.LessonsWhereInput {
    const whereClause: Prisma.LessonsWhereInput = {};

    this.addExactFilter(whereClause, 'section_id', filters.sectionId);
    this.addExactFilter(whereClause, 'generation_task_id', filters.generationTaskId);
    this.addExactFilter(whereClause, 'lesson_type', filters.lessonType);
    this.addExactFilter(whereClause, 'active', filters.active);
    this.addExactFilter(whereClause, 'ai_generated', filters.aiGenerated);

    this.addTextFilter(whereClause, 'title', filters.title);

    this.addNumericRangeFilter(
      whereClause,
      'duration_minutes',
      filters.durationMinutesMin,
      filters.durationMinutesMax
    );
    this.addNumericRangeFilter(whereClause, 'order', filters.orderMin, filters.orderMax);
    this.addNumericRangeFilter(
      whereClause,
      'estimated_difficulty',
      filters.estimatedDifficultyMin,
      filters.estimatedDifficultyMax
    );

    this.addDateRangeFilter(
      whereClause,
      'created_at',
      filters.createdAtStart,
      filters.createdAtEnd
    );

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_LESSON,
    keyof Prisma.LessonsOrderByWithRelationInput
  > = {
    [SORT_LESSON.TITLE]: 'title',
    [SORT_LESSON.DURATION_MINUTES]: 'duration_minutes',
    [SORT_LESSON.CREATION_DATE]: 'created_at',
    [SORT_LESSON.ACTIVE]: 'active',
    [SORT_LESSON.ORDER]: 'order',
    [SORT_LESSON.AI_GENERATED]: 'ai_generated',
    [SORT_LESSON.ESTIMATED_DIFFICULTY]: 'estimated_difficulty',
    [SORT_LESSON.LESSON_TYPE]: 'lesson_type',
  };

  private buildSort(sortParams: SortingLessons): Prisma.LessonsOrderByWithRelationInput[] {
    const orderBy: Prisma.LessonsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.LessonsSelect {
    const select: Prisma.LessonsSelect = {
      id_lesson: true,
      section_id: true,
      title: true,
      description: true,
      active: true,
      order: true,
      created_at: true,
      duration_minutes: true,
      ai_generated: true,
      generation_task_id: true,
      lesson_type: true,
      estimated_difficulty: true,
    };

    if (lightDTO) {
      delete select.description;
      delete select.ai_generated;
      delete select.generation_task_id;
      delete select.estimated_difficulty;
    }

    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.LessonsGetPayload<{ select: Prisma.LessonsSelect }>
  ): LessonSectionOutLightDTO {
    const baseDTO: LessonSectionOutLightDTO = {
      idLesson: record.id_lesson,
      active: record.active,
      createdAt: record.created_at,
      sectionId: record.section_id,
      title: record.title,
      order: record.order,
      durationMinutes: record.duration_minutes,
      lessonType: record.lesson_type,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO = {
      ...baseDTO,
      description: record.description ?? '',
      aiGenerated: record.ai_generated ?? false,
      generationTaskId: record.generation_task_id ?? null,
      estimatedDifficulty: record.estimated_difficulty ?? 0,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: LessonSectionOutLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedLessons {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Lessons retrieved successfully',
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

  async getLessons(
    filters: FiltersLesson,
    sort: SortingLessons,
    lightDTO: boolean
  ): Promise<PaginatedLessons> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.lessons.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.lessons.count({ where }),
    ]);

    const data: LessonSectionOutLightDTO[] = records.map((record) =>
      this.buildDTO(lightDTO, record)
    );

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getLessonById(lessonId: string, lightDTO: boolean): Promise<LessonSectionOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.lessons.findUniqueOrThrow({
      where: { id_lesson: lessonId },
      select,
    });

    return this.buildDTO(lightDTO, record);
  }

  async createLesson(
    dto: LessonSectionInDTO,
    lightDTO: boolean
  ): Promise<LessonSectionOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.lessons.create({
      data: {
        section_id: dto.sectionId,
        title: dto.title,
        description: dto.description,
        order: dto.order,
        duration_minutes: dto.durationMinutes,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        lesson_type: dto.lessonType,
        estimated_difficulty: dto.estimatedDifficulty,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateLesson(
    lessonId: string,
    dto: LessonSectionUpdateDTO,
    lightDTO: boolean
  ): Promise<LessonSectionOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const updated = await this.prismaClient.lessons.update({
      where: { id_lesson: lessonId },
      data: {
        section_id: dto.sectionId,
        title: dto.title,
        description: dto.description,
        order: dto.order,
        duration_minutes: dto.durationMinutes,
        active: dto.active,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        lesson_type: dto.lessonType,
        estimated_difficulty: dto.estimatedDifficulty,
      },
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteLessonById(lessonId: string): Promise<void> {
    const deleted = await this.prismaClient.lessons.delete({
      where: { id_lesson: lessonId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
