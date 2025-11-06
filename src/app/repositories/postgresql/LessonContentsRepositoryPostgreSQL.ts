import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersLessonContent,
  Json,
  PaginatedLessonContents,
  SortingLessonContent,
} from '../../../utils/index.js';
import { SORT_LESSON_CONTENT } from '../../../utils/index.js';
import type {
  ContentLessonInDTO,
  ContentLessonOutLightDTO,
  ContentLessonUpdateDTO,
} from '../../models/index.js';
import type { LessonContentsRepository } from '../index.js';

export class LessonContentsRepositoryPostgreSQL implements LessonContentsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.LessonContentsWhereInput,
    field: keyof Prisma.LessonContentsWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addNumericRangeFilter(
    whereClause: Prisma.LessonContentsWhereInput,
    field: keyof Prisma.LessonContentsWhereInput,
    min: number | null,
    max: number | null
  ): void {
    if (min !== null || max !== null) {
      const range: Prisma.IntFilter = {};
      if (min !== null) range.gte = min;
      if (max !== null) range.lte = max;
      (whereClause[field] as Prisma.IntFilter) = range;
    }
  }

  private addDateRangeFilter(
    whereClause: Prisma.LessonContentsWhereInput,
    field: keyof Prisma.LessonContentsWhereInput,
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

  private buildWhere(filters: FiltersLessonContent): Prisma.LessonContentsWhereInput {
    const whereClause: Prisma.LessonContentsWhereInput = {};

    this.addExactFilter(whereClause, 'lesson_id', filters.lessonId);
    this.addExactFilter(whereClause, 'parent_content_id', filters.parentContentId);
    this.addExactFilter(whereClause, 'generation_log_id', filters.generationLogId);
    this.addExactFilter(whereClause, 'content_type', filters.contentType);
    this.addExactFilter(whereClause, 'difficulty_level', filters.difficultyLevel);
    this.addExactFilter(whereClause, 'learning_technique', filters.learningTechnique);
    this.addExactFilter(whereClause, 'active', filters.active);
    this.addExactFilter(whereClause, 'ai_generated', filters.aiGenerated);
    this.addExactFilter(whereClause, 'is_current_version', filters.isCurrentVersion);

    this.addNumericRangeFilter(whereClause, 'version', filters.versionMin, filters.versionMax);
    this.addNumericRangeFilter(
      whereClause,
      'order_preference',
      filters.orderPreferenceMin,
      filters.orderPreferenceMax
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
    SORT_LESSON_CONTENT,
    keyof Prisma.LessonContentsOrderByWithRelationInput
  > = {
    [SORT_LESSON_CONTENT.VERSION]: 'version',
    [SORT_LESSON_CONTENT.ACTIVE]: 'active',
    [SORT_LESSON_CONTENT.DIFFICULTY_LEVEL]: 'difficulty_level',
    [SORT_LESSON_CONTENT.LEARNING_TECHNIQUE]: 'learning_technique',
    [SORT_LESSON_CONTENT.ORDER_PREFERENCE]: 'order_preference',
    [SORT_LESSON_CONTENT.CREATION_DATE]: 'created_at',
    [SORT_LESSON_CONTENT.AI_GENERATED]: 'ai_generated',
    [SORT_LESSON_CONTENT.CONTENT_TYPE]: 'content_type',
  };

  private buildSort(
    sortParams: SortingLessonContent
  ): Prisma.LessonContentsOrderByWithRelationInput[] {
    const orderBy: Prisma.LessonContentsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.LessonContentsSelect {
    const select: Prisma.LessonContentsSelect = {
      id_lesson_content: true,
      version: true,
      lesson_id: true,
      active: true,
      is_current_version: true,
      difficulty_level: true,
      learning_technique: true,
      order_preference: true,
      created_at: true,
      metadata: true,
      ai_generated: true,
      generation_log_id: true,
      content_type: true,
      parent_content_id: true,
    };

    if (lightDTO) {
      delete select.metadata;
      delete select.ai_generated;
      delete select.generation_log_id;
      delete select.content_type;
      delete select.parent_content_id;
    }

    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.LessonContentsGetPayload<{ select: Prisma.LessonContentsSelect }>
  ): ContentLessonOutLightDTO {
    const baseDTO: ContentLessonOutLightDTO = {
      idLessonContent: record.id_lesson_content,
      version: record.version,
      lessonId: record.lesson_id,
      active: record.active,
      isCurrentVersion: record.is_current_version,
      difficultyLevel: record.difficulty_level,
      learningTechnique: record.learning_technique,
      orderPreference: record.order_preference,
      createdAt: record.created_at,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO = {
      ...baseDTO,
      metadata: (record.metadata ?? null) as Json,
      aiGenerated: record.ai_generated ?? false,
      generationLogId: record.generation_log_id ?? null,
      contentType: record.content_type ?? 'TEXT',
      parentContentId: record.parent_content_id ?? null,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: ContentLessonOutLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedLessonContents {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Lesson contents retrieved successfully',
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

  async getLessonContents(
    filters: FiltersLessonContent,
    sort: SortingLessonContent,
    lightDTO: boolean
  ): Promise<PaginatedLessonContents> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.lessonContents.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.lessonContents.count({ where }),
    ]);

    const data: ContentLessonOutLightDTO[] = records.map((record) =>
      this.buildDTO(lightDTO, record)
    );

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getLessonContentById(
    lessonContentId: string,
    lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.lessonContents.findUniqueOrThrow({
      where: { id_lesson_content: lessonContentId },
      select,
    });

    return this.buildDTO(lightDTO, record);
  }

  async createLessonContent(
    dto: ContentLessonInDTO,
    lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.lessonContents.create({
      data: {
        lesson_id: dto.lessonId,
        metadata: dto.metadata as Prisma.InputJsonValue,
        difficulty_level: dto.difficultyLevel,
        learning_technique: dto.learningTechnique,
        order_preference: dto.orderPreference,
        ai_generated: dto.aiGenerated,
        generation_log_id: dto.generationLogId,
        content_type: dto.contentType,
        parent_content_id: dto.parentContentId,
        version: 1,
        is_current_version: true,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateLessonContent(
    lessonContentId: string,
    dto: Partial<ContentLessonUpdateDTO>,
    lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO> {
    const select = this.buildSelect(lightDTO);
    const dataToUpdate: Record<string, unknown> = {};

    if (dto.lessonId !== undefined) {
      dataToUpdate.lesson_id = dto.lessonId;
    }
    if (dto.metadata !== undefined) {
      dataToUpdate.metadata = dto.metadata as Prisma.InputJsonValue;
    }
    if (dto.difficultyLevel !== undefined) {
      dataToUpdate.difficulty_level = dto.difficultyLevel;
    }
    if (dto.learningTechnique !== undefined) {
      dataToUpdate.learning_technique = dto.learningTechnique;
    }
    if (dto.orderPreference !== undefined) {
      dataToUpdate.order_preference = dto.orderPreference;
    }
    if (dto.active !== undefined) {
      dataToUpdate.active = dto.active;
    }
    if (dto.isCurrentVersion !== undefined) {
      dataToUpdate.is_current_version = dto.isCurrentVersion;
    }
    if (dto.aiGenerated !== undefined) {
      dataToUpdate.ai_generated = dto.aiGenerated;
    }
    if (dto.generationLogId !== undefined) {
      dataToUpdate.generation_log_id = dto.generationLogId;
    }
    if (dto.contentType !== undefined) {
      dataToUpdate.content_type = dto.contentType;
    }
    if (dto.parentContentId !== undefined) {
      dataToUpdate.parent_content_id = dto.parentContentId;
    }

    const updated = await this.prismaClient.lessonContents.update({
      where: { id_lesson_content: lessonContentId },
      data: dataToUpdate,
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteLessonContentById(lessonContentId: string): Promise<void> {
    const deleted = await this.prismaClient.lessonContents.delete({
      where: { id_lesson_content: lessonContentId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
