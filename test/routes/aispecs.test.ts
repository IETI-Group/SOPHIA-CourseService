import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { AISpecsController } from '../../src/controllers/index.js';
import { createAISpecsRouter } from '../../src/routes/aispecs.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  }
});

describe('AI Specs Routes', () => {
  let app: Express;
  let mockAISpecsController: ReturnType<typeof mockDeep<AISpecsController>>;

  beforeEach(() => {
    mockAISpecsController = mockDeep<AISpecsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createAISpecsRouter(mockAISpecsController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockAISpecsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockAISpecsController).toBeDefined();
    });
  });

  describe('GET /api/lessons/:lessonId/ai-specs', () => {
    it('should return AI specs for a given lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'AI Specs retrieved successfully',
        data: [
          {
            aiSpecId: '550e8400-e29b-41d4-a716-446655440010',
            lessonContentId: lessonId,
            generationPromptSummary: 'Generate comprehensive video content about React hooks',
            estimatedVideoDurationMinutes: 15,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockAISpecsController.getAISpecs.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/lessons/${lessonId}/ai-specs`)
        .query({ lessonContentId: lessonId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAISpecsController.getAISpecs).toHaveBeenCalledWith(
        expect.objectContaining({ lessonContentId: lessonId }),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should return 200 even with invalid lessonContentId due to catch', async () => {
      const invalidLessonId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'AI Specs retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockAISpecsController.getAISpecs.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/lessons/${invalidLessonId}/ai-specs`)
        .query({ lessonContentId: invalidLessonId });

      expect(response.status).toBe(200);
      expect(mockAISpecsController.getAISpecs).toHaveBeenCalledWith(
        expect.objectContaining({ lessonContentId: null }),
        expect.any(Object),
        true
      );
    });
  });

  describe('GET /api/ai-specs/:id', () => {
    it('should return a specific AI spec by ID', async () => {
      const aiSpecId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'AI Spec retrieved successfully',
        data: {
          aiSpecId,
          lessonContentId: '550e8400-e29b-41d4-a716-446655440001',
          generationPromptSummary: 'Generate comprehensive video content about React hooks',
          contentStructure: { sections: ['Introduction', 'useState', 'useEffect'] },
          estimatedVideoDurationMinutes: 15,
          videoScript: 'Welcome to this lesson on React hooks...',
          videoGenerationInstructions: { tone: 'educational', pace: 'moderate' },
          interactiveElements: { quizzes: true, codeExamples: true },
          exerciseParameters: { difficulty: 'intermediate', duration: 10 },
        },
        timestamp: new Date().toISOString(),
      };

      mockAISpecsController.getAISpecById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/ai-specs/${aiSpecId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAISpecsController.getAISpecById).toHaveBeenCalledWith(aiSpecId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/ai-specs/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/lessons/:lessonId/ai-specs', () => {
    it('should create a new AI spec for a lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const aiSpecData = {
        lessonContentId: lessonId,
        generationPromptSummary: 'Create interactive Python tutorial for beginners',
        contentStructure: { modules: ['Variables', 'Functions', 'Loops'] },
        estimatedVideoDurationMinutes: 20,
        videoScript: 'In this Python tutorial, we will explore...',
        videoGenerationInstructions: { style: 'hands-on', includeExamples: true },
        interactiveElements: { challenges: true, sandbox: true },
        exerciseParameters: { complexity: 'beginner', tasks: 5 },
      };

      const mockResponse = {
        success: true,
        message: 'AI Spec created successfully',
        data: {
          aiSpecId: '550e8400-e29b-41d4-a716-446655440020',
          ...aiSpecData,
        },
        timestamp: new Date().toISOString(),
      };

      mockAISpecsController.postAISpec.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/ai-specs`)
        .send(aiSpecData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockAISpecsController.postAISpec).toHaveBeenCalledWith(aiSpecData, true);
    });

    it('should return 400 when required fields are missing', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        lessonContentId: lessonId,
        generationPromptSummary: '',
        contentStructure: {},
        estimatedVideoDurationMinutes: null,
        videoScript: null,
        videoGenerationInstructions: {},
        interactiveElements: null,
        exerciseParameters: null,
      };

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/ai-specs`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        lessonContentId: 123,
        generationPromptSummary: ['not', 'a', 'string'],
        contentStructure: { test: 'data' },
        estimatedVideoDurationMinutes: 'not-a-number',
        videoScript: null,
        videoGenerationInstructions: {},
        interactiveElements: null,
        exerciseParameters: null,
      };

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/ai-specs`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/ai-specs/:id', () => {
    it('should update an existing AI spec', async () => {
      const aiSpecId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        generationPromptSummary: 'Updated: Advanced JavaScript concepts and patterns',
        estimatedVideoDurationMinutes: 25,
        videoScript: 'Updated script with new examples...',
      };

      const mockResponse = {
        success: true,
        message: 'AI Spec updated successfully',
        data: {
          aiSpecId,
          lessonContentId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          contentStructure: { topics: ['Closures', 'Promises', 'Async/Await'] },
          videoGenerationInstructions: { depth: 'advanced' },
          interactiveElements: { liveCoding: true },
          exerciseParameters: { level: 'advanced' },
        },
        timestamp: new Date().toISOString(),
      };

      mockAISpecsController.putAISpec.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/ai-specs/${aiSpecId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAISpecsController.putAISpec).toHaveBeenCalledWith(aiSpecId, updateData, true);
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = {
        generationPromptSummary: 'Some update',
      };

      const response = await request(app).put(`/api/ai-specs/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const aiSpecId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        estimatedVideoDurationMinutes: 'should-be-number',
        lessonContentId: 12345,
      };

      const response = await request(app).put(`/api/ai-specs/${aiSpecId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/ai-specs/:id', () => {
    it('should delete an AI spec', async () => {
      const aiSpecId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'AI Spec deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockAISpecsController.deleteAISpec.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/ai-specs/${aiSpecId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockAISpecsController.deleteAISpec).toHaveBeenCalledWith(aiSpecId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/ai-specs/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
