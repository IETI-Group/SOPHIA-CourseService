import { describe, expect, it } from 'vitest';
import type {
  CategoryCourseInDTO,
  CategoryCourseUpdateDTO,
} from '../../../src/app/models/index.js';
import {
  categoryCourseInDTOSchema,
  categoryCourseUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('categoryCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = categoryCourseInDTOSchema().safeParse({
      name: 'Programming',
      description: 'Programming courses',
      parentCategory: 'Technology',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: CategoryCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = categoryCourseInDTOSchema().safeParse({
      name: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('categoryCourseUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = categoryCourseUpdateDTOSchema().safeParse({
      name: 'Programming',
      description: 'Programming courses',
      parentCategory: 'Technology',
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: Partial<CategoryCourseUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = categoryCourseUpdateDTOSchema().safeParse({
      name: 'Updated Category',
      active: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Updated Category');
      expect(result.data.active).toBe(false);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = categoryCourseUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = categoryCourseUpdateDTOSchema().safeParse({
      name: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
