import { CourseLevel, CourseStatus } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type { CourseInDTO, CourseUpdateDTO } from '../../../src/app/models/index.js';
import { courseInDTOSchema, courseUpdateDTOSchema } from '../../../src/utils/parsers/index.js';

describe('courseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = courseInDTOSchema().safeParse({
      instructorId: 'instructor-123',
      title: 'Test Course',
      description: 'Course description',
      price: 99.99,
      level: CourseLevel.BEGINNER,
      aiGenerated: false,
      generationTaskId: 'task-123',
      generationMetadata: { metadata: 'test' },
      lastAIUpdateAt: '2024-01-01',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: CourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = courseInDTOSchema().safeParse({
      title: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('courseUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = courseUpdateDTOSchema().safeParse({
      instructorId: 'instructor-123',
      title: 'Test Course',
      description: 'Course description',
      price: 99.99,
      level: CourseLevel.BEGINNER,
      aiGenerated: false,
      generationTaskId: 'task-123',
      generationMetadata: { metadata: 'test' },
      lastAIUpdateAt: '2024-01-01',
      active: true,
      status: CourseStatus.PUBLISHED,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: Partial<CourseUpdateDTO> = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = courseUpdateDTOSchema().safeParse({
      title: 'Updated Course Title',
      price: 149.99,
      status: CourseStatus.DRAFT,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('Updated Course Title');
      expect(result.data.price).toBe(149.99);
      expect(result.data.status).toBe(CourseStatus.DRAFT);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = courseUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = courseUpdateDTOSchema().safeParse({
      title: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
