import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  CategoriesRepository,
  CategoryCourseInDTO,
  CategoryCourseOutDTO,
  CategoryCourseUpdateDTO,
} from '../../../../src/app/index.js';
import { CategoriesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/CategoriesRepositoryPostgreSQL.js';
import {
  type FiltersCategory,
  SORT_CATEGORY,
  type SortingCategories,
} from '../../../../src/utils/index.js';

describe('Categories Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let categoriesRepository: CategoriesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    categoriesRepository = new CategoriesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(categoriesRepository).toBeDefined();
  });

  describe('getCategories', () => {
    it('Should return paginated categories', async () => {
      const filters: FiltersCategory = {
        name: null,
        parentCategory: null,
        active: true,
      };
      const sort: SortingCategories = {
        sortFields: [SORT_CATEGORY.NAME],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockCategories = [
        {
          id_category: 'cat_1',
          name: 'Programming',
          description: 'Programming courses',
          active: true,
          parent_category: null,
        },
        {
          id_category: 'cat_2',
          name: 'Web Development',
          description: 'Web development courses',
          active: true,
          parent_category: 'cat_1',
        },
      ];

      prismaClient.categories.count.mockResolvedValueOnce(2);
      prismaClient.categories.findMany.mockResolvedValueOnce(mockCategories);

      const result = await categoriesRepository.getCategories(filters, sort);

      expect(prismaClient.categories.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.size).toBe(10);
    });

    it('Should return empty paginated categories when no results', async () => {
      const filters: FiltersCategory = {
        name: 'NonExistent',
        parentCategory: null,
        active: null,
      };
      const sort: SortingCategories = {
        sortFields: [SORT_CATEGORY.ACTIVE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      prismaClient.categories.count.mockResolvedValueOnce(0);
      prismaClient.categories.findMany.mockResolvedValueOnce([]);

      const result = await categoriesRepository.getCategories(filters, sort);

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe('getCategoryById', () => {
    it('Should return category by id', async () => {
      const categoryId = 'cat_123';
      const name = 'Data Science';
      const description = 'Data Science and Analytics';
      const active = true;
      const parentCategory = null;

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: categoryId,
        name,
        description,
        active,
        parentCategory,
      };

      prismaClient.categories.findUniqueOrThrow.mockResolvedValueOnce({
        id_category: categoryId,
        name,
        description,
        active,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.getCategoryById(categoryId);

      expect(prismaClient.categories.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return category with parent category', async () => {
      const categoryId = 'cat_456';
      const name = 'Machine Learning';
      const description = 'ML and AI courses';
      const active = true;
      const parentCategory = 'cat_123';

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: categoryId,
        name,
        description,
        active,
        parentCategory,
      };

      prismaClient.categories.findUniqueOrThrow.mockResolvedValueOnce({
        id_category: categoryId,
        name,
        description,
        active,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.getCategoryById(categoryId);

      expect(prismaClient.categories.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when category not found', async () => {
      const categoryId = 'non_existent_cat';

      prismaClient.categories.findUnique.mockResolvedValueOnce(null);

      await expect(categoriesRepository.getCategoryById(categoryId)).rejects.toThrow();
    });
  });

  describe('createCategory', () => {
    it('Should create a new category without parent', async () => {
      const name = 'Cybersecurity';
      const description = 'Security and ethical hacking';
      const parentCategory = null;

      const inputCategory: CategoryCourseInDTO = {
        name,
        description,
        parentCategory,
      };

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: 'new_cat_id',
        name,
        description,
        active: false,
        parentCategory,
      };

      prismaClient.categories.create.mockResolvedValueOnce({
        id_category: 'new_cat_id',
        name,
        description,
        active: false,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.createCategory(inputCategory);

      expect(prismaClient.categories.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a new category with parent', async () => {
      const name = 'Frontend Frameworks';
      const description = 'React, Vue, Angular';
      const parentCategory = 'cat_web_dev';

      const inputCategory: CategoryCourseInDTO = {
        name,
        description,
        parentCategory,
      };

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: 'new_sub_cat_id',
        name,
        description,
        active: false,
        parentCategory,
      };

      prismaClient.categories.create.mockResolvedValueOnce({
        id_category: 'new_sub_cat_id',
        name,
        description,
        active: false,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.createCategory(inputCategory);

      expect(prismaClient.categories.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to create duplicate category', async () => {
      const name = 'Duplicate Category';
      const description = 'This already exists';
      const parentCategory = null;

      const inputCategory: CategoryCourseInDTO = {
        name,
        description,
        parentCategory,
      };

      prismaClient.categories.findFirst.mockResolvedValueOnce({
        id_category: 'existing_cat',
        name,
        description,
        active: true,
        parent_category: parentCategory,
      });

      await expect(categoriesRepository.createCategory(inputCategory)).rejects.toThrow();
    });
  });

  describe('updateCategory', () => {
    it('Should update an existing category', async () => {
      const categoryId = 'cat_to_update';
      const name = 'Updated Category';
      const description = 'Updated description';
      const active = true;
      const parentCategory = null;

      const updateDTO: CategoryCourseUpdateDTO = {
        name,
        description,
        active,
        parentCategory,
      };

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: categoryId,
        name,
        description,
        active,
        parentCategory,
      };

      prismaClient.categories.update.mockResolvedValueOnce({
        id_category: categoryId,
        name,
        description,
        active,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.updateCategory(categoryId, updateDTO);

      expect(prismaClient.categories.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update category and change parent', async () => {
      const categoryId = 'cat_change_parent';
      const name = 'Backend Development';
      const description = 'Server-side programming';
      const active = true;
      const parentCategory = 'cat_programming';

      const updateDTO: CategoryCourseUpdateDTO = {
        name,
        description,
        active,
        parentCategory,
      };

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: categoryId,
        name,
        description,
        active,
        parentCategory,
      };

      prismaClient.categories.update.mockResolvedValueOnce({
        id_category: categoryId,
        name,
        description,
        active,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.updateCategory(categoryId, updateDTO);

      expect(prismaClient.categories.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should deactivate a category', async () => {
      const categoryId = 'cat_deactivate';
      const name = 'Old Category';
      const description = 'No longer used';
      const active = false;
      const parentCategory = null;

      const updateDTO: CategoryCourseUpdateDTO = {
        name,
        description,
        active,
        parentCategory,
      };

      const expectedOutput: CategoryCourseOutDTO = {
        idCategory: categoryId,
        name,
        description,
        active,
        parentCategory,
      };

      prismaClient.categories.update.mockResolvedValueOnce({
        id_category: categoryId,
        name,
        description,
        active,
        parent_category: parentCategory,
      });

      const result = await categoriesRepository.updateCategory(categoryId, updateDTO);

      expect(prismaClient.categories.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
      expect(result.active).toBe(false);
    });

    it('Should throw error when trying to update non-existent category', async () => {
      const categoryId = 'non_existent_cat';
      const name = 'Update';
      const description = 'Update description';
      const active = true;
      const parentCategory = null;

      const updateDTO: CategoryCourseUpdateDTO = {
        name,
        description,
        active,
        parentCategory,
      };

      prismaClient.categories.findUnique.mockResolvedValueOnce(null);

      await expect(categoriesRepository.updateCategory(categoryId, updateDTO)).rejects.toThrow();
    });
  });

  describe('deleteCategoryById', () => {
    it('Should delete a category by id', async () => {
      const categoryId = 'cat_to_delete';

      prismaClient.categories.delete.mockResolvedValueOnce({
        id_category: categoryId,
        name: 'Deleted Category',
        description: 'Deleted',
        active: false,
        parent_category: null,
      });

      await categoriesRepository.deleteCategoryById(categoryId);

      expect(prismaClient.categories.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent category', async () => {
      const categoryId = 'non_existent_cat';

      prismaClient.categories.findUnique.mockResolvedValueOnce(null);

      await expect(categoriesRepository.deleteCategoryById(categoryId)).rejects.toThrow();
    });
  });
});
