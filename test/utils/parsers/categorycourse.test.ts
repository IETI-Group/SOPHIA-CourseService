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
  it('should accept valid data', () => {
    const result = categoryCourseUpdateDTOSchema().safeParse({
      name: 'Programming',
      description: 'Programming courses',
      parentCategory: 'Technology',
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: CategoryCourseUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = categoryCourseUpdateDTOSchema().safeParse({
      name: 'Programming',
    });
    expect(result.success).toBe(false);
  });
});
