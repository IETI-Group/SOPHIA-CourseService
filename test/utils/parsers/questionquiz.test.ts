import { describe, expect, it } from 'vitest';
import type { QuestionQuizInDTO } from '../../../src/app/models/index.js';
import { questionQuizInDTOSchema } from '../../../src/utils/parsers/index.js';

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
