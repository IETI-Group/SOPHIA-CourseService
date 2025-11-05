import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { TagsController } from '../../src/controllers/index.js';
import { createTagsRouter } from '../../src/routes/tags.js';

describe('Tags Routes', () => {
  let app: Express;
  let mockTagsController: ReturnType<typeof mockDeep<TagsController>>;

  beforeEach(() => {
    mockTagsController = mockDeep<TagsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createTagsRouter(mockTagsController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockTagsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockTagsController).toBeDefined();
    });
  });

  describe('GET /api/tags', () => {
    it('should return all tags', async () => {
      const mockResponse = {
        success: true,
        message: 'Tags retrieved successfully',
        data: [
          {
            tagId: '550e8400-e29b-41d4-a716-446655440001',
            categoryId: '550e8400-e29b-41d4-a716-446655440100',
            courseId: '550e8400-e29b-41d4-a716-446655440200',
            categoryName: 'Programming',
            courseName: 'Introduction to JavaScript',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockTagsController.getTags.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/tags');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockTagsController.getTags).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should return 200 even with invalid filter due to catch', async () => {
      const invalidCategoryId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Tags retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockTagsController.getTags.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/tags').query({ categoryId: invalidCategoryId });

      expect(response.status).toBe(200);
      expect(mockTagsController.getTags).toHaveBeenCalledWith(
        expect.objectContaining({ categoryId: null }),
        expect.any(Object)
      );
    });
  });

  describe('GET /api/tags/:id', () => {
    it('should return a specific tag by ID', async () => {
      const tagId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Tag retrieved successfully',
        data: {
          tagId,
          categoryId: '550e8400-e29b-41d4-a716-446655440100',
          courseId: '550e8400-e29b-41d4-a716-446655440200',
          categoryName: 'Web Development',
          courseName: 'Advanced React Patterns',
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockTagsController.getTagById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/tags/${tagId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockTagsController.getTagById).toHaveBeenCalledWith(tagId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/tags/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/tags', () => {
    it('should create a new tag', async () => {
      const tagData = {
        categoryId: '550e8400-e29b-41d4-a716-446655440100',
        courseId: '550e8400-e29b-41d4-a716-446655440200',
      };

      const mockResponse = {
        success: true,
        message: 'Tag created successfully',
        data: {
          tagId: '550e8400-e29b-41d4-a716-446655440020',
          ...tagData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockTagsController.postTag.mockResolvedValue(mockResponse);

      const response = await request(app).post('/api/tags').send(tagData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockTagsController.postTag).toHaveBeenCalledWith(
        expect.objectContaining({
          categoryId: tagData.categoryId,
          courseId: tagData.courseId,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = {
        categoryId: '',
        courseId: '',
      };

      const response = await request(app).post('/api/tags').send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const invalidData = {
        categoryId: 12345,
        courseId: ['not', 'a', 'string'],
      };

      const response = await request(app).post('/api/tags').send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/tags/:id', () => {
    it('should update an existing tag', async () => {
      const tagId = '550e8400-e29b-41d4-a716-446655440001';
      const updateData = {
        courseId: '550e8400-e29b-41d4-a716-446655440300',
      };

      const mockResponse = {
        success: true,
        message: 'Tag updated successfully',
        data: {
          tagId,
          categoryId: '550e8400-e29b-41d4-a716-446655440100',
          ...updateData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockTagsController.putTag.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/tags/${tagId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockTagsController.putTag).toHaveBeenCalledWith(
        tagId,
        expect.objectContaining({ courseId: updateData.courseId })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { courseId: '550e8400-e29b-41d4-a716-446655440200' };

      const response = await request(app).put(`/api/tags/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const tagId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidUpdateData = {
        categoryId: 12345,
        courseId: ['should', 'be', 'string'],
      };

      const response = await request(app).put(`/api/tags/${tagId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/tags/:id', () => {
    it('should delete a tag', async () => {
      const tagId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Tag deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockTagsController.deleteTag.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/tags/${tagId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockTagsController.deleteTag).toHaveBeenCalledWith(tagId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/tags/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
