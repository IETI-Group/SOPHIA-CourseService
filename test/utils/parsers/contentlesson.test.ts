import { DifficultyLevel, LearningTechnique, LessonContentType } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type { ContentLessonInDTO, ContentLessonUpdateDTO } from '../../../src/app/models/index.js';
import {
  contentLessonInDTOSchema,
  contentLessonUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('contentLessonInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = contentLessonInDTOSchema().safeParse({
      lessonId: 'lesson-123',
      metadata: { data: 'test' },
      difficultyLevel: DifficultyLevel.BEGINNER,
      learningTechnique: LearningTechnique.VISUAL,
      orderPreference: 1,
      aiGenerated: false,
      generationLogId: 'log-123',
      contentType: LessonContentType.TEXT,
      parentContentId: 'parent-123',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: ContentLessonInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = contentLessonInDTOSchema().safeParse({
      lessonId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('contentLessonUpdateDTOSchema', () => {
  it('should accept valid data', () => {
    const result = contentLessonUpdateDTOSchema().safeParse({
      lessonId: 'lesson-123',
      metadata: { data: 'test' },
      difficultyLevel: DifficultyLevel.BEGINNER,
      learningTechnique: LearningTechnique.VISUAL,
      orderPreference: 1,
      aiGenerated: false,
      generationLogId: 'log-123',
      contentType: LessonContentType.TEXT,
      parentContentId: 'parent-123',
      active: true,
      isCurrentVersion: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: ContentLessonUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = contentLessonUpdateDTOSchema().safeParse({
      lessonId: 'lesson-123',
    });
    expect(result.success).toBe(false);
  });
});
