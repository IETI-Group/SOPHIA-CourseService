import express, { type Express } from 'express';
//import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AssignmentsController } from '../../src/controllers/index.js';
import { createAssignmentsRouter } from '../../src/routes/assignments.js';

describe('Assignments Routes', () => {
  let app: Express;
  let mockAssignmentsController: ReturnType<typeof mockDeep<AssignmentsController>>;

  beforeEach(() => {
    mockAssignmentsController = mockDeep<AssignmentsController>();

    app = express();
    app.use(express.json());
    app.use('/api', createAssignmentsRouter(mockAssignmentsController));
  });

  afterEach(() => {
    mockReset(mockAssignmentsController);
  });

  describe('Set up test', () => {
    it('Should be defined', () => {
      expect(mockAssignmentsController).toBeDefined();
    });
  });

  describe('GET /api/lessons/:lessonId/assignments', () => {
    it('should return assignments for a given lesson', async () => {});
  });

  describe('GET /api/assignments/:id', () => {
    it('should return a specific assignment by ID', async () => {});
  });

  describe('POST /api/lessons/:lessonId/assignments', () => {
    it('should create a new assignment for a lesson', async () => {});
  });

  describe('PUT /api/assignments/:id', () => {
    it('should update an existing assignment', async () => {});
  });

  describe('DELETE /api/assignments/:id', () => {
    it('should delete an assignment', async () => {});
  });
});
