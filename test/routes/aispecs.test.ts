import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AISpecsController } from '../../src/controllers/index.js';
import { createAISpecsRouter } from '../../src/routes/aispecs.js';

describe('AI Specs Routes', () => {
  let app: Express;
  let mockAISpecsController: ReturnType<typeof mockDeep<AISpecsController>>;

  beforeEach(() => {
    mockAISpecsController = mockDeep<AISpecsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createAISpecsRouter(mockAISpecsController));
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
    it('should return AI specs for a given lesson', async () => {});
  });

  describe('GET /api/ai-specs/:id', () => {
    it('should return a specific AI spec by ID', async () => {});
  });

  describe('POST /api/lessons/:lessonId/ai-specs', () => {
    it('should create a new AI spec for a lesson', async () => {});
  });

  describe('PUT /api/ai-specs/:id', () => {
    it('should update an existing AI spec', async () => {});
  });

  describe('DELETE /api/ai-specs/:id', () => {
    it('should delete an AI spec', async () => {});
  });
});
