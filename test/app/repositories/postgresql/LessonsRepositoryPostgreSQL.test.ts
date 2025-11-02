import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { LessonsRepository } from '../../../../src/app/index.js';
import { LessonsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/LessonsRepositoryPostgreSQL.js';

describe('Lessons Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let lessonsRepository: LessonsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    lessonsRepository = new LessonsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(lessonsRepository).toBeDefined();
  });
});
