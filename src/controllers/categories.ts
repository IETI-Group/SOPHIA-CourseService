import type {
  CategoryCourseInDTO,
  CategoryCourseUpdateDTO,
  CategoryService,
} from '../app/index.js';
import type { ApiResponse, FiltersCategory, SortingCategories } from '../utils/index.js';

export class CategoriesController {
  private readonly categoryService: CategoryService;
  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }
  getCategories(
    _filters: FiltersCategory,
    _sort: SortingCategories
  ): Promise<ApiResponse<unknown>> {
    this.categoryService;
    throw new Error('Method not implemented');
  }
  getCategoryById(_categoryId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postCategory(_dto: CategoryCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putCategory(
    _categoryId: string,
    _dto: Partial<CategoryCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteCategory(_categoryId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
