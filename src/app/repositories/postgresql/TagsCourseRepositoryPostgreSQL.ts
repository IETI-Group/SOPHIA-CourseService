import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type { FiltersTag, PaginatedTags, SORT_TAG, SortingTags } from '../../../utils/index.js';
import type { TagCourseInDTO, TagCourseOutDTO } from '../../models/index.js';
import type { TagsCourseRepository } from '../index.js';

export class TagsCourseRepositoryPostgreSQL implements TagsCourseRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(value: T | null, field: string, where: Record<string, unknown>): void {
    if (value !== null && value !== undefined) {
      where[field] = value;
    }
  }

  private addDateRangeFilter(
    start: Date | null,
    end: Date | null,
    field: string,
    where: Record<string, unknown>
  ): void {
    if (start !== null || end !== null) {
      const rangeFilter: Prisma.DateTimeFilter = {};
      if (start !== null) rangeFilter.gte = start;
      if (end !== null) rangeFilter.lte = end;
      where[field] = rangeFilter;
    }
  }

  private buildWhere(filters: FiltersTag): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    this.addExactFilter(filters.courseId, 'course_id', where);
    this.addExactFilter(filters.categoryId, 'category_id', where);

    if (filters.name !== null && filters.name !== undefined && filters.name.trim() !== '') {
      where.categories = {
        name: { contains: filters.name, mode: 'insensitive' },
      };
    }

    this.addDateRangeFilter(filters.createdAtStart, filters.createdAtEnd, 'created_at', where);

    return where;
  }

  private buildSort(sort: SortingTags): Record<string, unknown>[] {
    const orderBy: Record<string, unknown>[] = [];

    for (const field of sort.sortFields) {
      switch (field) {
        case 'CREATION_DATE' as SORT_TAG:
          orderBy.push({ created_at: sort.sortDirection });
          break;
        case 'NAME' as SORT_TAG:
          orderBy.push({ categories: { name: sort.sortDirection } });
          break;
      }
    }

    return orderBy;
  }

  private buildDTO(tag: {
    category_id: string;
    course_id: string;
    created_at: Date;
    categories: {
      name: string;
    };
  }): TagCourseOutDTO {
    return {
      categoryId: tag.category_id,
      courseId: tag.course_id,
      createdAt: tag.created_at,
      name: tag.categories.name,
    };
  }

  private buildPaginatedResponse(
    data: TagCourseOutDTO[],
    page: number,
    size: number,
    total: number
  ): PaginatedTags {
    return {
      success: true,
      message: 'Tags retrieved successfully',
      data,
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      hasNext: page * size < total,
      hasPrev: page > 1,
      timestamp: new Date().toISOString(),
    };
  }

  private parseCompositeKey(tagId: string): { categoryId: string; courseId: string } {
    const [categoryId, courseId] = tagId.split('_');
    return { categoryId, courseId };
  }

  async getTags(filters: FiltersTag, sort: SortingTags): Promise<PaginatedTags> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;

    const [tags, total] = await Promise.all([
      this.prismaClient.tags.findMany({
        where,
        orderBy,
        skip,
        take: sort.size,
        include: {
          categories: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prismaClient.tags.count({ where }),
    ]);

    const tagDTOs = tags.map((tag) => this.buildDTO(tag as never));

    return this.buildPaginatedResponse(tagDTOs, sort.page, sort.size, total);
  }

  async getTagById(tagId: string): Promise<TagCourseOutDTO> {
    const { categoryId, courseId } = this.parseCompositeKey(tagId);

    const tag = await this.prismaClient.tags.findUniqueOrThrow({
      where: {
        category_id_course_id: {
          category_id: categoryId,
          course_id: courseId,
        },
      },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.buildDTO(tag as never);
  }

  async createTag(dto: TagCourseInDTO): Promise<TagCourseOutDTO> {
    const tag = await this.prismaClient.tags.create({
      data: {
        category_id: dto.categoryId,
        course_id: dto.courseId,
      },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.buildDTO(tag as never);
  }

  async updateTag(tagId: string, dto: TagCourseInDTO): Promise<TagCourseOutDTO> {
    const { categoryId, courseId } = this.parseCompositeKey(tagId);

    const tag = await this.prismaClient.tags.update({
      where: {
        category_id_course_id: {
          category_id: categoryId,
          course_id: courseId,
        },
      },
      data: {
        category_id: dto.categoryId,
        course_id: dto.courseId,
      },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });

    return this.buildDTO(tag as never);
  }

  async deleteTagById(tagId: string): Promise<void> {
    const { categoryId, courseId } = this.parseCompositeKey(tagId);

    const result = await this.prismaClient.tags.delete({
      where: {
        category_id_course_id: {
          category_id: categoryId,
          course_id: courseId,
        },
      },
    });
    if (!result) throw new Error('Tag not found');
  }
}
