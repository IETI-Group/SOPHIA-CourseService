import { describe, expect, it } from 'vitest';
import type { OptionQuizInDTO } from '../../../src/app/models/index.js';
import { optionQuizInDTOSchema } from '../../../src/utils/parsers/index.js';

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
