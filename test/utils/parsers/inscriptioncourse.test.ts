import { describe, expect, it } from 'vitest';
import type {
  InscriptionCourseInDTO,
  InscriptionCourseUpdateDTO,
} from '../../../src/app/models/index.js';
import {
  inscriptionCourseInDTOSchema,
  inscriptionCourseUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('inscriptionCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = inscriptionCourseInDTOSchema().safeParse({
      userId: 'user-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: InscriptionCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = inscriptionCourseInDTOSchema().safeParse({
      userId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('inscriptionCourseUpdateDTOSchema', () => {
  it('should accept valid data', () => {
    const result = inscriptionCourseUpdateDTOSchema().safeParse({
      userId: 'user-123',
      courseId: 'course-456',
      progressPercentage: 75,
      score: 85,
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: InscriptionCourseUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = inscriptionCourseUpdateDTOSchema().safeParse({
      userId: 'user-123',
      progressPercentage: 150,
    });
    expect(result.success).toBe(false);
  });
});
