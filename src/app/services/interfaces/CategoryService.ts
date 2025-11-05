import type { ApiResponse, FiltersCategory, SortingCategories } from '../../../utils/index.js';
import type { CategoryCourseInDTO, CategoryCourseUpdateDTO } from '../../models/index.js';

export interface CategoryService {
  getCategories(filters: FiltersCategory, sort: SortingCategories): Promise<ApiResponse<unknown>>;
  getCategoryById(categoryId: string): Promise<ApiResponse<unknown>>;
  postCategory(dto: CategoryCourseInDTO): Promise<ApiResponse<unknown>>;
  putCategory(
    categoryId: string,
    dto: Partial<CategoryCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteCategory(categoryId: string): Promise<ApiResponse<unknown>>;
}
