import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersCategory,
  PaginatedCategories,
  SortingCategories,
} from '../../../utils/index.js';
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
  getCategories(_filters: FiltersCategory, _sort: SortingCategories): Promise<PaginatedCategories> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getCategoryById(_categoryId: string): Promise<CategoryCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  createCategory(_dto: CategoryCourseInDTO): Promise<CategoryCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateCategory(
    _categoryId: string,
    _dto: CategoryCourseUpdateDTO
  ): Promise<CategoryCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteCategoryById(_categoryId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
