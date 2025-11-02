import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AssignmentsLessonRepository } from '../../../../src/app/index.js';
import { AssignmentsLessonRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/AssignmentsLessonRepositoryPostgreSQL.js';

describe('Assignments Lesson Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let assignmentsLessonRepository: AssignmentsLessonRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    assignmentsLessonRepository = new AssignmentsLessonRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(assignmentsLessonRepository).toBeDefined();
  });
});
