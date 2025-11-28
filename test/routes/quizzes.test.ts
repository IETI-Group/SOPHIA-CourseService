import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { ZodError } from 'zod';
import type { QuizzesController } from '../../src/controllers/index.js';
import { createQuizzesRouter } from '../../src/routes/quizzes.js';

vi.mock('../../src/config/diContainer.js', () => {
  return {
    default: {
      resolve: vi.fn(),
    },
  };
});

describe('Quizzes Routes', () => {
  let app: Express;
  let mockQuizzesController: ReturnType<typeof mockDeep<QuizzesController>>;

  beforeEach(() => {
    mockQuizzesController = mockDeep<QuizzesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createQuizzesRouter(mockQuizzesController));
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ZodError) {
        res.status(400).json({ error: 'Validation error', issues: err.issues });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });

  afterEach(() => {
    mockReset(mockQuizzesController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockQuizzesController).toBeDefined();
    });
  });

  describe('GET /api/sections/:sectionId/quizzes', () => {
    it('should return quizzes for a given section', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Quizzes retrieved successfully',
        data: [
          {
            quizId: '550e8400-e29b-41d4-a716-446655440010',
            sectionId,
            title: 'JavaScript Fundamentals Quiz',
            description: 'Test your knowledge of JavaScript basics',
            aiGenerated: false,
            durationMinutes: 30,
            difficultyDistribution: { easy: 5, medium: 3, hard: 2 },
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getQuizzesSection.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/sections/${sectionId}/quizzes`)
        .query({ sectionId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getQuizzesSection).toHaveBeenCalledWith(
        expect.objectContaining({ sectionId }),
        expect.objectContaining({ sortDirection: 'asc' }),
        true
      );
    });

    it('should throw error if invalid sectionId', async () => {
      const invalidSectionId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Quizzes retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getQuizzesSection.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/sections/${invalidSectionId}/quizzes`)
        .query({ sectionId: invalidSectionId });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/quizzes/:id', () => {
    it('should return a specific quiz by ID', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Quiz retrieved successfully',
        data: {
          quizId,
          sectionId: '550e8400-e29b-41d4-a716-446655440001',
          title: 'Python Data Structures Assessment',
          description: 'Evaluate your understanding of lists, dictionaries, and tuples',
          aiGenerated: true,
          generationTaskId: 'task-123',
          durationMinutes: 45,
          difficultyDistribution: { easy: 4, medium: 4, hard: 2 },
          adaptativeLogic: { enabled: true },
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getQuizById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/quizzes/${quizId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getQuizById).toHaveBeenCalledWith(quizId, true);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/quizzes/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/sections/:sectionId/quizzes', () => {
    it('should create a new quiz for a section', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const quizData = {
        sectionId,
        title: 'React Hooks Knowledge Check',
        description: 'Test your understanding of useState, useEffect, and custom hooks',
        aiGenerated: false,
        generationTaskId: null,
        difficultyDistribution: { easy: 3, medium: 5, hard: 2 },
        adaptativeLogic: { enabled: false },
      };

      const mockResponse = {
        success: true,
        message: 'Quiz created successfully',
        data: {
          quizId: '550e8400-e29b-41d4-a716-446655440020',
          ...quizData,
          durationMinutes: 0,
          active: true,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.postQuizSection.mockResolvedValue(mockResponse);

      const response = await request(app).post(`/api/sections/${sectionId}/quizzes`).send(quizData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.postQuizSection).toHaveBeenCalledWith(
        expect.objectContaining({
          sectionId,
          title: quizData.title,
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
        .post(`/api/sections/${sectionId}/quizzes`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const sectionId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        sectionId: 12345,
        title: ['not', 'a', 'string'],
        description: 'Valid description',
        aiGenerated: 'not-boolean',
      };

      const response = await request(app)
        .post(`/api/sections/${sectionId}/quizzes`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/quizzes/:id', () => {
    it('should update an existing quiz', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        title: 'Updated: Advanced JavaScript Quiz',
        durationMinutes: 60,
        active: true,
      };

      const mockResponse = {
        success: true,
        message: 'Quiz updated successfully',
        data: {
          quizId,
          sectionId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
          description: 'Comprehensive assessment of JavaScript concepts',
          aiGenerated: false,
          difficultyDistribution: { easy: 3, medium: 4, hard: 3 },
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.putQuiz.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/quizzes/${quizId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.putQuiz).toHaveBeenCalledWith(
        quizId,
        expect.objectContaining({ title: updateData.title }),
        true
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { title: 'Some update' };

      const response = await request(app).put(`/api/quizzes/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        durationMinutes: 'should-be-number',
        active: 'should-be-boolean',
      };

      const response = await request(app).put(`/api/quizzes/${quizId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/quizzes/:id', () => {
    it('should delete a quiz', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Quiz deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.deleteQuiz.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/quizzes/${quizId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.deleteQuiz).toHaveBeenCalledWith(quizId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/quizzes/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/quizzes/:quizId/questions', () => {
    it('should return questions for a given quiz', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Questions retrieved successfully',
        data: [
          {
            quizQuestionId: '550e8400-e29b-41d4-a716-446655440010',
            quizId,
            question: 'What is the difference between let and const in JavaScript?',
            durationMinutes: 2,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getQuestionsQuiz.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/quizzes/${quizId}/questions`).query({ quizId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getQuestionsQuiz).toHaveBeenCalledWith(
        expect.objectContaining({ quizId }),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should throw error if invalid quizId', async () => {
      const invalidQuizId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Questions retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getQuestionsQuiz.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/quizzes/${invalidQuizId}/questions`)
        .query({ quizId: invalidQuizId });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/questions/:id', () => {
    it('should return a specific question by ID', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Question retrieved successfully',
        data: {
          quizQuestionId: questionId,
          quizId: '550e8400-e29b-41d4-a716-446655440001',
          question: 'Explain the concept of closures in JavaScript',
          durationMinutes: 5,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getQuestionById.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/questions/${questionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getQuestionById).toHaveBeenCalledWith(questionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/questions/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/quizzes/:quizId/questions', () => {
    it('should create a new question for a quiz', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const questionData = {
        quizId,
        question: 'What are the main features of ES6?',
        durationMinutes: 3,
      };

      const mockResponse = {
        success: true,
        message: 'Question created successfully',
        data: {
          quizQuestionId: '550e8400-e29b-41d4-a716-446655440020',
          ...questionData,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.postQuestionQuiz.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .send(questionData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.postQuestionQuiz).toHaveBeenCalledWith(
        expect.objectContaining({
          quizId,
          question: questionData.question,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        quizId: '',
      };

      const response = await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        quizId: 12345,
        question: ['not', 'a', 'string'],
        durationMinutes: 'not-a-number',
      };

      const response = await request(app)
        .post(`/api/quizzes/${quizId}/questions`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/questions/:id', () => {
    it('should update an existing question', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        question: 'Updated: What is the purpose of async/await in JavaScript?',
        durationMinutes: 4,
      };

      const mockResponse = {
        success: true,
        message: 'Question updated successfully',
        data: {
          quizQuestionId: questionId,
          quizId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.putQuestion.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/questions/${questionId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.putQuestion).toHaveBeenCalledWith(
        questionId,
        expect.objectContaining({ question: updateData.question })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { question: 'Some update' };

      const response = await request(app).put(`/api/questions/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        durationMinutes: 'should-be-number',
        quizId: 12345,
      };

      const response = await request(app)
        .put(`/api/questions/${questionId}`)
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/questions/:id', () => {
    it('should delete a question', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Question deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.deleteQuestion.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/questions/${questionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.deleteQuestion).toHaveBeenCalledWith(questionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/questions/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/questions/:questionId/options', () => {
    it('should return options for a given question', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Options retrieved successfully',
        data: [
          {
            quizOptionId: '550e8400-e29b-41d4-a716-446655440010',
            quizQuestionId: questionId,
            option: 'Variables declared with let can be reassigned',
            isCorrect: true,
          },
          {
            quizOptionId: '550e8400-e29b-41d4-a716-446655440011',
            quizQuestionId: questionId,
            option: 'Variables declared with const can be reassigned',
            isCorrect: false,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getOptionsQuiz.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/questions/${questionId}/options`)
        .query({ quizQuestionId: questionId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getOptionsQuiz).toHaveBeenCalledWith(
        expect.objectContaining({ quizQuestionId: questionId }),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should throw error if invalid questionId', async () => {
      const invalidQuestionId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Options retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getOptionsQuiz.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/questions/${invalidQuestionId}/options`)
        .query({ quizQuestionId: invalidQuestionId });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/options/:id', () => {
    it('should return a specific option by ID', async () => {
      const optionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Option retrieved successfully',
        data: {
          quizOptionId: optionId,
          quizQuestionId: '550e8400-e29b-41d4-a716-446655440001',
          option: 'Arrow functions have their own this binding',
          isCorrect: false,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getOption.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/options/${optionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getOption).toHaveBeenCalledWith(optionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/options/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/questions/:questionId/options', () => {
    it('should create a new option for a question', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440001';
      const optionData = {
        quizQuestionId: questionId,
        option: 'Promises are used for asynchronous operations',
        isCorrect: true,
      };

      const mockResponse = {
        success: true,
        message: 'Option created successfully',
        data: {
          quizOptionId: '550e8400-e29b-41d4-a716-446655440020',
          ...optionData,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.postOptionQuiz.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post(`/api/questions/${questionId}/options`)
        .send(optionData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.postOptionQuiz).toHaveBeenCalledWith(
        expect.objectContaining({
          quizQuestionId: optionData.quizQuestionId,
          option: optionData.option,
          isCorrect: optionData.isCorrect,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        quizQuestionId: '',
      };

      const response = await request(app)
        .post(`/api/questions/${questionId}/options`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const questionId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        quizQuestionId: 12345,
        option: ['not', 'a', 'string'],
        isCorrect: 'not-boolean',
      };

      const response = await request(app)
        .post(`/api/questions/${questionId}/options`)
        .send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/options/:id', () => {
    it('should update an existing option', async () => {
      const optionId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        option: 'Updated: Callbacks are functions passed as arguments',
        isCorrect: true,
      };

      const mockResponse = {
        success: true,
        message: 'Option updated successfully',
        data: {
          quizOptionId: optionId,
          quizQuestionId: '550e8400-e29b-41d4-a716-446655440001',
          ...updateData,
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.putOption.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/options/${optionId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.putOption).toHaveBeenCalledWith(
        optionId,
        expect.objectContaining({ isCorrect: updateData.isCorrect })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { option: 'Some update' };

      const response = await request(app).put(`/api/options/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const optionId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        isCorrect: 'should-be-boolean',
        quizQuestionId: 12345,
      };

      const response = await request(app).put(`/api/options/${optionId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/options/:id', () => {
    it('should delete an option', async () => {
      const optionId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Option deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.deleteOption.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/options/${optionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.deleteOption).toHaveBeenCalledWith(optionId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/options/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/quizzes/:quizId/attempts', () => {
    it('should return attempts for a given quiz', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const mockResponse = {
        success: true,
        message: 'Attempts retrieved successfully',
        data: [
          {
            attemptId: '550e8400-e29b-41d4-a716-446655440010',
            quizId,
            userId: 'user-123',
            grade: 85,
          },
        ],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getAttemptsQuiz.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/quizzes/${quizId}/attempts`).query({ quizId });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getAttemptsQuiz).toHaveBeenCalledWith(
        expect.objectContaining({ quizId }),
        expect.objectContaining({ sortDirection: 'asc' })
      );
    });

    it('should throw error if invalid quizId', async () => {
      const invalidQuizId = 'a'.repeat(250);
      const mockResponse = {
        success: true,
        message: 'Attempts retrieved successfully',
        data: [],
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getAttemptsQuiz.mockResolvedValue(mockResponse);

      const response = await request(app)
        .get(`/api/quizzes/${invalidQuizId}/attempts`)
        .query({ quizId: invalidQuizId });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/attempts/:id', () => {
    it('should return a specific attempt by ID', async () => {
      const attemptId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Attempt retrieved successfully',
        data: {
          attemptId,
          quizId: '550e8400-e29b-41d4-a716-446655440001',
          userId: 'user-789',
          grade: 92,
          completedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.getAttempt.mockResolvedValue(mockResponse);

      const response = await request(app).get(`/api/attempts/${attemptId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.getAttempt).toHaveBeenCalledWith(attemptId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).get(`/api/attempts/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/quizzes/:quizId/attempts', () => {
    it('should create a new attempt for a quiz', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const attemptData = {
        quizId,
        userId: 'user-456',
      };

      const mockResponse = {
        success: true,
        message: 'Attempt created successfully',
        data: {
          attemptId: '550e8400-e29b-41d4-a716-446655440020',
          ...attemptData,
          grade: null,
          startedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.postAttemptQuiz.mockResolvedValue(mockResponse);

      const response = await request(app).post(`/api/quizzes/${quizId}/attempts`).send(attemptData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.postAttemptQuiz).toHaveBeenCalledWith(
        expect.objectContaining({
          quizId: attemptData.quizId,
          userId: attemptData.userId,
        })
      );
    });

    it('should return 400 when required fields are missing', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        quizId: '',
      };

      const response = await request(app).post(`/api/quizzes/${quizId}/attempts`).send(invalidData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when data types are incorrect', async () => {
      const quizId = '550e8400-e29b-41d4-a716-446655440001';
      const invalidData = {
        quizId: 12345,
        userId: 67890,
      };

      const response = await request(app).post(`/api/quizzes/${quizId}/attempts`).send(invalidData);

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/attempts/:id', () => {
    it('should update an existing attempt', async () => {
      const attemptId = '550e8400-e29b-41d4-a716-446655440010';
      const updateData = {
        grade: 95,
      };

      const mockResponse = {
        success: true,
        message: 'Attempt updated successfully',
        data: {
          attemptId,
          quizId: '550e8400-e29b-41d4-a716-446655440001',
          userId: 'user-123',
          ...updateData,
          completedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.putAttempt.mockResolvedValue(mockResponse);

      const response = await request(app).put(`/api/attempts/${attemptId}`).send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.putAttempt).toHaveBeenCalledWith(
        attemptId,
        expect.objectContaining({ grade: updateData.grade })
      );
    });

    it('should return 400 when id is too long', async () => {
      const invalidId = 'a'.repeat(50);
      const updateData = { grade: 80 };

      const response = await request(app).put(`/api/attempts/${invalidId}`).send(updateData);

      expect(response.status).toBe(400);
    });

    it('should return 400 when update data types are incorrect', async () => {
      const attemptId = '550e8400-e29b-41d4-a716-446655440010';
      const invalidUpdateData = {
        grade: 'should-be-number',
        userId: 12345,
      };

      const response = await request(app).put(`/api/attempts/${attemptId}`).send(invalidUpdateData);

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/attempts/:id', () => {
    it('should delete an attempt', async () => {
      const attemptId = '550e8400-e29b-41d4-a716-446655440010';
      const mockResponse = {
        success: true,
        message: 'Attempt deleted successfully',
        data: { deleted: true },
        timestamp: new Date().toISOString(),
      };

      mockQuizzesController.deleteAttempt.mockResolvedValue(mockResponse);

      const response = await request(app).delete(`/api/attempts/${attemptId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
      expect(mockQuizzesController.deleteAttempt).toHaveBeenCalledWith(attemptId);
    });

    it('should return 400 when id exceeds max length', async () => {
      const invalidId = 'a'.repeat(50);

      const response = await request(app).delete(`/api/attempts/${invalidId}`);

      expect(response.status).toBe(400);
    });
  });
});
