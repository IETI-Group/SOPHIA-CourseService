import { describe, expect, it } from 'vitest';
import type { AttemptQuizInDTO, AttemptQuizUpdateDTO } from '../../../src/app/models/index.js';
import {
  attemptQuizInDTOSchema,
  attemptQuizUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('attemptQuizInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = attemptQuizInDTOSchema().safeParse({
      quizId: 'quiz-123',
      userId: 'user-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: AttemptQuizInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = attemptQuizInDTOSchema().safeParse({
      quizId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('attemptQuizUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = attemptQuizUpdateDTOSchema().safeParse({
      quizId: 'quiz-123',
      userId: 'user-456',
      grade: 95,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: Partial<AttemptQuizUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = attemptQuizUpdateDTOSchema().safeParse({
      grade: 85,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.grade).toBe(85);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = attemptQuizUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = attemptQuizUpdateDTOSchema().safeParse({
      quizId: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
