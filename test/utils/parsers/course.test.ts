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
  it('should accept valid data', () => {
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
      const data: CourseUpdateDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject missing required fields', () => {
    const result = courseUpdateDTOSchema().safeParse({
      title: 'Test Course',
    });
    expect(result.success).toBe(false);
  });
});
