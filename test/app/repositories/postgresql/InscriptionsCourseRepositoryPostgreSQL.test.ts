import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  InscriptionCourseUpdateDTO,
  InscriptionsCourseRepository,
} from '../../../../src/app/index.js';
import { InscriptionsCourseRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/InscriptionsCourseRepositoryPostgreSQL.js';
import { SORT_INSCRIPTION } from '../../../../src/utils/index.js';

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

  describe('getInscriptions', () => {
    it('Should return paginated inscriptions', async () => {
      const mockInscriptions = [
        {
          id_inscription: 'inscription-1',
          user_id: 'user-1',
          course_id: 'course-1',
          created_at: new Date('2024-01-10'),
          progress_percentage: 75.5,
          score: 85.0,
          active: true,
          completed: false,
        },
        {
          id_inscription: 'inscription-2',
          user_id: 'user-1',
          course_id: 'course-2',
          created_at: new Date('2024-01-15'),
          progress_percentage: 100.0,
          score: 95.0,
          active: true,
          completed: true,
        },
      ];

      prismaClient.inscriptions.findMany.mockResolvedValue(mockInscriptions);
      prismaClient.inscriptions.count.mockResolvedValue(2);

      const result = await inscriptionsCourseRepository.getInscriptions(
        {
          courseId: null,
          active: true,
          completed: null,
          createdAtStart: null,
          createdAtEnd: null,
        },
        {
          page: 1,
          size: 10,
          sortFields: [SORT_INSCRIPTION.CREATION_DATE],
          sortDirection: 'desc',
        }
      );

      expect(result).toMatchObject({
        data: [
          {
            idInscription: 'inscription-1',
            userId: 'user-1',
            courseId: 'course-1',
            createdAt: new Date('2024-01-10'),
            progressPercentage: 75.5,
            score: 85.0,
            active: true,
            completed: false,
          },
          {
            idInscription: 'inscription-2',
            userId: 'user-1',
            courseId: 'course-2',
            createdAt: new Date('2024-01-15'),
            progressPercentage: 100.0,
            score: 95.0,
            active: true,
            completed: true,
          },
        ],
        page: 1,
        size: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
      expect(result.success).toBe(true);
      expect(result.message).toBe('Inscriptions retrieved successfully');
    });
  });

  describe('getInscriptionById', () => {
    it('Should return inscription by id', async () => {
      const mockInscription = {
        id_inscription: 'inscription-1',
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        progress_percentage: 75.5,
        score: 85.0,
        active: true,
        completed: false,
      };

      prismaClient.inscriptions.findUniqueOrThrow.mockResolvedValue(mockInscription);

      const result = await inscriptionsCourseRepository.getInscriptionById('inscription-1');

      expect(result).toEqual({
        idInscription: 'inscription-1',
        userId: 'user-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        progressPercentage: 75.5,
        score: 85.0,
        active: true,
        completed: false,
      });
    });

    it('Should throw error when inscription not found', async () => {
      prismaClient.inscriptions.findUniqueOrThrow.mockRejectedValue(
        new Error('Inscription not found')
      );

      await expect(
        inscriptionsCourseRepository.getInscriptionById('inscription-999')
      ).rejects.toThrow('Inscription not found');
    });
  });

  describe('createInscription', () => {
    it('Should create a new inscription', async () => {
      const inscriptionIn = {
        userId: 'user-1',
        courseId: 'course-1',
      };

      const mockCreatedInscription = {
        id_inscription: 'inscription-1',
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        progress_percentage: 0.0,
        score: null,
        active: false,
        completed: false,
      };

      prismaClient.inscriptions.create.mockResolvedValue(mockCreatedInscription);

      const result = await inscriptionsCourseRepository.createInscription(inscriptionIn);

      expect(result).toEqual({
        idInscription: 'inscription-1',
        userId: 'user-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        progressPercentage: 0.0,
        score: null,
        active: false,
        completed: false,
      });
    });
  });

  describe('updateInscription', () => {
    it('Should update an existing inscription', async () => {
      const inscriptionUpdate: Partial<InscriptionCourseUpdateDTO> = {
        userId: 'user-1',
        courseId: 'course-1',
        progressPercentage: 100.0,
        score: 95.0,
        active: true,
      };

      const mockUpdatedInscription = {
        id_inscription: 'inscription-1',
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        progress_percentage: 100.0,
        score: 95.0,
        active: true,
        completed: true,
      };

      prismaClient.inscriptions.update.mockResolvedValue(mockUpdatedInscription);

      const result = await inscriptionsCourseRepository.updateInscription(
        'inscription-1',
        inscriptionUpdate
      );

      expect(result).toEqual({
        idInscription: 'inscription-1',
        userId: 'user-1',
        courseId: 'course-1',
        createdAt: new Date('2024-01-10'),
        progressPercentage: 100.0,
        score: 95.0,
        active: true,
        completed: true,
      });
    });

    it('Should update only progress and score fields', async () => {
      const partialUpdate: Partial<InscriptionCourseUpdateDTO> = {
        progressPercentage: 50.0,
        score: 75.0,
      };

      const mockUpdatedInscription = {
        id_inscription: 'inscription-2',
        user_id: 'user-2',
        course_id: 'course-2',
        created_at: new Date('2024-01-15'),
        progress_percentage: 50.0,
        score: 75.0,
        active: true,
        completed: false,
      };

      prismaClient.inscriptions.update.mockResolvedValue(mockUpdatedInscription);

      const result = await inscriptionsCourseRepository.updateInscription(
        'inscription-2',
        partialUpdate
      );

      expect(result).toEqual({
        idInscription: 'inscription-2',
        userId: 'user-2',
        courseId: 'course-2',
        createdAt: new Date('2024-01-15'),
        progressPercentage: 50.0,
        score: 75.0,
        active: true,
        completed: false,
      });
    });

    it('Should throw error when updating non-existent inscription', async () => {
      const inscriptionUpdate: Partial<InscriptionCourseUpdateDTO> = {
        userId: 'user-1',
        courseId: 'course-1',
        progressPercentage: 50.0,
        score: null,
        active: true,
      };

      prismaClient.inscriptions.update.mockRejectedValue(new Error('Inscription not found'));

      await expect(
        inscriptionsCourseRepository.updateInscription('inscription-999', inscriptionUpdate)
      ).rejects.toThrow('Inscription not found');
    });
  });

  describe('deleteInscriptionById', () => {
    it('Should delete inscription by id', async () => {
      prismaClient.inscriptions.delete.mockResolvedValue({
        id_inscription: 'inscription-1',
        user_id: 'user-1',
        course_id: 'course-1',
        created_at: new Date('2024-01-10'),
        progress_percentage: 75.5,
        score: 85.0,
        active: true,
        completed: false,
      });

      await inscriptionsCourseRepository.deleteInscriptionById('inscription-1');

      expect(prismaClient.inscriptions.delete).toHaveBeenCalledWith({
        where: { id_inscription: 'inscription-1' },
      });
    });

    it('Should throw error when deleting non-existent inscription', async () => {
      prismaClient.inscriptions.delete.mockRejectedValue(null);

      await expect(
        inscriptionsCourseRepository.deleteInscriptionById('inscription-999')
      ).rejects.toThrow();
    });
  });
});
