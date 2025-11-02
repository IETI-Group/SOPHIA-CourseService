import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { TagsCourseRepository } from '../../../../src/app/index.js';
import { TagsCourseRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/TagsCourseRepositoryPostgreSQL.js';

describe('Tags Course Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let tagsCourseRepository: TagsCourseRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    tagsCourseRepository = new TagsCourseRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(tagsCourseRepository).toBeDefined();
  });
});
