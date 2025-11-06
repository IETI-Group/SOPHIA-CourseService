import { describe, expect, it } from 'vitest';
import type { FavoriteCourseInDTO } from '../../../src/app/models/index.js';
import {
  favoriteCourseInDTOSchema,
  favoriteCourseUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('favoriteCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = favoriteCourseInDTOSchema().safeParse({
      userId: 'user-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: FavoriteCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = favoriteCourseInDTOSchema().safeParse({
      userId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('favoriteCourseUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = favoriteCourseUpdateDTOSchema().safeParse({
      userId: 'user-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = favoriteCourseUpdateDTOSchema().safeParse({
      courseId: 'course-789',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.courseId).toBe('course-789');
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = favoriteCourseUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = favoriteCourseUpdateDTOSchema().safeParse({
      userId: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
