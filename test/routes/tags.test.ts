import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { TagsController } from '../../src/controllers/index.js';
import { createTagsRouter } from '../../src/routes/tags.js';

describe('Tags Routes', () => {
  let app: Express;
  let mockTagsController: ReturnType<typeof mockDeep<TagsController>>;

  beforeEach(() => {
    mockTagsController = mockDeep<TagsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createTagsRouter(mockTagsController));
  });

  afterEach(() => {
    mockReset(mockTagsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockTagsController).toBeDefined();
    });
  });

  describe('GET /api/tags', () => {
    it('should return all tags', async () => {});
  });

  describe('GET /api/tags/:id', () => {
    it('should return a specific tag by ID', async () => {});
  });

  describe('POST /api/tags', () => {
    it('should create a new tag', async () => {});
  });

  describe('PUT /api/tags/:id', () => {
    it('should update an existing tag', async () => {});
  });

  describe('DELETE /api/tags/:id', () => {
    it('should delete a tag', async () => {});
  });
});
