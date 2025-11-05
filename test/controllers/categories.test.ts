import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { CategoryCourseInDTO, CategoryCourseUpdateDTO } from '../../src/app/models/index.js';
import type { CategoryService } from '../../src/app/services/interfaces/CategoryService.js';
import { CategoriesController } from '../../src/controllers/categories.js';
import type { FiltersCategory, SORT_CATEGORY } from '../../src/utils/index.js';

describe('CategoriesController', () => {
  const mockCategoryService = mockDeep<CategoryService>();
  let controller: CategoriesController;

  beforeEach(() => {
    controller = new CategoriesController(mockCategoryService);
  });

  afterEach(() => {
    mockReset(mockCategoryService);
  });

  it('should call categoryService.getCategories with filters and sort', async () => {
    const filters: FiltersCategory = {
      name: 'Test Category',
      parentCategory: null,
      active: true,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_CATEGORY[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await controller.getCategories(filters, sort);

    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(filters, sort);
  });

  it('should call categoryService.getCategoryById with categoryId', async () => {
    const categoryId: string = 'category-123';

    await controller.getCategoryById(categoryId);

    expect(mockCategoryService.getCategoryById).toHaveBeenCalledWith(categoryId);
  });

  it('should call categoryService.postCategory with dto', async () => {
    const dto: CategoryCourseInDTO = {
      name: 'New Category',
      description: 'Category description',
      parentCategory: null,
    };

    await controller.postCategory(dto);

    expect(mockCategoryService.postCategory).toHaveBeenCalledWith(dto);
  });

  it('should call categoryService.putCategory with categoryId and dto', async () => {
    const categoryId: string = 'category-123';
    const dto: Partial<CategoryCourseUpdateDTO> = {
      name: 'Updated Category',
      active: false,
    };

    await controller.putCategory(categoryId, dto);

    expect(mockCategoryService.putCategory).toHaveBeenCalledWith(categoryId, dto);
  });

  it('should call categoryService.deleteCategory with categoryId', async () => {
    const categoryId: string = 'category-123';

    await controller.deleteCategory(categoryId);

    expect(mockCategoryService.deleteCategory).toHaveBeenCalledWith(categoryId);
  });
});
