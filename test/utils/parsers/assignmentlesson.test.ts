import { AssignmentType } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type {
  AssignmentLessonInDTO,
  AssignmentLessonUpdateDTO,
} from '../../../src/app/models/index.js';
import {
  assignmentLessonInDTOSchema,
  assignmentLessonUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('assignmentLessonInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = assignmentLessonInDTOSchema().safeParse({
      lessonId: 'lesson-123',
      title: 'Assignment 1',
      instructions: 'Complete the task',
      maxFileSizeMb: 10,
      allowedTypes: AssignmentType.PDF,
      dueDate: '2024-12-31',
      maxScore: 100,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: AssignmentLessonInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = assignmentLessonInDTOSchema().safeParse({
      lessonId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('assignmentLessonUpdateDTOSchema', () => {
  it('should accept valid data', () => {
    const result = assignmentLessonUpdateDTOSchema().safeParse({
      lessonId: 'lesson-123',
      title: 'Assignment 1',
      instructions: 'Complete the task',
      maxFileSizeMb: 10,
      allowedTypes: AssignmentType.PDF,
      dueDate: '2024-12-31',
      maxScore: 100,
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: AssignmentLessonUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = assignmentLessonUpdateDTOSchema().safeParse({
      lessonId: 'lesson-123',
    });
    expect(result.success).toBe(false);
  });
});
