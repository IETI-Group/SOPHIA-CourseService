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
  it('should accept valid data with all fields', () => {
    const result = inscriptionCourseUpdateDTOSchema().safeParse({
      userId: 'user-123',
      courseId: 'course-456',
      progressPercentage: 75,
      score: 85,
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: Partial<InscriptionCourseUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = inscriptionCourseUpdateDTOSchema().safeParse({
      progressPercentage: 50,
      active: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.progressPercentage).toBe(50);
      expect(result.data.active).toBe(false);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = inscriptionCourseUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = inscriptionCourseUpdateDTOSchema().safeParse({
      progressPercentage: 150, // Over 100 is invalid
    });
    expect(result.success).toBe(false);
  });
});
