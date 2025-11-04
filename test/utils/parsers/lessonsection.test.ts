import { LessonType } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type { LessonSectionInDTO, LessonSectionUpdateDTO } from '../../../src/app/models/index.js';
import {
  lessonSectionInDTOSchema,
  lessonSectionUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('lessonSectionInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = lessonSectionInDTOSchema().safeParse({
      sectionId: 'section-123',
      title: 'Lesson 1',
      description: 'Lesson description',
      order: 1,
      durationMinutes: 30,
      aiGenerated: false,
      generationTaskId: 'task-123',
      lessonType: LessonType.THEORY,
      estimatedDifficulty: 5,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: LessonSectionInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = lessonSectionInDTOSchema().safeParse({
      sectionId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('lessonSectionUpdateDTOSchema', () => {
  it('should accept valid data', () => {
    const result = lessonSectionUpdateDTOSchema().safeParse({
      sectionId: 'section-123',
      title: 'Lesson 1',
      description: 'Lesson description',
      order: 1,
      durationMinutes: 30,
      aiGenerated: false,
      generationTaskId: 'task-123',
      lessonType: LessonType.THEORY,
      estimatedDifficulty: 5,
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: LessonSectionUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = lessonSectionUpdateDTOSchema().safeParse({
      sectionId: 'section-123',
    });
    expect(result.success).toBe(false);
  });
});
