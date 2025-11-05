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
  it('should accept valid data with all fields', () => {
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
      const data: Partial<SectionCourseUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = sectionCourseUpdateDTOSchema().safeParse({
      title: 'Updated Section Title',
      order: 3,
      active: false,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('Updated Section Title');
      expect(result.data.order).toBe(3);
      expect(result.data.active).toBe(false);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = sectionCourseUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = sectionCourseUpdateDTOSchema().safeParse({
      title: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
