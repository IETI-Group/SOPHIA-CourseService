import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { CategoriesRepository } from '../../../../src/app/index.js';
import { CategoriesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/CategoriesRepositoryPostgreSQL.js';

describe('Categories Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let categoriesRepository: CategoriesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    categoriesRepository = new CategoriesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(categoriesRepository).toBeDefined();
  });
});
