import { describe, expect, it } from 'vitest';
import type { OptionQuizInDTO } from '../../../src/app/models/index.js';
import {
  optionQuizInDTOSchema,
  optionQuizUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('optionQuizInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = optionQuizInDTOSchema().safeParse({
      quizQuestionId: 'question-123',
      option: 'Option A',
      isCorrect: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: OptionQuizInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = optionQuizInDTOSchema().safeParse({
      quizQuestionId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('optionQuizUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = optionQuizUpdateDTOSchema().safeParse({
      quizQuestionId: 'question-123',
      option: 'Option A',
      isCorrect: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = optionQuizUpdateDTOSchema().safeParse({
      option: 'Updated Option Text',
      isCorrect: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.option).toBe('Updated Option Text');
      expect(result.data.isCorrect).toBe(false);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = optionQuizUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = optionQuizUpdateDTOSchema().safeParse({
      option: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
