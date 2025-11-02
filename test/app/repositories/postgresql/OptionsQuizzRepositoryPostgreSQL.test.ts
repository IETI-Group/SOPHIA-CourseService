import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { OptionsQuizzRepository } from '../../../../src/app/index.js';
import { OptionsQuizzRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/OptionsQuizzRepositoryPostgreSQL.js';

describe('Options Quizz Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let optionsQuizzRepository: OptionsQuizzRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    optionsQuizzRepository = new OptionsQuizzRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(optionsQuizzRepository).toBeDefined();
  });
});
