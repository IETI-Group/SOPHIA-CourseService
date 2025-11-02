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
  getCategories(filters: FiltersCategory, sort: SortingCategories): PaginatedCategories;
  getCategoryById(categoryId: string): CategoryCourseOutDTO;
  createCategory(dto: CategoryCourseInDTO): CategoryCourseOutDTO;
  updateCategory(categoryId: string, dto: CategoryCourseUpdateDTO): CategoryCourseOutDTO;
  deleteCategoryById(categoryId: string): void;
}
