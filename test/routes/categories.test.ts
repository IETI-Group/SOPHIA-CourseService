import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { CategoriesController } from '../../src/controllers/index.js';
import { createCategoriesRouter } from '../../src/routes/categories.js';

describe('Categories Routes', () => {
  let app: Express;
  let mockCategoriesController: ReturnType<typeof mockDeep<CategoriesController>>;

  beforeEach(() => {
    mockCategoriesController = mockDeep<CategoriesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createCategoriesRouter(mockCategoriesController));
  });

  afterEach(() => {
    mockReset(mockCategoriesController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockCategoriesController).toBeDefined();
    });
  });

  describe('GET /api/categories', () => {
    it('should return all categories', async () => {});
  });

  describe('GET /api/categories/:id', () => {
    it('should return a specific category by ID', async () => {});
  });

  describe('POST /api/categories', () => {
    it('should create a new category', async () => {});
  });

  describe('PUT /api/categories/:id', () => {
    it('should update an existing category', async () => {});
  });

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category', async () => {});
  });
});
