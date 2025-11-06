import { type PrismaClient, SubmissionStatus } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  SubmissionAssignmentUpdateDTO,
  SubmissionsRepository,
} from '../../../../src/app/index.js';
import { SubmissionsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/SubmissionsRepositoryPostgreSQL.js';
import { SORT_SUBMISSION } from '../../../../src/utils/index.js';

describe('Submissions Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let submissionsRepository: SubmissionsRepository;

  beforeEach(() => {
    mockReset(prismaClient);
    submissionsRepository = new SubmissionsRepositoryPostgreSQL(prismaClient);
  });

  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(submissionsRepository).toBeDefined();
  });

  describe('getSubmissions', () => {
    it('Should return paginated submissions', async () => {
      const mockSubmissions = [
        {
          id_submission: '1',
          assignment_id: 'assignment-1',
          user_id: 'user-1',
          feedback: 'Good work',
          greated_at: new Date('2024-01-15'),
          submitted_at: new Date('2024-01-10'),
          active: true,
          score: 95.5,
          status: SubmissionStatus.GRADED,
        },
        {
          id_submission: '2',
          assignment_id: 'assignment-1',
          user_id: 'user-2',
          feedback: null,
          greated_at: null,
          submitted_at: new Date('2024-01-11'),
          active: true,
          score: null,
          status: SubmissionStatus.SUBMITTED,
        },
      ];

      prismaClient.submissions.findMany.mockResolvedValue(mockSubmissions);
      prismaClient.submissions.count.mockResolvedValue(2);

      const result = await submissionsRepository.getSubmissions(
        {
          assignmentId: 'assignment-1',
          userId: null,
          status: null,
          active: null,
          scoreMin: null,
          scoreMax: null,
          submittedAtStart: null,
          submittedAtEnd: null,
          gradedAtStart: null,
          gradedAtEnd: null,
        },
        {
          page: 1,
          size: 10,
          sortFields: [SORT_SUBMISSION.SUBMISSION_DATE],
          sortDirection: 'desc',
        }
      );

      expect(result).toMatchObject({
        data: [
          {
            idSubmission: '1',
            assignmentId: 'assignment-1',
            userId: 'user-1',
            feedback: 'Good work',
            gradedAt: new Date('2024-01-15'),
            submittedAt: new Date('2024-01-10'),
            active: true,
            score: 95.5,
            status: SubmissionStatus.GRADED,
          },
          {
            idSubmission: '2',
            assignmentId: 'assignment-1',
            userId: 'user-2',
            feedback: null,
            gradedAt: null,
            submittedAt: new Date('2024-01-11'),
            active: true,
            score: null,
            status: SubmissionStatus.SUBMITTED,
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
      expect(result.message).toBe('Submissions retrieved successfully');
    });
  });

  describe('getSubmissionById', () => {
    it('Should return submission by id', async () => {
      const mockSubmission = {
        id_submission: '1',
        assignment_id: 'assignment-1',
        user_id: 'user-1',
        feedback: 'Excellent work',
        greated_at: new Date('2024-01-15'),
        submitted_at: new Date('2024-01-10'),
        active: true,
        score: 98.0,
        status: SubmissionStatus.GRADED,
      };

      prismaClient.submissions.findUniqueOrThrow.mockResolvedValue(mockSubmission);

      const result = await submissionsRepository.getSubmissionById('1');

      expect(result).toEqual({
        idSubmission: '1',
        assignmentId: 'assignment-1',
        userId: 'user-1',
        feedback: 'Excellent work',
        gradedAt: new Date('2024-01-15'),
        submittedAt: new Date('2024-01-10'),
        active: true,
        score: 98.0,
        status: SubmissionStatus.GRADED,
      });
    });

    it('Should throw error when submission not found', async () => {
      prismaClient.submissions.findUniqueOrThrow.mockRejectedValue(
        new Error('Submission not found')
      );

      await expect(submissionsRepository.getSubmissionById('999')).rejects.toThrow(
        'Submission not found'
      );
    });
  });

  describe('createSubmission', () => {
    it('Should create a new submission', async () => {
      const submissionIn = {
        assignmentId: 'assignment-1',
        userId: 'user-1',
      };

      const mockCreatedSubmission = {
        id_submission: 'new-id',
        assignment_id: 'assignment-1',
        user_id: 'user-1',
        feedback: null,
        greated_at: null,
        submitted_at: null,
        active: false,
        score: null,
        status: SubmissionStatus.PENDING,
      };

      prismaClient.submissions.create.mockResolvedValue(mockCreatedSubmission);

      const result = await submissionsRepository.createSubmission(submissionIn);

      expect(result).toEqual({
        idSubmission: 'new-id',
        assignmentId: 'assignment-1',
        userId: 'user-1',
        feedback: null,
        gradedAt: null,
        submittedAt: null,
        active: false,
        score: null,
        status: SubmissionStatus.PENDING,
      });
    });
  });

  describe('updateSubmission', () => {
    it('Should update an existing submission', async () => {
      const submissionUpdate: Partial<SubmissionAssignmentUpdateDTO> = {
        assignmentId: 'assignment-1',
        userId: 'user-1',
        feedback: 'Great job!',
        active: true,
        score: 95.0,
        status: SubmissionStatus.GRADED,
      };

      const mockUpdatedSubmission = {
        id_submission: '1',
        assignment_id: 'assignment-1',
        user_id: 'user-1',
        feedback: 'Great job!',
        greated_at: new Date('2024-01-15'),
        submitted_at: new Date('2024-01-10'),
        active: true,
        score: 95.0,
        status: SubmissionStatus.GRADED,
      };

      prismaClient.submissions.update.mockResolvedValue(mockUpdatedSubmission);

      const result = await submissionsRepository.updateSubmission('1', submissionUpdate);

      expect(result).toEqual({
        idSubmission: '1',
        assignmentId: 'assignment-1',
        userId: 'user-1',
        feedback: 'Great job!',
        gradedAt: new Date('2024-01-15'),
        submittedAt: new Date('2024-01-10'),
        active: true,
        score: 95.0,
        status: SubmissionStatus.GRADED,
      });
    });

    it('Should update only some fields of a submission', async () => {
      const partialUpdate: Partial<SubmissionAssignmentUpdateDTO> = {
        feedback: 'Needs improvement',
        score: 75.0,
      };

      const existingData = {
        id_submission: '2',
        assignment_id: 'assignment-1',
        user_id: 'user-2',
        feedback: 'Needs improvement',
        greated_at: new Date('2024-01-22'),
        submitted_at: new Date('2024-01-12'),
        active: true,
        score: 75.0,
        status: SubmissionStatus.SUBMITTED,
      };

      prismaClient.submissions.update.mockResolvedValue(existingData);

      const result = await submissionsRepository.updateSubmission('2', partialUpdate);

      expect(result).toEqual({
        idSubmission: '2',
        assignmentId: 'assignment-1',
        userId: 'user-2',
        feedback: 'Needs improvement',
        gradedAt: new Date('2024-01-22'),
        submittedAt: new Date('2024-01-12'),
        active: true,
        score: 75.0,
        status: SubmissionStatus.SUBMITTED,
      });
    });

    it('Should throw error when updating non-existent submission', async () => {
      const submissionUpdate: Partial<SubmissionAssignmentUpdateDTO> = {
        assignmentId: 'assignment-1',
        userId: 'user-1',
        feedback: 'Great job!',
        active: true,
        score: 95.0,
        status: SubmissionStatus.GRADED,
      };

      prismaClient.submissions.update.mockRejectedValue(new Error('Submission not found'));

      await expect(submissionsRepository.updateSubmission('999', submissionUpdate)).rejects.toThrow(
        'Submission not found'
      );
    });
  });

  describe('deleteSubmissionById', () => {
    it('Should delete submission by id', async () => {
      prismaClient.submissions.delete.mockResolvedValue({
        id_submission: '1',
        assignment_id: 'assignment-1',
        user_id: 'user-1',
        feedback: 'Good work',
        greated_at: new Date('2024-01-15'),
        submitted_at: new Date('2024-01-10'),
        active: true,
        score: 95.5,
        status: SubmissionStatus.GRADED,
      });

      await submissionsRepository.deleteSubmissionById('1');

      expect(prismaClient.submissions.delete).toHaveBeenCalledWith({
        where: { id_submission: '1' },
      });
    });

    it('Should throw error when deleting non-existent submission', async () => {
      await expect(submissionsRepository.deleteSubmissionById('999')).rejects.toThrow();
    });
  });
});
