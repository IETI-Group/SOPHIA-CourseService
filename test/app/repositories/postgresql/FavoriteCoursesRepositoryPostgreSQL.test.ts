import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { FavoriteCoursesRepository } from '../../../../src/app/index.js';
import { FavoriteCoursesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/FavoriteCoursesRepositoryPostgreSQL.js';

describe('Favorite Courses Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let favoriteCoursesRepository: FavoriteCoursesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    favoriteCoursesRepository = new FavoriteCoursesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(favoriteCoursesRepository).toBeDefined();
  });
});
