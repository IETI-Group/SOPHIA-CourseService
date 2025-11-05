import { describe, expect, it } from 'vitest';
import type { QuestionQuizInDTO } from '../../../src/app/models/index.js';
import {
  questionQuizInDTOSchema,
  questionQuizUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('questionQuizInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = questionQuizInDTOSchema().safeParse({
      quizId: 'quiz-123',
      question: 'What is TypeScript?',
      durationMinutes: 5,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: QuestionQuizInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = questionQuizInDTOSchema().safeParse({
      quizId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('questionQuizUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = questionQuizUpdateDTOSchema().safeParse({
      quizId: 'quiz-123',
      question: 'What is TypeScript?',
      durationMinutes: 5,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = questionQuizUpdateDTOSchema().safeParse({
      question: 'Updated question text?',
      durationMinutes: 10,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.question).toBe('Updated question text?');
      expect(result.data.durationMinutes).toBe(10);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = questionQuizUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = questionQuizUpdateDTOSchema().safeParse({
      question: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
