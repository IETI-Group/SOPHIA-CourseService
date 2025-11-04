import type { CategoryCourseInDTO, CategoryCourseUpdateDTO } from '../app/index.js';
import type { ApiResponse, FiltersCategory, SortingCategories } from '../utils/index.js';

export class CategoriesController {
  getCategories(
    _filters: FiltersCategory,
    _sort: SortingCategories
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getCategoryById(_categoryId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postCategory(_dto: CategoryCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putCategory(_categoryId: string, _dto: CategoryCourseUpdateDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteCategory(_categoryId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
