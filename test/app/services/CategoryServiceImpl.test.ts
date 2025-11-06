import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  CategoryCourseInDTO,
  CategoryCourseUpdateDTO,
} from '../../../src/app/models/index.js';
import type { CategoriesRepository } from '../../../src/app/repositories/index.js';
import { CategoryServiceImpl } from '../../../src/app/services/implementations/CategoryServiceImpl.js';
import type { FiltersCategory, SortingCategories } from '../../../src/utils/index.js';

describe('CategoryServiceImpl', () => {
  const mockCategoriesRepository = mockDeep<CategoriesRepository>();
  let service: CategoryServiceImpl;

  beforeEach(() => {
    service = new CategoryServiceImpl(mockCategoriesRepository);
  });

  afterEach(() => {
    mockReset(mockCategoriesRepository);
  });

  it('should call categoriesRepository.getCategories with filters and sort', async () => {
    const filters: FiltersCategory = {
      name: 'Test Category',
      parentCategory: null,
      active: true,
    };
    const sort: SortingCategories = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getCategories(filters, sort);

    expect(mockCategoriesRepository.getCategories).toHaveBeenCalledWith(filters, sort);
  });

  it('should call categoriesRepository.getCategoryById with categoryId', async () => {
    const categoryId: string = 'category-123';

    await service.getCategoryById(categoryId);

    expect(mockCategoriesRepository.getCategoryById).toHaveBeenCalledWith(categoryId);
  });

  it('should call categoriesRepository.createCategory with dto', async () => {
    const dto: CategoryCourseInDTO = {
      name: 'New Category',
      description: 'Category description',
      parentCategory: null,
    };

    await service.postCategory(dto);

    expect(mockCategoriesRepository.createCategory).toHaveBeenCalledWith(dto);
  });

  it('should call categoriesRepository.updateCategory with categoryId and dto', async () => {
    const categoryId: string = 'category-123';
    const dto: Partial<CategoryCourseUpdateDTO> = {
      name: 'Updated Category',
      active: false,
    };

    await service.putCategory(categoryId, dto);

    expect(mockCategoriesRepository.updateCategory).toHaveBeenCalledWith(categoryId, dto);
  });

  it('should call categoriesRepository.deleteCategoryById with categoryId', async () => {
    const categoryId: string = 'category-123';

    await service.deleteCategory(categoryId);

    expect(mockCategoriesRepository.deleteCategoryById).toHaveBeenCalledWith(categoryId);
  });
});
