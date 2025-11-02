import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ResourcesRepository } from '../../../../src/app/index.js';
import { ResourcesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/ResourcesRepositoryPostgreSQL.js';

describe('Resources Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let resourcesRepository: ResourcesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    resourcesRepository = new ResourcesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(resourcesRepository).toBeDefined();
  });
});
