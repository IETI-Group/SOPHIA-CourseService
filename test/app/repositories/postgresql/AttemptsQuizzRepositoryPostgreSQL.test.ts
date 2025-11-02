import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AttemptsQuizzRepository } from '../../../../src/app/index.js';
import { AttemptsQuizzRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/AttemptsQuizzRepositoryPostgreSQL.js';

describe('Attempts Quizz Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let attemptsQuizzRepository: AttemptsQuizzRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    attemptsQuizzRepository = new AttemptsQuizzRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(attemptsQuizzRepository).toBeDefined();
  });
});
