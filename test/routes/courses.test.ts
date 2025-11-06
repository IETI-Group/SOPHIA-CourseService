import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { CoursesController } from '../../src/controllers/index.js';
import { createCoursesRouter } from '../../src/routes/courses.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  }
});

describe('Courses Routes', () => {
  let app: Express;
  let mockCoursesController: ReturnType<typeof mockDeep<CoursesController>>;

  beforeEach(() => {
    mockCoursesController = mockDeep<CoursesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createCoursesRouter(mockCoursesController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockCoursesController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockCoursesController).toBeDefined();
    });
  });

  describe('GET /api/courses', () => {
    it('should return all courses', async () => {
      const mockResponse = {
        success: true,
        message: 'Courses retrieved successfully',
        data: [
          {
            courseId: '550e8400-e29b-41d4-a716-446655440001',
            title: 'Complete Web Development Bootcamp',
            description: 'Learn HTML, CSS, JavaScript, React, Node.js and more',
            price: 99.99,
            level: 'INTERMEDIATE',
            aiGenerated: false,
            status: 'PUBLISHED',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getCourses.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/courses');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.getCourses).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should return 200 even with invalid filter due to catch', async () => {
      const invalidTitle = 'a'.repeat(600);
      const mockResponse = {
        success: true,
        message: 'Courses retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getCourses.mockResolvedValue(mockResponse);

      const response = await request(app).get('/api/courses').query({ title: invalidTitle });

      expect(response.status).toBe(200);
      expect(mockCoursesController.getCourses).toHaveBeenCalledWith(
        expect.objectContaining({ title: null }),
        expect.any(Object),
        true
      );
    });
  });

  describe('GET /api/courses/:id', () => {
    it('should return a specific course by ID', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Course retrieved successfully',
        data: {
          courseId,
          instructorId: 'instructor-123',
          title: 'Machine Learning Fundamentals',
          description: 'Master the basics of machine learning with Python and scikit-learn',
          price: 149.99,
          level: 'ADVANCED',
          aiGenerated: true,
          status: 'PUBLISHED',
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getCourseById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/courses/${courseId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.getCourseById).toHaveBeenCalledWith(courseId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/courses/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/courses', () => {
    it('should create a new course', async () => {
      const courseData = {
        instructorId: 'instructor-456',
        title: 'Python for Data Science',
        description: 'Learn Python programming for data analysis and visualization',
        price: 79.99,
        level: 'BEGINNER',
        aiGenerated: false,
        generationTaskId: null,
        generationMetadata: {},
        lastAIUpdateAt: null,
      };

      const mockResponse = {
        success: true,
        message: 'Course created successfully',
        data: {
          courseId: '550e8400-e29b-41d4-a716-446655440020',
          ...courseData,
          status: 'DRAFT',
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.postCourse.mockResolvedValue(mockResponse);

      const response = await request(app).post('/api/courses').send(courseData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.postCourse).toHaveBeenCalledWith(
        expect.objectContaining({
          title: courseData.title,
          price: courseData.price,
        }),
        true
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const invalidData = {
        title: '',
        description: 'Some description',
      };

      const response = await request(app).post('/api/courses').send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const invalidData = {
        instructorId: 12345,
        title: ['not', 'a', 'string'],
        description: 'Valid description',
        price: 'not-a-number',
        level: 'INVALID_LEVEL',
        aiGenerated: 'not-boolean',
      };

      const response = await request(app).post('/api/courses').send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/courses/:id', () => {
    it('should update an existing course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const updateData = {
        title: 'Updated: Advanced Web Development',
        price: 129.99,
        status: 'PUBLISHED',
      };

      const mockResponse = {
        success: true,
        message: 'Course updated successfully',
        data: {
          courseId,
          ...updateData,
          description: 'Learn advanced web development techniques',
          level: 'ADVANCED',
          aiGenerated: false,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.putCourse.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/courses/${courseId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.putCourse).toHaveBeenCalledWith(
        courseId,
        expect.objectContaining({ title: updateData.title }),
        true
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { title: 'Some update' };

      const response = await request(app).put(`/api/courses/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidUpdateData = {
        price: 'should-be-number',
        level: 'INVALID_LEVEL',
        active: 'should-be-boolean',
      };

      const response = await request(app).put(`/api/courses/${courseId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/courses/:id', () => {
    it('should delete a course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Course deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.deleteCourse.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/courses/${courseId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.deleteCourse).toHaveBeenCalledWith(courseId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/courses/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/courses/:courseId/inscriptions', () => {
    it('should return inscriptions for a given course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Inscriptions retrieved successfully',
        data: [
          {
            inscriptionId: '550e8400-e29b-41d4-a716-446655440010',
            courseId,
            userId: 'user-123',
            active: true,
            completed: false,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getInscriptionsCourse.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/courses/${courseId}/inscriptions`)
        .query({ courseId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.getInscriptionsCourse).toHaveBeenCalledWith(
        expect.objectContaining({ courseId }),
        expect.any(Object)
      );
    });

    it('should return 200 even with invalid courseId due to catch', async () => {
      const invalidCourseId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Inscriptions retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getInscriptionsCourse.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/courses/${invalidCourseId}/inscriptions`)
        .query({ courseId: invalidCourseId });

      expect(response.status).toBe(200);
      expect(mockCoursesController.getInscriptionsCourse).toHaveBeenCalledWith(
        expect.objectContaining({ courseId: null }),
        expect.any(Object)
      );
    });
  });

  describe('GET /api/inscriptions/:id', () => {
    it('should return a specific inscription by ID', async () => {
      const inscriptionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Inscription retrieved successfully',
        data: {
          inscriptionId,
          courseId: '550e8400-e29b-41d4-a716-446655440001',
          userId: 'user-789',
          active: true,
          completed: true,
          enrolledAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getInscriptionById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/inscriptions/${inscriptionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.getInscriptionById).toHaveBeenCalledWith(inscriptionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/inscriptions/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/courses/:courseId/inscriptions', () => {
    it('should create a new inscription for a course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const inscriptionData = {
        courseId,
        userId: 'user-456',
      };

      const mockResponse = {
        success: true,
        message: 'Inscription created successfully',
        data: {
          inscriptionId: '550e8400-e29b-41d4-a716-446655440020',
          ...inscriptionData,
          active: true,
          completed: false,
          enrolledAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.postInscriptionCourse.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/courses/${courseId}/inscriptions`)
        .send(inscriptionData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.postInscriptionCourse).toHaveBeenCalledWith(
        expect.objectContaining({
          courseId: inscriptionData.courseId,
          userId: inscriptionData.userId,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        courseId: '',
      };

      const response = await request(app)
        .post(`/api/courses/${courseId}/inscriptions`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        courseId: 12345,
        userId: 67890,
      };

      const response = await request(app)
        .post(`/api/courses/${courseId}/inscriptions`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/inscriptions/:id', () => {
    it('should update an existing inscription', async () => {
      const inscriptionId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        progressPercentage: 75,
        score: 85,
        active: true,
      };

      const mockResponse = {
        success: true,
        message: 'Inscription updated successfully',
        data: {
          inscriptionId,
          courseId: '550e8400-e29b-41d4-a716-446655440001',
          userId: 'user-123',
          ...updateData,
          completedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.putInscription.mockResolvedValue(mockResponse);

      const response = await request(app)
        .put(`/api/inscriptions/${inscriptionId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.putInscription).toHaveBeenCalledWith(
        inscriptionId,
        expect.objectContaining({ active: updateData.active })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { active: true };

      const response = await request(app).put(`/api/inscriptions/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const inscriptionId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        progressPercentage: 'should-be-number',
        score: 'should-be-number',
        userId: 12345,
      };

      const response = await request(app)
        .put(`/api/inscriptions/${inscriptionId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/inscriptions/:id', () => {
    it('should delete an inscription', async () => {
      const inscriptionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Inscription deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.deleteInscription.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/inscriptions/${inscriptionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.deleteInscription).toHaveBeenCalledWith(inscriptionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/inscriptions/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/courses/:courseId/favorites', () => {
    it('should return favorites for a given course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Favorites retrieved successfully',
        data: [
          {
            favoriteId: '550e8400-e29b-41d4-a716-446655440010',
            courseId,
            userId: 'user-123',
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getFavoriteCourses.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/courses/${courseId}/favorites`)
        .query({ courseId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.getFavoriteCourses).toHaveBeenCalledWith(
        expect.objectContaining({ courseId }),
        expect.any(Object)
      );
    });

    it('should return 200 even with invalid courseId due to catch', async () => {
      const invalidCourseId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Favorites retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getFavoriteCourses.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/courses/${invalidCourseId}/favorites`)
        .query({ courseId: invalidCourseId });

      expect(response.status).toBe(200);
      expect(mockCoursesController.getFavoriteCourses).toHaveBeenCalledWith(
        expect.objectContaining({ courseId: null }),
        expect.any(Object)
      );
    });
  });

  describe('GET /api/favorites/:id', () => {
    it('should return a specific favorite by ID', async () => {
      const favoriteId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Favorite retrieved successfully',
        data: {
          favoriteId,
          courseId: '550e8400-e29b-41d4-a716-446655440001',
          userId: 'user-789',
          addedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.getFavorite.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/favorites/${favoriteId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.getFavorite).toHaveBeenCalledWith(favoriteId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/favorites/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/courses/:courseId/favorites', () => {
    it('should create a new favorite for a course', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const favoriteData = {
        courseId,
        userId: 'user-456',
      };

      const mockResponse = {
        success: true,
        message: 'Favorite created successfully',
        data: {
          favoriteId: '550e8400-e29b-41d4-a716-446655440020',
          ...favoriteData,
          addedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.postFavoriteCourse.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/courses/${courseId}/favorites`)
        .send(favoriteData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.postFavoriteCourse).toHaveBeenCalledWith(
        expect.objectContaining({
          courseId: favoriteData.courseId,
          userId: favoriteData.userId,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        courseId: '',
      };

      const response = await request(app)
        .post(`/api/courses/${courseId}/favorites`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const courseId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        courseId: 12345,
        userId: 67890,
      };

      const response = await request(app)
        .post(`/api/courses/${courseId}/favorites`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/favorites/:id', () => {
    it('should update an existing favorite', async () => {
      const favoriteId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        userId: 'user-updated',
      };

      const mockResponse = {
        success: true,
        message: 'Favorite updated successfully',
        data: {
          favoriteId,
          courseId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          updatedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.putFavorite.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/favorites/${favoriteId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.putFavorite).toHaveBeenCalledWith(
        favoriteId,
        expect.objectContaining({ userId: updateData.userId })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { userId: 'user-123' };

      const response = await request(app).put(`/api/favorites/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const favoriteId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        userId: 12345,
        courseId: 67890,
      };

      const response = await request(app)
        .put(`/api/favorites/${favoriteId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/favorites/:id', () => {
    it('should delete a favorite', async () => {
      const favoriteId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Favorite deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockCoursesController.deleteFavorite.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/favorites/${favoriteId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockCoursesController.deleteFavorite).toHaveBeenCalledWith(favoriteId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/favorites/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
