import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { LessonsController } from '../../src/controllers/index.js';
import { createLessonsRouter } from '../../src/routes/lessons.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  }
});

describe('Lessons Routes', () => {
  let app: Express;
  let mockLessonsController: ReturnType<typeof mockDeep<LessonsController>>;

  beforeEach(() => {
    mockLessonsController = mockDeep<LessonsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createLessonsRouter(mockLessonsController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockLessonsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockLessonsController).toBeDefined();
    });
  });

  describe('GET /api/sections/:sectionId/lessons', () => {
    it('should return lessons for a given section', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Lessons retrieved successfully',
        data: [
          {
            lessonId: '550e8400-e29b-41d4-a716-446655440010',
            sectionId,
            title: 'Introduction to JavaScript',
            description: 'Learn the fundamentals of JavaScript programming',
            order: 1,
            durationMinutes: 45,
            lessonType: 'THEORY',
            estimatedDifficulty: 2,
            aiGenerated: false,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getSectionLessons.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/sections/${sectionId}/lessons`)
        .query({ sectionId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.getSectionLessons).toHaveBeenCalledWith(
        expect.objectContaining({ sectionId }),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should return 200 even with invalid sectionId due to catch', async () => {
      const invalidSectionId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Lessons retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getSectionLessons.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/sections/${invalidSectionId}/lessons`)
        .query({ sectionId: invalidSectionId });

      expect(response.status).toBe(200);
      expect(mockLessonsController.getSectionLessons).toHaveBeenCalledWith(
        expect.objectContaining({ sectionId: null }),
        expect.any(Object),
        true
      );
    });
  });

  describe('GET /api/lessons/:id', () => {
    it('should return a specific lesson by ID', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Lesson retrieved successfully',
        data: {
          lessonId,
          sectionId: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Advanced React Hooks',
          description: 'Master useState, useEffect, useContext, and custom hooks',
          order: 3,
          durationMinutes: 60,
          lessonType: 'PRACTICE',
          estimatedDifficulty: 4,
          aiGenerated: true,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getLessonById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/lessons/${lessonId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.getLessonById).toHaveBeenCalledWith(lessonId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/lessons/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/sections/:sectionId/lessons', () => {
    it('should create a new lesson for a section', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const lessonData = {
        sectionId,
        title: 'Python Data Structures',
        description: 'Explore lists, tuples, dictionaries, and sets in Python',
        order: 2,
        durationMinutes: 50,
        aiGenerated: false,
        generationTaskId: null,
        lessonType: 'THEORY',
        estimatedDifficulty: 3,
      };

      const mockResponse = {
        success: true,
        message: 'Lesson created successfully',
        data: {
          lessonId: '550e8400-e29b-41d4-a716-446655440020',
          ...lessonData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.postSectionLesson.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/sections/${sectionId}/lessons`)
        .send(lessonData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.postSectionLesson).toHaveBeenCalledWith(
        expect.objectContaining({
          sectionId,
          title: lessonData.title,
        }),
        true
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        sectionId,
        title: '',
      };

      const response = await request(app)
        .post(`/api/sections/${sectionId}/lessons`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        sectionId: 12345,
        title: ['not', 'a', 'string'],
        description: 'Valid description',
        order: 'not-a-number',
        durationMinutes: 'not-a-number',
        aiGenerated: 'not-boolean',
        lessonType: 'INVALID_TYPE',
        estimatedDifficulty: 'not-a-number',
      };

      const response = await request(app)
        .post(`/api/sections/${sectionId}/lessons`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/lessons/:id', () => {
    it('should update an existing lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        title: 'Updated: Advanced JavaScript Concepts',
        durationMinutes: 75,
        estimatedDifficulty: 5,
      };

      const mockResponse = {
        success: true,
        message: 'Lesson updated successfully',
        data: {
          lessonId,
          sectionId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          description: 'Deep dive into closures, prototypes, and async programming',
          order: 1,
          lessonType: 'THEORY',
          aiGenerated: false,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.putLesson.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/lessons/${lessonId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.putLesson).toHaveBeenCalledWith(
        lessonId,
        expect.objectContaining({ title: updateData.title }),
        true
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { title: 'Some update' };

      const response = await request(app).put(`/api/lessons/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        order: 'should-be-number',
        durationMinutes: 'should-be-number',
        lessonType: 'INVALID_TYPE',
      };

      const response = await request(app).put(`/api/lessons/${lessonId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/lessons/:id', () => {
    it('should delete a lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Lesson deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.deleteLesson.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/lessons/${lessonId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.deleteLesson).toHaveBeenCalledWith(lessonId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/lessons/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/lessons/:lessonId/contents', () => {
    it('should return contents for a given lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Contents retrieved successfully',
        data: [
          {
            lessonContentId: '550e8400-e29b-41d4-a716-446655440010',
            lessonId,
            metadata: { videoUrl: 'https://example.com/video.mp4' },
            difficultyLevel: 'INTERMEDIATE',
            learningTechnique: 'VISUAL',
            orderPreference: 1,
            aiGenerated: false,
            contentType: 'VIDEO_SCRIPT',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getLessonContents.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/lessons/${lessonId}/contents`)
        .query({ lessonId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.getLessonContents).toHaveBeenCalledWith(
        expect.objectContaining({ lessonId }),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should return 200 even with invalid lessonId due to catch', async () => {
      const invalidLessonId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Contents retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getLessonContents.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/lessons/${invalidLessonId}/contents`)
        .query({ lessonId: invalidLessonId });

      expect(response.status).toBe(200);
      expect(mockLessonsController.getLessonContents).toHaveBeenCalledWith(
        expect.objectContaining({ lessonId: null }),
        expect.any(Object),
        true
      );
    });
  });

  describe('GET /api/contents/:id', () => {
    it('should return a specific content by ID', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Content retrieved successfully',
        data: {
          lessonContentId: contentId,
          lessonId: '550e8400-e29b-41d4-a716-446655440001',
          metadata: { pdfUrl: 'https://example.com/reading.pdf', pages: 25 },
          difficultyLevel: 'ADVANCED',
          learningTechnique: 'READING',
          orderPreference: 2,
          aiGenerated: true,
          generationLogId: 'log-123',
          contentType: 'READING',
          parentContentId: null,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getLessonContentsById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/contents/${contentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.getLessonContentsById).toHaveBeenCalledWith(contentId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/contents/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/lessons/:lessonId/contents', () => {
    it('should create a new content for a lesson', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const contentData = {
        lessonId,
        metadata: { quizQuestions: 10, timeLimit: 30 },
        difficultyLevel: 'BEGINNER',
        learningTechnique: 'PROBLEM_SOLVING',
        orderPreference: 3,
        aiGenerated: false,
        generationLogId: null,
        contentType: 'EXERCISE',
        parentContentId: null,
      };

      const mockResponse = {
        success: true,
        message: 'Content created successfully',
        data: {
          lessonContentId: '550e8400-e29b-41d4-a716-446655440020',
          ...contentData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.postLessonContents.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/contents`)
        .send(contentData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.postLessonContents).toHaveBeenCalledWith(
        expect.objectContaining({
          lessonId,
          contentType: contentData.contentType,
        }),
        true
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        lessonId: '',
      };

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/contents`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const lessonId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        lessonId: 12345,
        metadata: 'should-be-object',
        difficultyLevel: 'INVALID_LEVEL',
        learningTechnique: 'INVALID_TECHNIQUE',
        orderPreference: 'not-a-number',
        aiGenerated: 'not-boolean',
        contentType: 'INVALID_TYPE',
      };

      const response = await request(app)
        .post(`/api/lessons/${lessonId}/contents`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/contents/:id', () => {
    it('should update an existing content', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        metadata: { videoUrl: 'https://example.com/updated-video.mp4', duration: 1200 },
        difficultyLevel: 'ADVANCED',
        orderPreference: 1,
      };

      const mockResponse = {
        success: true,
        message: 'Content updated successfully',
        data: {
          lessonContentId: contentId,
          lessonId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          learningTechnique: 'VISUAL',
          aiGenerated: false,
          contentType: 'VIDEO_SCRIPT',
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.putLessonContents.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/contents/${contentId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.putLessonContents).toHaveBeenCalledWith(
        contentId,
        expect.objectContaining({ difficultyLevel: updateData.difficultyLevel }),
        true
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { metadata: {} };

      const response = await request(app).put(`/api/contents/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        difficultyLevel: 'INVALID_LEVEL',
        learningTechnique: 'INVALID_TECHNIQUE',
        orderPreference: 'should-be-number',
      };

      const response = await request(app).put(`/api/contents/${contentId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/contents/:id', () => {
    it('should delete a content', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Content deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.deleteLessonContents.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/contents/${contentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.deleteLessonContents).toHaveBeenCalledWith(contentId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/contents/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/contents/:contentId/progress', () => {
    it('should return progress for a given content', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Progress retrieved successfully',
        data: [
          {
            progressId: '550e8400-e29b-41d4-a716-446655440010',
            userId: 'user-123',
            lessonContentId: contentId,
            timeSpendMinutes: 45,
            completionPercentage: 75,
            effectivinessScore: 8.5,
            userRating: 5,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getProgressContent.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/contents/${contentId}/progress`)
        .query({ lessonContentId: contentId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.getProgressContent).toHaveBeenCalledWith(
        expect.objectContaining({ lessonContentId: contentId }),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should return 200 even with invalid contentId due to catch', async () => {
      const invalidContentId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Progress retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getProgressContent.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/contents/${invalidContentId}/progress`)
        .query({ lessonContentId: invalidContentId });

      expect(response.status).toBe(200);
      expect(mockLessonsController.getProgressContent).toHaveBeenCalledWith(
        expect.objectContaining({ lessonContentId: null }),
        expect.any(Object)
      );
    });
  });

  describe('GET /api/progress/:id', () => {
    it('should return a specific progress by ID', async () => {
      const progressId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Progress retrieved successfully',
        data: {
          progressId,
          userId: 'user-789',
          lessonContentId: '550e8400-e29b-41d4-a716-446655440001',
          timeSpendMinutes: 120,
          completionPercentage: 100,
          effectivinessScore: 9.2,
          userRating: 5,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.getProgressById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/progress/${progressId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.getProgressById).toHaveBeenCalledWith(progressId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/progress/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/contents/:contentId/progress', () => {
    it('should create a new progress for a content', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440001';
      const progressData = {
        userId: 'user-456',
        lessonContentId: contentId,
      };

      const mockResponse = {
        success: true,
        message: 'Progress created successfully',
        data: {
          progressId: '550e8400-e29b-41d4-a716-446655440020',
          ...progressData,
          timeSpendMinutes: 0,
          completionPercentage: 0,
          effectivinessScore: 0,
          userRating: null,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.postProgressContent.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/contents/${contentId}/progress`)
        .send(progressData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.postProgressContent).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: progressData.userId,
          lessonContentId: progressData.lessonContentId,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        userId: '',
      };

      const response = await request(app)
        .post(`/api/contents/${contentId}/progress`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const contentId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        userId: 12345,
        lessonContentId: 67890,
      };

      const response = await request(app)
        .post(`/api/contents/${contentId}/progress`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/progress/:id', () => {
    it('should update an existing progress', async () => {
      const progressId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        timeSpendMinutes: 90,
        completionPercentage: 85,
        effectivinessScore: 8.8,
        userRating: 4,
      };

      const mockResponse = {
        success: true,
        message: 'Progress updated successfully',
        data: {
          progressId,
          userId: 'user-123',
          lessonContentId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.putProgress.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/progress/${progressId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.putProgress).toHaveBeenCalledWith(
        progressId,
        expect.objectContaining({ completionPercentage: updateData.completionPercentage })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { completionPercentage: 50 };

      const response = await request(app).put(`/api/progress/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const progressId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        timeSpendMinutes: 'should-be-number',
        completionPercentage: 'should-be-number',
        effectivinessScore: 'should-be-number',
        userRating: 'should-be-number',
      };

      const response = await request(app)
        .put(`/api/progress/${progressId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/progress/:id', () => {
    it('should delete a progress', async () => {
      const progressId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Progress deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockLessonsController.deleteProgress.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/progress/${progressId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockLessonsController.deleteProgress).toHaveBeenCalledWith(progressId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/progress/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
