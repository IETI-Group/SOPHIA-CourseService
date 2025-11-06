import type { ApiResponse, FiltersCategory, SortingCategories } from '../../../utils/index.js';
import type { CategoryCourseInDTO, CategoryCourseUpdateDTO } from '../../models/index.js';
import type { CategoriesRepository } from '../../repositories/index.js';
import type { CategoryService } from '../index.js';

export class CategoryServiceImpl implements CategoryService {
  private readonly categoriesRepository: CategoriesRepository;
  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  getCategories(
    _filters: FiltersCategory,
    _sort: SortingCategories
  ): Promise<ApiResponse<unknown>> {
    this.categoriesRepository;
    throw new Error('Method not implemented.');
  }
  getCategoryById(_categoryId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postCategory(_dto: CategoryCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putCategory(
    _categoryId: string,
    _dto: Partial<CategoryCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteCategory(_categoryId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
