import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AISpecsLessonRepository } from '../../../../src/app/index.js';
import { AISpecsLessonRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/AISpecsLessonRepositoryPostgreSQL.js';

describe('AI Specs Lesson Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let aiSpecsLessonRepository: AISpecsLessonRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    aiSpecsLessonRepository = new AISpecsLessonRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(aiSpecsLessonRepository).toBeDefined();
  });
});
