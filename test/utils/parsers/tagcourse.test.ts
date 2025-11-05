import { describe, expect, it } from 'vitest';
import type { TagCourseInDTO } from '../../../src/app/models/index.js';
import {
  tagCourseInDTOSchema,
  tagCourseUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('tagCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = tagCourseInDTOSchema().safeParse({
      categoryId: 'category-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: TagCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = tagCourseInDTOSchema().safeParse({
      categoryId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('tagCourseUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = tagCourseUpdateDTOSchema().safeParse({
      categoryId: 'category-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = tagCourseUpdateDTOSchema().safeParse({
      categoryId: 'category-789',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.categoryId).toBe('category-789');
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = tagCourseUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = tagCourseUpdateDTOSchema().safeParse({
      categoryId: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
