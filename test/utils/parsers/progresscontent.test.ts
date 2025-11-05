import { describe, expect, it } from 'vitest';
import type {
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
} from '../../../src/app/models/index.js';
import {
  progressContentInDTOSchema,
  progressContentUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('progressContentInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = progressContentInDTOSchema().safeParse({
      userId: 'user-123',
      lessonContentId: 'content-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: ProgressContentInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = progressContentInDTOSchema().safeParse({
      userId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('progressContentUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = progressContentUpdateDTOSchema().safeParse({
      userId: 'user-123',
      lessonContentId: 'content-456',
      timeSpendMinutes: 45,
      completionPercentage: 80,
      effectivinessScore: 90,
      active: true,
      userRating: 4.5,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: Partial<ProgressContentUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = progressContentUpdateDTOSchema().safeParse({
      completionPercentage: 90,
      userRating: 5,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.completionPercentage).toBe(90);
      expect(result.data.userRating).toBe(5);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = progressContentUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = progressContentUpdateDTOSchema().safeParse({
      completionPercentage: 150, // Over 100 is invalid
    });
    expect(result.success).toBe(false);
  });
});
