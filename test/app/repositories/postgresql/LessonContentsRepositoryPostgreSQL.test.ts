import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { LessonContentsRepository } from '../../../../src/app/index.js';
import { LessonContentsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/LessonContentsRepositoryPostgreSQL.js';

describe('Lesson Contents Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let lessonContentsRepository: LessonContentsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    lessonContentsRepository = new LessonContentsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(lessonContentsRepository).toBeDefined();
  });
});
