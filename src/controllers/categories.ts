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
  getCategories(filters: FiltersCategory, sort: SortingCategories): Promise<ApiResponse<unknown>> {
    return this.categoryService.getCategories(filters, sort);
  }
  getCategoryById(categoryId: string): Promise<ApiResponse<unknown>> {
    return this.categoryService.getCategoryById(categoryId);
  }
  postCategory(dto: CategoryCourseInDTO): Promise<ApiResponse<unknown>> {
    return this.categoryService.postCategory(dto);
  }
  putCategory(
    categoryId: string,
    dto: Partial<CategoryCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    return this.categoryService.putCategory(categoryId, dto);
  }
  deleteCategory(categoryId: string): Promise<ApiResponse<unknown>> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
