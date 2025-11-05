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
  it('should accept valid data with all fields', () => {
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
      const data: Partial<ContentLessonUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = contentLessonUpdateDTOSchema().safeParse({
      active: false,
      isCurrentVersion: false,
      metadata: { updated: true },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.active).toBe(false);
      expect(result.data.isCurrentVersion).toBe(false);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = contentLessonUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = contentLessonUpdateDTOSchema().safeParse({
      lessonId: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
