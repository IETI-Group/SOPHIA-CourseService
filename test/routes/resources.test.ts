import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ResourcesController } from '../../src/controllers/index.js';
import { createResourcesRouter } from '../../src/routes/resources.js';

describe('Resources Routes', () => {
  let app: Express;
  let mockResourcesController: ReturnType<typeof mockDeep<ResourcesController>>;

  beforeEach(() => {
    mockResourcesController = mockDeep<ResourcesController>();

    app = express();
    app.use(express.json());
    app.use('/api', createResourcesRouter(mockResourcesController));
  });

  afterEach(() => {
    mockReset(mockResourcesController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockResourcesController).toBeDefined();
    });
  });

  describe('GET /api/resources', () => {
    it('should return all resources', async () => {});
  });

  describe('GET /api/resources/:id', () => {
    it('should return a specific resource by ID', async () => {});
  });

  describe('POST /api/resources', () => {
    it('should create a new resource', async () => {});
  });

  describe('PUT /api/resources/:id', () => {
    it('should update an existing resource', async () => {});
  });

  describe('DELETE /api/resources/:id', () => {
    it('should delete a resource', async () => {});
  });
});
