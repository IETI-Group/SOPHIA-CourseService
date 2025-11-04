import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type { FiltersSection, PaginatedSections, SortingSections } from '../../../utils/index.js';
import { SORT_SECTION } from '../../../utils/index.js';
import type {
  SectionCourseInDTO,
  SectionCourseOutLightDTO,
  SectionCourseUpdateDTO,
} from '../../models/index.js';
import type { SectionsRepository } from '../index.js';

export class SectionsRepositoryPostgreSQL implements SectionsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.SectionsWhereInput,
    field: keyof Prisma.SectionsWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.SectionsWhereInput,
    field: keyof Prisma.SectionsWhereInput,
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
    whereClause: Prisma.SectionsWhereInput,
    field: keyof Prisma.SectionsWhereInput,
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
    whereClause: Prisma.SectionsWhereInput,
    field: keyof Prisma.SectionsWhereInput,
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

  private buildWhere(filters: FiltersSection): Prisma.SectionsWhereInput {
    const whereClause: Prisma.SectionsWhereInput = {};

    this.addExactFilter(whereClause, 'course_id', filters.courseId);
    this.addExactFilter(whereClause, 'generation_task_id', filters.generationTaskId);
    this.addExactFilter(whereClause, 'active', filters.active);
    this.addExactFilter(whereClause, 'ai_generated', filters.aiGenerated);
    this.addExactFilter(whereClause, 'suggested_by_ai', filters.suggestedByAI);

    this.addTextFilter(whereClause, 'title', filters.title);

    this.addNumericRangeFilter(
      whereClause,
      'duration_hours',
      filters.durationHoursMin,
      filters.durationHoursMax
    );
    this.addNumericRangeFilter(whereClause, 'order', filters.orderMin, filters.orderMax);

    this.addDateRangeFilter(
      whereClause,
      'created_at',
      filters.createdAtStart,
      filters.createdAtEnd
    );

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_SECTION,
    keyof Prisma.SectionsOrderByWithRelationInput
  > = {
    [SORT_SECTION.TITLE]: 'title',
    [SORT_SECTION.DURATION_HOURS]: 'duration_hours',
    [SORT_SECTION.CREATION_DATE]: 'created_at',
    [SORT_SECTION.ACTIVE]: 'active',
    [SORT_SECTION.ORDER]: 'order',
    [SORT_SECTION.AI_GENERATED]: 'ai_generated',
    [SORT_SECTION.SUGGESTED_BY_AI]: 'suggested_by_ai',
  };

  private buildSort(sortParams: SortingSections): Prisma.SectionsOrderByWithRelationInput[] {
    const orderBy: Prisma.SectionsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.SectionsSelect {
    const select: Prisma.SectionsSelect = {
      id_section: true,
      course_id: true,
      title: true,
      description: true,
      active: true,
      order: true,
      duration_hours: true,
      created_at: true,
      ai_generated: true,
      generation_task_id: true,
      suggested_by_ai: true,
    };

    if (lightDTO) {
      delete select.description;
      delete select.ai_generated;
      delete select.generation_task_id;
      delete select.suggested_by_ai;
    }

    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.SectionsGetPayload<{ select: Prisma.SectionsSelect }>
  ): SectionCourseOutLightDTO {
    const baseDTO: SectionCourseOutLightDTO = {
      idSection: record.id_section,
      courseId: record.course_id,
      title: record.title,
      durationHours: record.duration_hours,
      createdAt: record.created_at,
      active: record.active,
      order: record.order,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO = {
      ...baseDTO,
      description: record.description ?? '',
      aiGenerated: record.ai_generated ?? false,
      generationTaskId: record.generation_task_id ?? null,
      suggestedByAi: record.suggested_by_ai ?? false,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: SectionCourseOutLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedSections {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Sections retrieved successfully',
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

  async getSections(
    filters: FiltersSection,
    sort: SortingSections,
    lightDTO: boolean
  ): Promise<PaginatedSections> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.sections.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.sections.count({ where }),
    ]);

    const data: SectionCourseOutLightDTO[] = records.map((record) =>
      this.buildDTO(lightDTO, record)
    );

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getSectionById(sectionId: string, lightDTO: boolean): Promise<SectionCourseOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.sections.findUniqueOrThrow({
      where: { id_section: sectionId },
      select,
    });

    return this.buildDTO(lightDTO, record);
  }

  async createSection(
    dto: SectionCourseInDTO,
    lightDTO: boolean
  ): Promise<SectionCourseOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.sections.create({
      data: {
        course_id: dto.courseId,
        title: dto.title,
        description: dto.description,
        order: dto.order,
        duration_hours: 0,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        suggested_by_ai: dto.suggestedByAi,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateSection(
    sectionId: string,
    dto: SectionCourseUpdateDTO,
    lightDTO: boolean
  ): Promise<SectionCourseOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const updated = await this.prismaClient.sections.update({
      where: { id_section: sectionId },
      data: {
        course_id: dto.courseId,
        title: dto.title,
        description: dto.description,
        order: dto.order,
        active: dto.active,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        suggested_by_ai: dto.suggestedByAi,
      },
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteSectionById(sectionId: string): Promise<void> {
    const deleted = await this.prismaClient.sections.delete({
      where: { id_section: sectionId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
