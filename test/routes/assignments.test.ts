import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { AssignmentsController } from '../../src/controllers/index.js';
import { createAssignmentsRouter } from '../../src/routes/assignments.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  };
});

describe('Assignments Routes', () => {
  let app: Express;
  let mockAssignmentsController: ReturnType<typeof mockDeep<AssignmentsController>>;

  beforeEach(() => {
    mockAssignmentsController = mockDeep<AssignmentsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createAssignmentsRouter(mockAssignmentsController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockAssignmentsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockAssignmentsController).toBeDefined();
    });
  });

  describe('GET /api/lessons/:lessonId/assignments', () => {
    it('should return assignments for a given lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Assignments retrieved successfully',
        data: [
          {
            assignmentId: '550e8400-e29b-41d4-a716-446655440010',
            lessonId,
            title: 'Final Project: Build a REST API',
            instructions: 'Create a complete REST API using Node.js and Express',
            maxFileSizeMb: 10,
            allowedTypes: 'PDF',
            dueDate: new Date('2025-12-31').toISOString(),
            maxScore: 100,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockAssignmentsController.getAssignmentsLesson.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/lessons/${lessonId}/assignments`)
        .query({ lessonId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAssignmentsController.getAssignmentsLesson).toHaveBeenCalledWith(
        expect.objectContaining({ lessonId }),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should throw error if invalid lessonId', async () => {
      const invalidLessonId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Assignments retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockAssignmentsController.getAssignmentsLesson.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/lessons/${invalidLessonId}/assignments`)
        .query({ lessonId: invalidLessonId });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/assignments/:id', () => {
    it('should return a specific assignment by ID', async () => {
      const assignmentId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Assignment retrieved successfully',
        data: {
          assignmentId,
          lessonId: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Week 5 Lab: Database Design',
          instructions: 'Design a normalized database schema for an e-commerce platform',
          maxFileSizeMb: 5,
          allowedTypes: 'PDF',
          dueDate: new Date('2025-11-30').toISOString(),
          maxScore: 50,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockAssignmentsController.getAssignmentById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/assignments/${assignmentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAssignmentsController.getAssignmentById).toHaveBeenCalledWith(assignmentId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/assignments/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/lessons/:lessonId/assignments', () => {
    it('should create a new assignment for a lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const assignmentData = {
        lessonId,
        title: 'Midterm Exam: Data Structures',
        instructions: 'Complete all questions about arrays, linked lists, and trees',
        maxFileSizeMb: 15,
        allowedTypes: 'PDF',
        dueDate: '2025-12-15',
        maxScore: 100,
      };

      const mockResponse = {
        success: true,
        message: 'Assignment created successfully',
        data: {
          assignmentId: '550e8400-e29b-41d4-a716-446655440020',
          ...assignmentData,
          dueDate: new Date(assignmentData.dueDate).toISOString(),
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockAssignmentsController.postAssignmentLesson.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/assignments`)
        .send(assignmentData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockAssignmentsController.postAssignmentLesson).toHaveBeenCalledWith(
        expect.objectContaining({
          lessonId,
          title: assignmentData.title,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        lessonId,
        title: '',
        instructions: 'Some instructions',
      };

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/assignments`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        lessonId: 12345,
        title: ['not', 'a', 'string'],
        instructions: 'Valid instructions',
        maxFileSizeMb: 'not-a-number',
        allowedTypes: 'INVALID_TYPE',
        dueDate: 'invalid-date',
        maxScore: 'not-a-number',
      };

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/assignments`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/assignments/:id', () => {
    it('should update an existing assignment', async () => {
      const assignmentId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        title: 'Updated: Final Project Submission',
        maxScore: 120,
        dueDate: '2025-12-31',
      };

      const mockResponse = {
        success: true,
        message: 'Assignment updated successfully',
        data: {
          assignmentId,
          lessonId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          dueDate: new Date(updateData.dueDate).toISOString(),
          instructions: 'Create a complete REST API using Node.js and Express',
          maxFileSizeMb: 10,
          allowedTypes: 'PDF',
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockAssignmentsController.putAssignment.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/assignments/${assignmentId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAssignmentsController.putAssignment).toHaveBeenCalledWith(
        assignmentId,
        expect.objectContaining({ title: updateData.title })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = {
        title: 'Some update',
      };

      const response = await request(app).put(`/api/assignments/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const assignmentId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        maxScore: 'should-be-number',
        maxFileSizeMb: 'should-be-number',
        allowedTypes: 'INVALID_TYPE',
      };

      const response = await request(app)
        .put(`/api/assignments/${assignmentId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/assignments/:id', () => {
    it('should delete an assignment', async () => {
      const assignmentId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Assignment deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockAssignmentsController.deleteAssignment.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/assignments/${assignmentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAssignmentsController.deleteAssignment).toHaveBeenCalledWith(assignmentId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/assignments/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
