import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { QuestionsQuizzRepository } from '../../../../src/app/index.js';
import { QuestionsQuizzRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/QuestionsQuizzRepositoryPostgreSQL.js';

describe('Questions Quizz Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let questionsQuizzRepository: QuestionsQuizzRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    questionsQuizzRepository = new QuestionsQuizzRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(questionsQuizzRepository).toBeDefined();
  });
});
