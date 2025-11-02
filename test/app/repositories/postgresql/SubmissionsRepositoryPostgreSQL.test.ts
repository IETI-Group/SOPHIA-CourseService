import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { SubmissionsRepository } from '../../../../src/app/index.js';
import { SubmissionsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/SubmissionsRepositoryPostgreSQL.js';

describe('Submissions Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let submissionsRepository: SubmissionsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    submissionsRepository = new SubmissionsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(submissionsRepository).toBeDefined();
  });
});
