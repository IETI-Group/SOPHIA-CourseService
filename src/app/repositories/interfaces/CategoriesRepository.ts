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

export interface CategoriesRepository {
  getCategories(filters: FiltersCategory, sort: SortingCategories): Promise<PaginatedCategories>;
  getCategoryById(categoryId: string): Promise<CategoryCourseOutDTO>;
  createCategory(dto: CategoryCourseInDTO): Promise<CategoryCourseOutDTO>;
  updateCategory(categoryId: string, dto: CategoryCourseUpdateDTO): Promise<CategoryCourseOutDTO>;
  deleteCategoryById(categoryId: string): Promise<void>;
}
