import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { SectionsController } from '../../src/controllers/index.js';
import { createSectionsRouter } from '../../src/routes/sections.js';

describe('Sections Routes', () => {
  let app: Express;
  let mockSectionsController: ReturnType<typeof mockDeep<SectionsController>>;

  beforeEach(() => {
    mockSectionsController = mockDeep<SectionsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createSectionsRouter(mockSectionsController));
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
    it('should return sections for a given course', async () => {});
  });

  describe('GET /api/sections/:id', () => {
    it('should return a specific section by ID', async () => {});
  });

  describe('POST /api/courses/:courseId/sections', () => {
    it('should create a new section for a course', async () => {});
  });

  describe('PUT /api/sections/:id', () => {
    it('should update an existing section', async () => {});
  });

  describe('DELETE /api/sections/:id', () => {
    it('should delete a section', async () => {});
  });
});
