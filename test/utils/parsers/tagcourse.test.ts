import { describe, expect, it } from 'vitest';
import type { TagCourseInDTO } from '../../../src/app/models/index.js';
import { tagCourseInDTOSchema } from '../../../src/utils/parsers/index.js';

describe('tagCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = tagCourseInDTOSchema().safeParse({
      categoryId: 'category-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: TagCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = tagCourseInDTOSchema().safeParse({
      categoryId: '',
    });
    expect(result.success).toBe(false);
  });
});
