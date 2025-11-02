import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { QuizzesSectionRepository } from '../../../../src/app/index.js';
import { QuizzesSectionRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/QuizzesSectionRepositoryPostgreSQL.js';

describe('Quizzes Section Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let quizzesSectionRepository: QuizzesSectionRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    quizzesSectionRepository = new QuizzesSectionRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(quizzesSectionRepository).toBeDefined();
  });
});
