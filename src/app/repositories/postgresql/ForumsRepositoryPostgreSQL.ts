import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type { FiltersForum, PaginatedForums, SortingForums } from '../../../utils/index.js';
import { SORT_FORUM } from '../../../utils/index.js';
import type {
  ForumHeavyDTO,
  ForumInDTO,
  ForumLightDTO,
  ForumUpdateDTO,
} from '../../models/index.js';
import type { ForumsRepository } from '../index.js';

export class ForumsRepositoryPostgreSQL implements ForumsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.CourseForumWhereInput,
    field: keyof Prisma.CourseForumWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  // biome-ignore lint/correctness/noUnusedPrivateClassMembers: It might be used in the future
  private addTextFilter(
    whereClause: Prisma.CourseForumWhereInput,
    field: keyof Prisma.CourseForumWhereInput,
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
    whereClause: Prisma.CourseForumWhereInput,
    field: keyof Prisma.CourseForumWhereInput,
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
    whereClause: Prisma.CourseForumWhereInput,
    field: keyof Prisma.CourseForumWhereInput,
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

  private buildWhere(filters: FiltersForum): Prisma.CourseForumWhereInput {
    const whereClause: Prisma.CourseForumWhereInput = {};

    this.addExactFilter(whereClause, 'course_id', filters.courseId);
    this.addExactFilter(whereClause, 'active', filters.active);

    this.addNumericRangeFilter(
      whereClause,
      'comments_count',
      filters.commentsCountMin,
      filters.commentsCountMax
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
    SORT_FORUM,
    keyof Prisma.CourseForumOrderByWithRelationInput
  > = {
    [SORT_FORUM.ACTIVE]: 'active',
    [SORT_FORUM.CREATION_DATE]: 'created_at',
    [SORT_FORUM.COMMENTS_COUNT]: 'comments_count',
  };

  private buildSort(sortParams: SortingForums): Prisma.CourseForumOrderByWithRelationInput[] {
    const orderBy: Prisma.CourseForumOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(_lightDTO: boolean): Prisma.CourseForumSelect {
    const select: Prisma.CourseForumSelect = {
      id_forum: true,
      course_id: true,
      created_at: true,
      active: true,
      comments_count: true,
    };

    // En este caso no hay diferencia entre light y heavy
    // pero mantenemos la estructura por consistencia
    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.CourseForumGetPayload<{ select: Prisma.CourseForumSelect }>
  ): ForumLightDTO {
    const baseDTO: ForumLightDTO = {
      idForum: record.id_forum,
      courseId: record.course_id,
      createdAt: record.created_at,
      active: record.active,
      commentsCount: record.comments_count,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO: ForumHeavyDTO = {
      ...baseDTO,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: ForumLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedForums {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Forums retrieved successfully',
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

  async getForums(
    filters: FiltersForum,
    sort: SortingForums,
    lightDTO: boolean
  ): Promise<PaginatedForums> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.courseForum.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.courseForum.count({ where }),
    ]);

    const data: ForumLightDTO[] = records.map((record) => this.buildDTO(lightDTO, record));

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getForumById(forumId: string, lightDTO: boolean): Promise<ForumLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.courseForum.findUniqueOrThrow({
      where: { id_forum: forumId },
      select,
    });

    return this.buildDTO(lightDTO, record);
  }

  async getForumByCourseId(courseId: string, lightDTO: boolean): Promise<ForumLightDTO | null> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.courseForum.findFirst({
      where: { course_id: courseId },
      select,
    });

    if (!record) return null;

    return this.buildDTO(lightDTO, record);
  }

  async createForum(dto: ForumInDTO, lightDTO: boolean): Promise<ForumLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.courseForum.create({
      data: {
        course_id: dto.courseId,
        active: dto.active,
        comments_count: 0,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateForum(
    forumId: string,
    dto: Partial<ForumUpdateDTO>,
    lightDTO: boolean
  ): Promise<ForumLightDTO> {
    const select = this.buildSelect(lightDTO);
    const dataToUpdate: Record<string, unknown> = {};

    if (dto.courseId !== undefined) {
      dataToUpdate.course_id = dto.courseId;
    }
    if (dto.active !== undefined) {
      dataToUpdate.active = dto.active;
    }
    if (dto.commentsCount !== undefined) {
      dataToUpdate.comments_count = dto.commentsCount;
    }

    const updated = await this.prismaClient.courseForum.update({
      where: { id_forum: forumId },
      data: dataToUpdate,
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteForumById(forumId: string): Promise<void> {
    const deleted = await this.prismaClient.courseForum.delete({
      where: { id_forum: forumId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
