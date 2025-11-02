import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { CoursesRepository } from '../../../../src/app/index.js';
import { CoursesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/CoursesRepositoryPostgreSQL.js';

describe('Courses Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let coursesRepository: CoursesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    coursesRepository = new CoursesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(coursesRepository).toBeDefined();
  });
});
