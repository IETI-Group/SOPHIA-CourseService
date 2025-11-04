import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { CoursesController } from '../../src/controllers/index.js';
import { createCoursesRouter } from '../../src/routes/courses.js';

describe('Courses Routes', () => {
  let app: Express;
  let mockCoursesController: ReturnType<typeof mockDeep<CoursesController>>;

  beforeEach(() => {
    mockCoursesController = mockDeep<CoursesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createCoursesRouter(mockCoursesController));
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
    it('should return all courses', async () => {});
  });

  describe('GET /api/courses/:id', () => {
    it('should return a specific course by ID', async () => {});
  });

  describe('POST /api/courses', () => {
    it('should create a new course', async () => {});
  });

  describe('PUT /api/courses/:id', () => {
    it('should update an existing course', async () => {});
  });

  describe('DELETE /api/courses/:id', () => {
    it('should delete a course', async () => {});
  });

  describe('GET /api/courses/:courseId/inscriptions', () => {
    it('should return inscriptions for a given course', async () => {});
  });

  describe('GET /api/inscriptions/:id', () => {
    it('should return a specific inscription by ID', async () => {});
  });

  describe('POST /api/courses/:courseId/inscriptions', () => {
    it('should create a new inscription for a course', async () => {});
  });

  describe('PUT /api/inscriptions/:id', () => {
    it('should update an existing inscription', async () => {});
  });

  describe('DELETE /api/inscriptions/:id', () => {
    it('should delete an inscription', async () => {});
  });

  describe('GET /api/courses/:courseId/favorites', () => {
    it('should return favorites for a given course', async () => {});
  });

  describe('GET /api/favorites/:id', () => {
    it('should return a specific favorite by ID', async () => {});
  });

  describe('POST /api/courses/:courseId/favorites', () => {
    it('should create a new favorite for a course', async () => {});
  });

  describe('PUT /api/favorites/:id', () => {
    it('should update an existing favorite', async () => {});
  });

  describe('DELETE /api/favorites/:id', () => {
    it('should delete a favorite', async () => {});
  });
});
