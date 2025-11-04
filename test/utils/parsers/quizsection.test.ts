import { describe, expect, it } from 'vitest';
import type { QuizSectionInDTO, QuizSectionUpdateDTO } from '../../../src/app/models/index.js';
import {
  quizSectionInDTOSchema,
  quizSectionUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('quizSectionInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = quizSectionInDTOSchema().safeParse({
      sectionId: 'section-123',
      description: 'Quiz description',
      title: 'Final Quiz',
      aiGenerated: false,
      generationTaskId: 'task-123',
      difficultyDistribution: { easy: 5, medium: 3, hard: 2 },
      adaptativeLogic: { logic: 'test' },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: QuizSectionInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = quizSectionInDTOSchema().safeParse({
      sectionId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('quizSectionUpdateDTOSchema', () => {
  it('should accept valid data', () => {
    const result = quizSectionUpdateDTOSchema().safeParse({
      sectionId: 'section-123',
      description: 'Quiz description',
      title: 'Final Quiz',
      aiGenerated: false,
      generationTaskId: 'task-123',
      difficultyDistribution: { easy: 5, medium: 3, hard: 2 },
      adaptativeLogic: { logic: 'test' },
      active: true,
      durationMinutes: 60,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: QuizSectionUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = quizSectionUpdateDTOSchema().safeParse({
      sectionId: 'section-123',
    });
    expect(result.success).toBe(false);
  });
});
