import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ProgressContentRepository } from '../../../../src/app/index.js';
import { ProgressContentRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/ProgressContentRepositoryPostgreSQL.js';

describe('Progress Content Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let progressContentRepository: ProgressContentRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    progressContentRepository = new ProgressContentRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(progressContentRepository).toBeDefined();
  });
});
