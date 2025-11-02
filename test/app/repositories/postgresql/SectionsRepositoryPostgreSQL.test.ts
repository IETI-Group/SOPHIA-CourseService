import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { SectionsRepository } from '../../../../src/app/index.js';
import { SectionsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/SectionsRepositoryPostgreSQL.js';

describe('Sections Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let sectionsRepository: SectionsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    sectionsRepository = new SectionsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(sectionsRepository).toBeDefined();
  });
});
