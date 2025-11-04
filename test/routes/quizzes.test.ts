import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { QuizzesController } from '../../src/controllers/index.js';
import { createQuizzesRouter } from '../../src/routes/quizzes.js';

describe('Quizzes Routes', () => {
  let app: Express;
  let mockQuizzesController: ReturnType<typeof mockDeep<QuizzesController>>;

  beforeEach(() => {
    mockQuizzesController = mockDeep<QuizzesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createQuizzesRouter(mockQuizzesController));
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
    it('should return quizzes for a given section', async () => {});
  });

  describe('GET /api/quizzes/:id', () => {
    it('should return a specific quiz by ID', async () => {});
  });

  describe('POST /api/sections/:sectionId/quizzes', () => {
    it('should create a new quiz for a section', async () => {});
  });

  describe('PUT /api/quizzes/:id', () => {
    it('should update an existing quiz', async () => {});
  });

  describe('DELETE /api/quizzes/:id', () => {
    it('should delete a quiz', async () => {});
  });

  describe('GET /api/quizzes/:quizId/questions', () => {
    it('should return questions for a given quiz', async () => {});
  });

  describe('GET /api/questions/:id', () => {
    it('should return a specific question by ID', async () => {});
  });

  describe('POST /api/quizzes/:quizId/questions', () => {
    it('should create a new question for a quiz', async () => {});
  });

  describe('PUT /api/questions/:id', () => {
    it('should update an existing question', async () => {});
  });

  describe('DELETE /api/questions/:id', () => {
    it('should delete a question', async () => {});
  });

  describe('GET /api/questions/:questionId/options', () => {
    it('should return options for a given question', async () => {});
  });

  describe('GET /api/options/:id', () => {
    it('should return a specific option by ID', async () => {});
  });

  describe('POST /api/questions/:questionId/options', () => {
    it('should create a new option for a question', async () => {});
  });

  describe('PUT /api/options/:id', () => {
    it('should update an existing option', async () => {});
  });

  describe('DELETE /api/options/:id', () => {
    it('should delete an option', async () => {});
  });

  describe('GET /api/quizzes/:quizId/attempts', () => {
    it('should return attempts for a given quiz', async () => {});
  });

  describe('GET /api/attempts/:id', () => {
    it('should return a specific attempt by ID', async () => {});
  });

  describe('POST /api/quizzes/:quizId/attempts', () => {
    it('should create a new attempt for a quiz', async () => {});
  });

  describe('PUT /api/attempts/:id', () => {
    it('should update an existing attempt', async () => {});
  });

  describe('DELETE /api/attempts/:id', () => {
    it('should delete an attempt', async () => {});
  });
});
