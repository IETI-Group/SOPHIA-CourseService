import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { SectionsController } from '../../src/controllers/index.js';
import { createSectionsRouter } from '../../src/routes/sections.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  };
});

describe('Sections Routes', () => {
  let app: Express;
  let mockSectionsController: ReturnType<typeof mockDeep<SectionsController>>;

  beforeEach(() => {
    mockSectionsController = mockDeep<SectionsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createSectionsRouter(mockSectionsController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockSectionsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockSectionsController).toBeDefined();
    });
  });

  describe('GET /api/courses/:courseId/sections', () => {
    it('should return sections for a given course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Sections retrieved successfully',
        data: [
          {
            sectionId: '550e8400-e29b-41d4-a716-446655440010',
            courseId,
            title: 'Introduction to Programming Fundamentals',
            description:
              'Learn the basic concepts of programming including variables, data types, and control structures',
            order: 1,
            aiGenerated: false,
            generationTaskId: null,
            suggestedByAi: false,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockSectionsController.getCourseSections.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/courses/${courseId}/sections`)
        .query({ courseId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockSectionsController.getCourseSections).toHaveBeenCalledWith(
        expect.objectContaining({ courseId }),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should return 200 even with invalid courseId due to catch', async () => {
      const invalidCourseId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Sections retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockSectionsController.getCourseSections.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/courses/${invalidCourseId}/sections`)
        .query({ courseId: invalidCourseId });

      expect(response.status).toBe(200);
      expect(mockSectionsController.getCourseSections).toHaveBeenCalledWith(
        expect.objectContaining({ courseId: null }),
        expect.any(Object),
        true
      );
    });
  });

  describe('GET /api/sections/:id', () => {
    it('should return a specific section by ID', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Section retrieved successfully',
        data: {
          sectionId,
          courseId: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Advanced Data Structures',
          description:
            'Deep dive into trees, graphs, hash tables, and their applications in real-world scenarios',
          order: 3,
          aiGenerated: true,
          generationTaskId: 'task-ai-123456',
          suggestedByAi: true,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockSectionsController.getSectionById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/sections/${sectionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockSectionsController.getSectionById).toHaveBeenCalledWith(sectionId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/sections/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/courses/:courseId/sections', () => {
    it('should create a new section for a course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const sectionData = {
        courseId,
        title: 'Object-Oriented Programming Principles',
        description:
          'Master the four pillars of OOP: encapsulation, abstraction, inheritance, and polymorphism',
        order: 2,
        aiGenerated: false,
        generationTaskId: null,
        suggestedByAi: false,
      };

      const mockResponse = {
        success: true,
        message: 'Section created successfully',
        data: {
          sectionId: '550e8400-e29b-41d4-a716-446655440020',
          ...sectionData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockSectionsController.postCourseSection.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/courses/${courseId}/sections`)
        .send(sectionData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockSectionsController.postCourseSection).toHaveBeenCalledWith(
        expect.objectContaining({
          courseId,
          title: sectionData.title,
        }),
        true
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        courseId,
        title: '',
        description: 'Some description',
      };

      const response = await request(app)
        .post(`/api/courses/${courseId}/sections`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        courseId: 12345,
        title: ['not', 'a', 'string'],
        description: 'Valid description',
        order: 'not-a-number',
        aiGenerated: 'not-a-boolean',
        generationTaskId: 12345,
        suggestedByAi: 'not-a-boolean',
      };

      const response = await request(app)
        .post(`/api/courses/${courseId}/sections`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/sections/:id', () => {
    it('should update an existing section', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        title: 'Updated: Introduction to Programming',
        description: 'Enhanced curriculum covering modern programming paradigms',
        order: 1,
      };

      const mockResponse = {
        success: true,
        message: 'Section updated successfully',
        data: {
          sectionId,
          courseId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          aiGenerated: false,
          generationTaskId: null,
          suggestedByAi: false,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockSectionsController.putSection.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/sections/${sectionId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockSectionsController.putSection).toHaveBeenCalledWith(
        sectionId,
        expect.objectContaining({ title: updateData.title }),
        true
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { title: 'Some update' };

      const response = await request(app).put(`/api/sections/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        order: 'should-be-number',
        aiGenerated: 'should-be-boolean',
        active: 'should-be-boolean',
      };

      const response = await request(app).put(`/api/sections/${sectionId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/sections/:id', () => {
    it('should delete a section', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Section deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockSectionsController.deleteSection.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/sections/${sectionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockSectionsController.deleteSection).toHaveBeenCalledWith(sectionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/sections/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
