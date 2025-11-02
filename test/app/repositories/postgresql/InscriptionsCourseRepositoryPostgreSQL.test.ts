import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { InscriptionsCourseRepository } from '../../../../src/app/index.js';
import { InscriptionsCourseRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/InscriptionsCourseRepositoryPostgreSQL.js';

describe('Inscriptions Course Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let inscriptionsCourseRepository: InscriptionsCourseRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    inscriptionsCourseRepository = new InscriptionsCourseRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(inscriptionsCourseRepository).toBeDefined();
  });
});
