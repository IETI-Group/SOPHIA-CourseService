import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersCourse,
  Json,
  PaginatedCourses,
  SortingCourses,
} from '../../../utils/index.js';
import type {
  CourseHeavyDTO,
  CourseInDTO,
  CourseLightDTO,
  CourseUpdateDTO,
} from '../../models/index.js';
import type { CoursesRepository } from '../index.js';

export class CoursesRepositoryPostgreSQL implements CoursesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.CoursesWhereInput,
    field: keyof Prisma.CoursesWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.CoursesWhereInput,
    field: keyof Prisma.CoursesWhereInput,
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
    whereClause: Prisma.CoursesWhereInput,
    field: keyof Prisma.CoursesWhereInput,
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
    whereClause: Prisma.CoursesWhereInput,
    field: keyof Prisma.CoursesWhereInput,
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

  private buildWhere(filters: FiltersCourse): Prisma.CoursesWhereInput {
    const whereClause: Prisma.CoursesWhereInput = {};

    this.addExactFilter(whereClause, 'instructor_id', filters.instructorId);
    this.addExactFilter(whereClause, 'generation_task_id', filters.generationTaskId);
    this.addExactFilter(whereClause, 'level', filters.level);
    this.addExactFilter(whereClause, 'status', filters.status);
    this.addExactFilter(whereClause, 'active', filters.active);
    this.addExactFilter(whereClause, 'ai_generated', filters.aiGenerated);

    this.addTextFilter(whereClause, 'title', filters.title);

    this.addNumericRangeFilter(whereClause, 'price', filters.priceMin, filters.priceMax);
    this.addNumericRangeFilter(
      whereClause,
      'average_reviews',
      filters.averageReviewsMin,
      filters.averageReviewsMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'duration_hours',
      filters.durationHoursMin,
      filters.durationHoursMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'total_lessons',
      filters.totalLessonsMin,
      filters.totalLessonsMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'total_reviews',
      filters.totalReviewsMin,
      filters.totalReviewsMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'total_enrollments',
      filters.totalEnrollmentsMin,
      filters.totalEnrollmentsMax
    );

    this.addDateRangeFilter(
      whereClause,
      'created_at',
      filters.createdAtStart,
      filters.createdAtEnd
    );
    this.addDateRangeFilter(
      whereClause,
      'updated_at',
      filters.updatedAtStart,
      filters.updatedAtEnd
    );
    this.addDateRangeFilter(
      whereClause,
      'published_at',
      filters.publishedAtStart,
      filters.publishedAtEnd
    );
    this.addDateRangeFilter(
      whereClause,
      'last_ai_update_at',
      filters.lastAIUpdateAtStart,
      filters.lastAIUpdateAtEnd
    );

    return whereClause;
  }

  private buildSort(sortParams: SortingCourses): Prisma.CoursesOrderByWithRelationInput[] {
    const orderBy: Prisma.CoursesOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      switch (sortField) {
        case 'TITLE':
          orderBy.push({ title: direction });
          break;
        case 'LEVEL':
          orderBy.push({ level: direction });
          break;
        case 'STATUS':
          orderBy.push({ status: direction });
          break;
        case 'ACTIVE':
          orderBy.push({ active: direction });
          break;
        case 'AI_GENERATED':
          orderBy.push({ ai_generated: direction });
          break;
        case 'PRICE':
          orderBy.push({ price: direction });
          break;
        case 'AVERAGE_REVIEWS':
          orderBy.push({ average_reviews: direction });
          break;
        case 'DURATION_HOURS':
          orderBy.push({ duration_hours: direction });
          break;
        case 'TOTAL_LESSONS':
          orderBy.push({ total_lessons: direction });
          break;
        case 'TOTAL_REVIEWS':
          orderBy.push({ total_reviews: direction });
          break;
        case 'TOTAL_ENROLLMENTS':
          orderBy.push({ total_enrollments: direction });
          break;
        case 'CREATION_DATE':
          orderBy.push({ created_at: direction });
          break;
        case 'LAST_UPDATE':
          orderBy.push({ updated_at: direction });
          break;
        case 'PUBLISHING_DATE':
          orderBy.push({ published_at: direction });
          break;
        case 'LAST_AI_UPDATE':
          orderBy.push({ last_ai_update_at: direction });
          break;
        default:
          break;
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.CoursesSelect {
    const select: Prisma.CoursesSelect = {
      id_course: true,
      instructor_id: true,
      title: true,
      description: true,
      price: true,
      level: true,
      active: true,
      status: true,
      average_reviews: true,
      duration_hours: true,
      total_lessons: true,
      total_reviews: true,
      total_enrollments: true,
      created_at: true,
      updated_at: true,
      published_at: true,
      ai_generated: true,
      generation_task_id: true,
      generation_metadata: true,
      last_ai_update_at: true,
    };

    if (lightDTO) {
      delete select.description;
      delete select.ai_generated;
      delete select.generation_task_id;
      delete select.generation_metadata;
      delete select.last_ai_update_at;
    }

    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.CoursesGetPayload<{ select: Prisma.CoursesSelect }>
  ): CourseLightDTO {
    const baseDTO: CourseLightDTO = {
      idCourse: record.id_course,
      instructorId: record.instructor_id,
      title: record.title,
      price: record.price,
      level: record.level,
      active: record.active,
      status: record.status,
      averageReviews: record.average_reviews,
      durationHours: record.duration_hours,
      totalLessons: record.total_lessons,
      totalReviews: record.total_reviews,
      totalEnrollments: record.total_enrollments,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
      publishedAt: record.published_at,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO: CourseHeavyDTO = {
      ...baseDTO,
      description: record.description ?? '',
      aiGenerated: record.ai_generated ?? false,
      generationTaskId: record.generation_task_id ?? null,
      generationMetadata: (record.generation_metadata ?? null) as Json,
      lastAIUpdateAt: record.last_ai_update_at ?? null,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: CourseLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedCourses {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Courses retrieved successfully',
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

  async getCourses(
    filters: FiltersCourse,
    sort: SortingCourses,
    lightDTO: boolean
  ): Promise<PaginatedCourses> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.courses.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.courses.count({ where }),
    ]);

    const data: CourseLightDTO[] = records.map((record) => this.buildDTO(lightDTO, record));

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getCourseById(courseId: string, lightDTO: boolean): Promise<CourseLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.courses.findUniqueOrThrow({
      where: { id_course: courseId },
      select,
    });

    return this.buildDTO(lightDTO, record);
  }

  async createCourse(dto: CourseInDTO, lightDTO: boolean): Promise<CourseLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.courses.create({
      data: {
        instructor_id: dto.instructorId,
        title: dto.title,
        description: dto.description,
        price: dto.price,
        level: dto.level,
        status: 'DRAFT',
        average_reviews: 0,
        total_reviews: 0,
        total_enrollments: 0,
        duration_hours: 0,
        total_lessons: 0,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        generation_metadata: dto.generationMetadata as Prisma.InputJsonValue,
        last_ai_update_at: dto.lastAIUpdateAt,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateCourse(
    courseId: string,
    dto: CourseUpdateDTO,
    lightDTO: boolean
  ): Promise<CourseLightDTO> {
    const select = this.buildSelect(lightDTO);

    const updated = await this.prismaClient.courses.update({
      where: { id_course: courseId },
      data: {
        instructor_id: dto.instructorId,
        title: dto.title,
        description: dto.description,
        price: dto.price,
        level: dto.level,
        active: dto.active,
        status: dto.status,
        ai_generated: dto.aiGenerated,
        generation_task_id: dto.generationTaskId,
        generation_metadata: dto.generationMetadata as Prisma.InputJsonValue,
        last_ai_update_at: dto.lastAIUpdateAt,
      },
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteCourseById(courseId: string): Promise<void> {
    const deleted = await this.prismaClient.courses.delete({
      where: { id_course: courseId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
