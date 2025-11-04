import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { LessonsController } from '../../src/controllers/index.js';
import { createLessonsRouter } from '../../src/routes/lessons.js';

describe('Lessons Routes', () => {
  let app: Express;
  let mockLessonsController: ReturnType<typeof mockDeep<LessonsController>>;

  beforeEach(() => {
    mockLessonsController = mockDeep<LessonsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createLessonsRouter(mockLessonsController));
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
    it('should return lessons for a given section', async () => {});
  });

  describe('GET /api/lessons/:id', () => {
    it('should return a specific lesson by ID', async () => {});
  });

  describe('POST /api/sections/:sectionId/lessons', () => {
    it('should create a new lesson for a section', async () => {});
  });

  describe('PUT /api/lessons/:id', () => {
    it('should update an existing lesson', async () => {});
  });

  describe('DELETE /api/lessons/:id', () => {
    it('should delete a lesson', async () => {});
  });

  describe('GET /api/lessons/:lessonId/contents', () => {
    it('should return contents for a given lesson', async () => {});
  });

  describe('GET /api/contents/:id', () => {
    it('should return a specific content by ID', async () => {});
  });

  describe('POST /api/lessons/:lessonId/contents', () => {
    it('should create a new content for a lesson', async () => {});
  });

  describe('PUT /api/contents/:id', () => {
    it('should update an existing content', async () => {});
  });

  describe('DELETE /api/contents/:id', () => {
    it('should delete a content', async () => {});
  });

  describe('GET /api/contents/:contentId/progress', () => {
    it('should return progress for a given content', async () => {});
  });

  describe('GET /api/progress/:id', () => {
    it('should return a specific progress by ID', async () => {});
  });

  describe('POST /api/contents/:contentId/progress', () => {
    it('should create a new progress for a content', async () => {});
  });

  describe('PUT /api/progress/:id', () => {
    it('should update an existing progress', async () => {});
  });

  describe('DELETE /api/progress/:id', () => {
    it('should delete a progress', async () => {});
  });
});
