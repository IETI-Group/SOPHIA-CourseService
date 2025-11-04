import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersCategory,
  PaginatedCategories,
  SortingCategories,
} from '../../../utils/index.js';
import { SORT_CATEGORY } from '../../../utils/index.js';
import type {
  CategoryCourseInDTO,
  CategoryCourseOutDTO,
  CategoryCourseUpdateDTO,
} from '../../models/index.js';
import type { CategoriesRepository } from '../index.js';

export class CategoriesRepositoryPostgreSQL implements CategoriesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private buildWhere(filters: FiltersCategory): Prisma.CategoriesWhereInput {
    const whereClause: Prisma.CategoriesWhereInput = {};

    if (filters.name !== null && filters.name !== undefined) {
      whereClause.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.parentCategory !== null && filters.parentCategory !== undefined) {
      whereClause.parent_category = filters.parentCategory;
    }

    if (filters.active !== null && filters.active !== undefined) {
      whereClause.active = filters.active;
    }

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_CATEGORY,
    keyof Prisma.CategoriesOrderByWithRelationInput
  > = {
    [SORT_CATEGORY.NAME]: 'name',
    [SORT_CATEGORY.ACTIVE]: 'active',
  };

  private buildSort(sortParams: SortingCategories): Prisma.CategoriesOrderByWithRelationInput[] {
    const orderBy: Prisma.CategoriesOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildDTO(record: Prisma.CategoriesGetPayload<object>): CategoryCourseOutDTO {
    return {
      idCategory: record.id_category,
      name: record.name,
      description: record.description,
      active: record.active,
      parentCategory: record.parent_category,
    };
  }

  private buildPaginatedResponse(
    data: CategoryCourseOutDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedCategories {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Categories retrieved successfully',
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

  async getCategories(
    filters: FiltersCategory,
    sort: SortingCategories
  ): Promise<PaginatedCategories> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);

    const [records, total] = await Promise.all([
      this.prismaClient.categories.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
      }),
      this.prismaClient.categories.count({ where }),
    ]);

    const data: CategoryCourseOutDTO[] = records.map((record) => this.buildDTO(record));

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getCategoryById(categoryId: string): Promise<CategoryCourseOutDTO> {
    const record = await this.prismaClient.categories.findUniqueOrThrow({
      where: { id_category: categoryId },
    });

    return this.buildDTO(record);
  }

  async createCategory(dto: CategoryCourseInDTO): Promise<CategoryCourseOutDTO> {
    const created = await this.prismaClient.categories.create({
      data: {
        name: dto.name,
        description: dto.description,
        parent_category: dto.parentCategory,
      },
    });

    return this.buildDTO(created);
  }

  async updateCategory(
    categoryId: string,
    dto: CategoryCourseUpdateDTO
  ): Promise<CategoryCourseOutDTO> {
    const updated = await this.prismaClient.categories.update({
      where: { id_category: categoryId },
      data: {
        name: dto.name,
        description: dto.description,
        active: dto.active,
        parent_category: dto.parentCategory,
      },
    });

    return this.buildDTO(updated);
  }

  async deleteCategoryById(categoryId: string): Promise<void> {
    const deleted = await this.prismaClient.categories.delete({
      where: { id_category: categoryId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
