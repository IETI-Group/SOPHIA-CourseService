import { SubmissionStatus } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type {
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
} from '../../../src/app/models/index.js';
import {
  submissionAssignmentInDTOSchema,
  submissionAssignmentUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('submissionAssignmentInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = submissionAssignmentInDTOSchema().safeParse({
      assignmentId: 'assignment-123',
      userId: 'user-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: SubmissionAssignmentInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = submissionAssignmentInDTOSchema().safeParse({
      assignmentId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('submissionAssignmentUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = submissionAssignmentUpdateDTOSchema().safeParse({
      assignmentId: 'assignment-123',
      userId: 'user-456',
      feedback: 'Good work',
      active: true,
      score: 95,
      status: SubmissionStatus.GRADED,
    });
    if (!result.success) {
      console.log('Submission errors:', JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
    if (result.success) {
      const data: Partial<SubmissionAssignmentUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = submissionAssignmentUpdateDTOSchema().safeParse({
      feedback: 'Updated feedback',
      score: 88,
      status: SubmissionStatus.GRADED,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.feedback).toBe('Updated feedback');
      expect(result.data.score).toBe(88);
      expect(result.data.status).toBe(SubmissionStatus.GRADED);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = submissionAssignmentUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = submissionAssignmentUpdateDTOSchema().safeParse({
      assignmentId: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
