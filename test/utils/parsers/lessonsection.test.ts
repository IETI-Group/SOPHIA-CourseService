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
  it('should accept valid data with all fields', () => {
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
      const data: Partial<LessonSectionUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = lessonSectionUpdateDTOSchema().safeParse({
      title: 'Updated Lesson Title',
      durationMinutes: 45,
      active: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('Updated Lesson Title');
      expect(result.data.durationMinutes).toBe(45);
      expect(result.data.active).toBe(false);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = lessonSectionUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = lessonSectionUpdateDTOSchema().safeParse({
      title: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
