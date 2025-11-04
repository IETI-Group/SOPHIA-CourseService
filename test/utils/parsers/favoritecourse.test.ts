import { describe, expect, it } from 'vitest';
import type { FavoriteCourseInDTO } from '../../../src/app/models/index.js';
import { favoriteCourseInDTOSchema } from '../../../src/utils/parsers/index.js';

describe('favoriteCourseInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = favoriteCourseInDTOSchema().safeParse({
      userId: 'user-123',
      courseId: 'course-456',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: FavoriteCourseInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = favoriteCourseInDTOSchema().safeParse({
      userId: '',
    });
    expect(result.success).toBe(false);
  });
});
