import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { ResourcesController } from '../../src/controllers/index.js';
import { createResourcesRouter } from '../../src/routes/resources.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  }
});

describe('Resources Routes', () => {
  let app: Express;
  let mockResourcesController: ReturnType<typeof mockDeep<ResourcesController>>;

  beforeEach(() => {
    mockResourcesController = mockDeep<ResourcesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createResourcesRouter(mockResourcesController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockResourcesController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockResourcesController).toBeDefined();
    });
  });

  describe('GET /api/resources', () => {
    it('should return all resources', async () => {
      const mockResponse = {
        success: true,
        message: 'Resources retrieved successfully',
        data: [
          {
            resourceId: '550e8400-e29b-41d4-a716-446655440001',
            entityReference: 'lesson-123',
            discriminant: 'LESSON',
            name: 'JavaScript Basics Tutorial Video',
            type: 'VIDEO',
            url: 'https://example.com/videos/js-basics.mp4',
            content: null,
            order: 1,
            durationSeconds: 1200,
            fileSizeMb: 50,
            mimeType: 'video/mp4',
            thumnailUrl: 'https://example.com/thumbnails/js-basics.jpg',
            metadata: { resolution: '1080p', language: 'en' },
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockResourcesController.getResources.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/resources');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockResourcesController.getResources).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should return 200 even with invalid filter due to catch', async () => {
      const invalidName = 'a'.repeat(600);
      const mockResponse = {
        success: true,
        message: 'Resources retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockResourcesController.getResources.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/resources').query({ name: invalidName });

      expect(response.status).toBe(200);
      expect(mockResourcesController.getResources).toHaveBeenCalledWith(
        expect.objectContaining({ name: null }),
        expect.any(Object),
        true
      );
    });
  });

  describe('GET /api/resources/:id', () => {
    it('should return a specific resource by ID', async () => {
      const resourceId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Resource retrieved successfully',
        data: {
          resourceId,
          entityReference: 'quiz-question-456',
          discriminant: 'QUIZ_QUESTION',
          name: 'Python Syntax Quiz Diagram',
          type: 'DIAGRAM',
          url: null,
          content: '<svg>...</svg>',
          order: 2,
          durationSeconds: 0,
          fileSizeMb: 0.5,
          mimeType: 'image/svg+xml',
          thumnailUrl: null,
          metadata: { format: 'svg', interactive: false },
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockResourcesController.getResourceById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/resources/${resourceId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockResourcesController.getResourceById).toHaveBeenCalledWith(resourceId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/resources/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/resources', () => {
    it('should create a new resource', async () => {
      const resourceData = {
        entityReference: 'lesson-789',
        discriminant: 'LESSON',
        name: 'Machine Learning Dataset',
        type: 'DATASET',
        url: 'https://example.com/datasets/ml-data.csv',
        content: null,
        order: 3,
        durationSeconds: 0,
        fileSizeMb: 15,
        mimeType: 'text/csv',
        thumnailUrl: null,
        metadata: { rows: 10000, columns: 20 },
      };

      const mockResponse = {
        success: true,
        message: 'Resource created successfully',
        data: {
          resourceId: '550e8400-e29b-41d4-a716-446655440020',
          ...resourceData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockResourcesController.postResources.mockResolvedValue(mockResponse);

      const response = await request(app).post('/api/resources').send(resourceData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockResourcesController.postResources).toHaveBeenCalledWith(
        expect.objectContaining({
          name: resourceData.name,
          type: resourceData.type,
        }),
        true
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = {
        entityReference: '',
        name: 'Some name',
      };

      const response = await request(app).post('/api/resources').send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const invalidData = {
        entityReference: 12345,
        discriminant: 'INVALID_DISCRIMINANT',
        name: ['not', 'a', 'string'],
        type: 'INVALID_TYPE',
        url: 12345,
        order: 'not-a-number',
        durationSeconds: 'not-a-number',
        fileSizeMb: 'not-a-number',
      };

      const response = await request(app).post('/api/resources').send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/resources/:id', () => {
    it('should update an existing resource', async () => {
      const resourceId = '550e8400-e29b-41d4-a716-446655440001';
      const updateData = {
        name: 'Updated: JavaScript Advanced Tutorial',
        url: 'https://example.com/videos/js-advanced.mp4',
        durationSeconds: 1800,
      };

      const mockResponse = {
        success: true,
        message: 'Resource updated successfully',
        data: {
          resourceId,
          entityReference: 'lesson-123',
          discriminant: 'LESSON',
          ...updateData,
          type: 'VIDEO',
          content: null,
          order: 1,
          fileSizeMb: 75,
          mimeType: 'video/mp4',
          thumnailUrl: 'https://example.com/thumbnails/js-advanced.jpg',
          metadata: { resolution: '1080p', language: 'en' },
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockResourcesController.putResources.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/resources/${resourceId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockResourcesController.putResources).toHaveBeenCalledWith(
        resourceId,
        expect.objectContaining({ name: updateData.name }),
        true
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { name: 'Some update' };

      const response = await request(app).put(`/api/resources/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const resourceId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidUpdateData = {
        order: 'should-be-number',
        durationSeconds: 'should-be-number',
        type: 'INVALID_TYPE',
        discriminant: 'INVALID_DISCRIMINANT',
      };

      const response = await request(app)
        .put(`/api/resources/${resourceId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/resources/:id', () => {
    it('should delete a resource', async () => {
      const resourceId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Resource deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockResourcesController.deleteResources.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/resources/${resourceId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockResourcesController.deleteResources).toHaveBeenCalledWith(resourceId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/resources/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
