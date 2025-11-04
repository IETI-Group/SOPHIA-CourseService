import { describe, expect, it } from 'vitest';
import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../../../src/app/models/index.js';
import {
  sectionCourseInDTOSchema,
  sectionCourseUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('sectionCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = sectionCourseInDTOSchema().safeParse({
      courseId: 'course-123',
      title: 'Section 1',
      description: 'Section description',
      order: 1,
      aiGenerated: false,
      generationTaskId: 'task-123',
      suggestedByAi: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: SectionCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = sectionCourseInDTOSchema().safeParse({
      courseId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('sectionCourseUpdateDTOSchema', () => {
  it('should accept valid data', () => {
    const result = sectionCourseUpdateDTOSchema().safeParse({
      courseId: 'course-123',
      title: 'Section 1',
      description: 'Section description',
      order: 1,
      aiGenerated: false,
      generationTaskId: 'task-123',
      suggestedByAi: false,
      active: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: SectionCourseUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = sectionCourseUpdateDTOSchema().safeParse({
      courseId: 'course-123',
    });
    expect(result.success).toBe(false);
  });
});
