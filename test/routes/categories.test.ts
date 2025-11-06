import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { CategoriesController } from '../../src/controllers/index.js';
import { createCategoriesRouter } from '../../src/routes/categories.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  };
});

describe('Categories Routes', () => {
  let app: Express;
  let mockCategoriesController: ReturnType<typeof mockDeep<CategoriesController>>;

  beforeEach(() => {
    mockCategoriesController = mockDeep<CategoriesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createCategoriesRouter(mockCategoriesController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockCategoriesController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockCategoriesController).toBeDefined();
    });
  });

  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      const mockResponse = {
        success: true,
        message: 'Categories retrieved successfully',
        data: [
          {
            categoryId: '550e8400-e29b-41d4-a716-446655440001',
            name: 'Web Development',
            description: 'Courses about frontend and backend web development',
            parentCategory: null,
            active: true,
          },
          {
            categoryId: '550e8400-e29b-41d4-a716-446655440002',
            name: 'React',
            description: 'Courses focused on React library and ecosystem',
            parentCategory: 'Web Development',
            active: true,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockCategoriesController.getCategories.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCategoriesController.getCategories).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should return 200 even with invalid filter due to catch', async () => {
      const invalidName = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Categories retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockCategoriesController.getCategories.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/categories').query({ name: invalidName });

      expect(response.status).toBe(200);
      expect(mockCategoriesController.getCategories).toHaveBeenCalledWith(
        expect.objectContaining({ name: null }),
        expect.any(Object)
      );
    });
  });

  describe('GET /api/categories/:id', () => {
    it('should return a specific category by ID', async () => {
      const categoryId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Category retrieved successfully',
        data: {
          categoryId,
          name: 'Data Science',
          description: 'Learn data analysis, machine learning, and AI fundamentals',
          parentCategory: null,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCategoriesController.getCategoryById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/categories/${categoryId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCategoriesController.getCategoryById).toHaveBeenCalledWith(categoryId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/categories/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/categories', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'Mobile Development',
        description: 'Build native and cross-platform mobile applications',
        parentCategory: null,
      };

      const mockResponse = {
        success: true,
        message: 'Category created successfully',
        data: {
          categoryId: '550e8400-e29b-41d4-a716-446655440020',
          ...categoryData,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCategoriesController.postCategory.mockResolvedValue(mockResponse);

      const response = await request(app).post('/api/categories').send(categoryData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockCategoriesController.postCategory).toHaveBeenCalledWith(
        expect.objectContaining({
          name: categoryData.name,
          description: categoryData.description,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = {
        name: '',
        description: 'Some description',
      };

      const response = await request(app).post('/api/categories').send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const invalidData = {
        name: 12345,
        description: ['not', 'a', 'string'],
        parentCategory: 12345,
      };

      const response = await request(app).post('/api/categories').send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('should update an existing category', async () => {
      const categoryId = '550e8400-e29b-41d4-a716-446655440001';
      const updateData = {
        name: 'Advanced Web Development',
        description: 'Updated: Master modern web development with cutting-edge technologies',
      };

      const mockResponse = {
        success: true,
        message: 'Category updated successfully',
        data: {
          categoryId,
          ...updateData,
          parentCategory: null,
          active: true,
          createdAt: new Date('2025-01-01').toISOString(),
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCategoriesController.putCategory.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/categories/${categoryId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCategoriesController.putCategory).toHaveBeenCalledWith(
        categoryId,
        expect.objectContaining({ name: updateData.name })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = {
        name: 'Some update',
      };

      const response = await request(app).put(`/api/categories/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const categoryId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidUpdateData = {
        name: 12345,
        description: ['should', 'be', 'string'],
        active: 'should-be-boolean',
      };

      const response = await request(app)
        .put(`/api/categories/${categoryId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category', async () => {
      const categoryId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Category deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockCategoriesController.deleteCategory.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/categories/${categoryId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCategoriesController.deleteCategory).toHaveBeenCalledWith(categoryId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/categories/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
