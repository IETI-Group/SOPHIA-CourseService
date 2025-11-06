import {
  type ApiResponse,
  type FiltersCategory,
  parseApiResponse,
  type SortingCategories,
} from '../../../utils/index.js';
import type { CategoryCourseInDTO, CategoryCourseUpdateDTO } from '../../models/index.js';
import type { CategoriesRepository } from '../../repositories/index.js';
import type { CategoryService } from '../index.js';

export class CategoryServiceImpl implements CategoryService {
  private readonly categoriesRepository: CategoriesRepository;
  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  getCategories(filters: FiltersCategory, sort: SortingCategories): Promise<ApiResponse<unknown>> {
    return this.categoriesRepository.getCategories(filters, sort);
  }
  async getCategoryById(categoryId: string): Promise<ApiResponse<unknown>> {
    const result = await this.categoriesRepository.getCategoryById(categoryId);
    return parseApiResponse(result, 'Category retrieved successfully');
  }
  async postCategory(dto: CategoryCourseInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.categoriesRepository.createCategory(dto);
    return parseApiResponse(result, 'Category created successfully');
  }
  async putCategory(
    categoryId: string,
    dto: Partial<CategoryCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.categoriesRepository.updateCategory(categoryId, dto);
    return parseApiResponse(result, 'Category updated successfully');
  }
  async deleteCategory(categoryId: string): Promise<ApiResponse<unknown>> {
    await this.categoriesRepository.deleteCategoryById(categoryId);
    return parseApiResponse(null, 'Category deleted successfully');
  }
}
