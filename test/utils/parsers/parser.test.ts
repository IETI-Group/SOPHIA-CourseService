import { describe, expect, it } from 'vitest';
import {
  booleanSchema,
  dateSchema,
  enumSchema,
  numberSchema,
  stringSchema,
} from '../../../src/utils/parsers/base.js';

import {
  sortingAILessonSpecsSchema,
  sortingAssignmentsSchema,
  sortingCategoriesSchema,
  sortingContentProgressSchema,
  sortingCoursesSchema,
  sortingFavoriteCoursesSchema,
  sortingInscriptionsSchema,
  sortingLessonContentSchema,
  sortingLessonsSchema,
  sortingQuizAttemptsSchema,
  sortingQuizOptionsSchema,
  sortingQuizQuestionsSchema,
  sortingResourcesSchema,
  sortingSectionQuizzesSchema,
  sortingSectionsSchema,
  sortingSubmissionsSchema,
  sortingTagsSchema,
} from '../../../src/utils/parsers/sorting.js';

describe('Parser Schemas', () => {
  describe('stringSchema', () => {
    describe('should validate correctly', () => {
      it('should accept valid string within min and max length', () => {
        const schema = stringSchema({ min: 3, max: 10 });
        const result = schema.safeParse('hello');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe('hello');
        }
      });

      it('should accept string at exact min length', () => {
        const schema = stringSchema({ min: 3, max: 10 });
        const result = schema.safeParse('abc');

        expect(result.success).toBe(true);
      });

      it('should accept string at exact max length', () => {
        const schema = stringSchema({ min: 3, max: 10 });
        const result = schema.safeParse('abcdefghij');

        expect(result.success).toBe(true);
      });

      it('should trim whitespace when trim option is true', () => {
        const schema = stringSchema({ min: 3, max: 10, trim: true });
        const result = schema.safeParse('  hello  ');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe('hello');
        }
      });

      it('should validate regex pattern', () => {
        const schema = stringSchema({ regex: /^[a-z]+$/ });
        const result = schema.safeParse('hello');

        expect(result.success).toBe(true);
      });

      it('should accept undefined when optional is true', () => {
        const schema = stringSchema({ optional: true });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(true);
      });
    });

    describe('should not validate incorrectly', () => {
      it('should reject string shorter than min length', () => {
        const schema = stringSchema({ min: 5, max: 10 });
        const result = schema.safeParse('hi');

        expect(result.success).toBe(false);
      });

      it('should reject string longer than max length', () => {
        const schema = stringSchema({ min: 3, max: 5 });
        const result = schema.safeParse('toolongstring');

        expect(result.success).toBe(false);
      });

      it('should reject non-string values', () => {
        const schema = stringSchema({ min: 1, max: 10 });
        const result = schema.safeParse(123);

        expect(result.success).toBe(false);
      });

      it('should reject string that does not match regex', () => {
        const schema = stringSchema({ regex: /^[a-z]+$/ });
        const result = schema.safeParse('Hello123');

        expect(result.success).toBe(false);
      });

      it('should reject undefined when optional is false', () => {
        const schema = stringSchema({ optional: false });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(false);
      });
    });
  });

  describe('numberSchema', () => {
    describe('should validate correctly', () => {
      it('should accept valid number within range', () => {
        const schema = numberSchema({ min: 0, max: 100 });
        const result = schema.safeParse(50);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(50);
        }
      });

      it('should accept number at exact min value', () => {
        const schema = numberSchema({ min: 10, max: 100 });
        const result = schema.safeParse(10);

        expect(result.success).toBe(true);
      });

      it('should accept number at exact max value', () => {
        const schema = numberSchema({ min: 0, max: 100 });
        const result = schema.safeParse(100);

        expect(result.success).toBe(true);
      });

      it('should accept integer when int option is true', () => {
        const schema = numberSchema({ int: true });
        const result = schema.safeParse(42);

        expect(result.success).toBe(true);
      });

      it('should coerce string to number when coerce is true', () => {
        const schema = numberSchema({ coerce: true });
        const result = schema.safeParse('123');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(123);
        }
      });

      it('should accept undefined when optional is true', () => {
        const schema = numberSchema({ optional: true });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(true);
      });
    });

    describe('should not validate incorrectly', () => {
      it('should reject number below min value', () => {
        const schema = numberSchema({ min: 10, max: 100 });
        const result = schema.safeParse(5);

        expect(result.success).toBe(false);
      });

      it('should reject number above max value', () => {
        const schema = numberSchema({ min: 0, max: 100 });
        const result = schema.safeParse(150);

        expect(result.success).toBe(false);
      });

      it('should reject decimal when int option is true', () => {
        const schema = numberSchema({ int: true });
        const result = schema.safeParse(42.5);

        expect(result.success).toBe(false);
      });

      it('should reject non-numeric string when coerce is true', () => {
        const schema = numberSchema({ coerce: true });
        const result = schema.safeParse('not a number');

        expect(result.success).toBe(false);
      });

      it('should reject undefined when optional is false', () => {
        const schema = numberSchema({ optional: false });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(false);
      });
    });
  });

  describe('booleanSchema', () => {
    describe('should validate correctly', () => {
      it('should accept true boolean', () => {
        const schema = booleanSchema({ coerce: false });
        const result = schema.safeParse(true);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(true);
        }
      });

      it('should accept false boolean', () => {
        const schema = booleanSchema({ coerce: false });
        const result = schema.safeParse(false);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(false);
        }
      });

      it('should coerce string "true" to boolean when coerce is true', () => {
        const schema = booleanSchema({ coerce: true });
        const result = schema.safeParse('true');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(true);
        }
      });

      it('should coerce string to boolean when coerce is true', () => {
        const schema = booleanSchema({ coerce: true });
        const result = schema.safeParse('true');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(true);
        }
      });

      it('should accept undefined when optional is true', () => {
        const schema = booleanSchema({ optional: true });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(true);
      });
    });

    describe('should not validate incorrectly', () => {
      it('should reject string when coerce is false', () => {
        const schema = booleanSchema({ coerce: false });
        const result = schema.safeParse('true');

        expect(result.success).toBe(false);
      });

      it('should reject number when coerce is false', () => {
        const schema = booleanSchema({ coerce: false });
        const result = schema.safeParse(1);

        expect(result.success).toBe(false);
      });

      it('should reject null value', () => {
        const schema = booleanSchema();
        const result = schema.safeParse(null);

        expect(result.success).toBe(false);
      });

      it('should reject undefined when optional is false', () => {
        const schema = booleanSchema({ optional: false });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(false);
      });
    });
  });

  describe('dateSchema', () => {
    describe('should validate correctly', () => {
      it('should accept valid Date object', () => {
        const schema = dateSchema();
        const now = new Date();
        const result = schema.safeParse(now);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBeInstanceOf(Date);
          expect((result.data as Date).getTime()).toBe(now.getTime());
        }
      });

      it('should coerce ISO string to Date when coerce is true', () => {
        const schema = dateSchema({ coerce: true });
        const isoString = '2025-11-04T10:00:00.000Z';
        const result = schema.safeParse(isoString);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBeInstanceOf(Date);
          expect((result.data as Date).toISOString()).toBe(isoString);
        }
      });

      it('should coerce timestamp to Date when coerce is true', () => {
        const schema = dateSchema({ coerce: true });
        const timestamp = Date.now();
        const result = schema.safeParse(timestamp);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBeInstanceOf(Date);
        }
      });

      it('should accept undefined when optional is true', () => {
        const schema = dateSchema({ optional: true });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(true);
      });
    });

    describe('should not validate incorrectly', () => {
      it('should reject string when coerce is false', () => {
        const schema = dateSchema({ coerce: false });
        const result = schema.safeParse('2025-11-04T10:00:00.000Z');

        expect(result.success).toBe(false);
      });

      it('should reject invalid date string even with coerce', () => {
        const schema = dateSchema({ coerce: true });
        const result = schema.safeParse('invalid date');

        expect(result.success).toBe(false);
      });

      it('should reject number when coerce is false', () => {
        const schema = dateSchema({ coerce: false });
        const result = schema.safeParse(Date.now());

        expect(result.success).toBe(false);
      });

      it('should reject undefined when optional is false', () => {
        const schema = dateSchema({ optional: false });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(false);
      });
    });
  });

  describe('enumSchema', () => {
    describe('should validate correctly', () => {
      it('should accept valid enum value', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
        const result = schema.safeParse('BEGINNER');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe('BEGINNER');
        }
      });

      it('should accept all enum values', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);

        expect(schema.safeParse('BEGINNER').success).toBe(true);
        expect(schema.safeParse('INTERMEDIATE').success).toBe(true);
        expect(schema.safeParse('ADVANCED').success).toBe(true);
      });

      it('should accept undefined when optional is true', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
          optional: true,
        });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(true);
      });
    });

    describe('should not validate incorrectly', () => {
      it('should reject value not in enum', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
        const result = schema.safeParse('EXPERT');

        expect(result.success).toBe(false);
      });

      it('should reject case-sensitive mismatch', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
        const result = schema.safeParse('beginner');

        expect(result.success).toBe(false);
      });

      it('should reject number even if it matches index', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
        const result = schema.safeParse(0);

        expect(result.success).toBe(false);
      });

      it('should reject undefined when optional is false', () => {
        const schema = enumSchema(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
          optional: false,
        });
        const result = schema.safeParse(undefined);

        expect(result.success).toBe(false);
      });
    });
  });

  describe('requestSchema', () => {
    describe('should validate correctly', () => {
      it('should apply default values for page, size, sortDirection and sortFields', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({});

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.page).toBe(1);
          expect(result.data.size).toBe(10);
          expect(result.data.sortDirection).toBe('asc');
          expect(result.data.sortFields).toEqual([]);
        }
      });

      it('should accept valid pagination parameters', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({
          page: 2,
          size: 20,
          sortDirection: 'desc',
          sortFields: ['CREATION_DATE'],
        });

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.page).toBe(2);
          expect(result.data.size).toBe(20);
          expect(result.data.sortDirection).toBe('desc');
          expect(result.data.sortFields).toEqual(['CREATION_DATE']);
        }
      });

      it('should coerce string page and size to numbers', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({
          page: '3',
          size: '25',
        });

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.page).toBe(3);
          expect(result.data.size).toBe(25);
        }
      });
    });

    describe('should not validate incorrectly', () => {
      it('should reject page less than 1', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({
          page: 0,
        });

        expect(result.success).toBe(false);
      });

      it('should reject size greater than max', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({
          size: 101,
        });

        expect(result.success).toBe(false);
      });

      it('should reject invalid sort direction', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({
          sortDirection: 'invalid',
        });

        expect(result.success).toBe(false);
      });

      it('should reject invalid sort field', () => {
        const schema = sortingAILessonSpecsSchema();
        const result = schema.safeParse({
          sortFields: ['INVALID_FIELD'],
        });

        expect(result.success).toBe(false);
      });
    });
  });

  describe('sortingAssignmentsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingAssignmentsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingAssignmentsSchema();
      const result = schema.safeParse({
        sortFields: ['TITLE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingLessonsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingLessonsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingLessonsSchema();
      const result = schema.safeParse({
        sortFields: ['TITLE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingSubmissionsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingSubmissionsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingSubmissionsSchema();
      const result = schema.safeParse({
        sortFields: ['ACTIVE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingInscriptionsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingInscriptionsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingInscriptionsSchema();
      const result = schema.safeParse({
        sortFields: ['COMPLETED'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingResourcesSchema', () => {
    it('should apply default values', () => {
      const schema = sortingResourcesSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingResourcesSchema();
      const result = schema.safeParse({
        sortFields: ['TYPE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingCoursesSchema', () => {
    it('should apply default values', () => {
      const schema = sortingCoursesSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingCoursesSchema();
      const result = schema.safeParse({
        sortFields: ['TITLE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingLessonContentSchema', () => {
    it('should apply default values', () => {
      const schema = sortingLessonContentSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingLessonContentSchema();
      const result = schema.safeParse({
        sortFields: ['VERSION'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingTagsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingTagsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingTagsSchema();
      const result = schema.safeParse({
        sortFields: ['CREATION_DATE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingContentProgressSchema', () => {
    it('should apply default values', () => {
      const schema = sortingContentProgressSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingContentProgressSchema();
      const result = schema.safeParse({
        sortFields: ['START_DATE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingCategoriesSchema', () => {
    it('should apply default values', () => {
      const schema = sortingCategoriesSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingCategoriesSchema();
      const result = schema.safeParse({
        sortFields: ['NAME'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingQuizQuestionsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingQuizQuestionsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingQuizQuestionsSchema();
      const result = schema.safeParse({
        sortFields: ['QUESTION'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingSectionsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingSectionsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingSectionsSchema();
      const result = schema.safeParse({
        sortFields: ['TITLE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingQuizOptionsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingQuizOptionsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingQuizOptionsSchema();
      const result = schema.safeParse({
        sortFields: ['OPTION'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingFavoriteCoursesSchema', () => {
    it('should apply default values', () => {
      const schema = sortingFavoriteCoursesSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingFavoriteCoursesSchema();
      const result = schema.safeParse({
        sortFields: ['CREATION_DATE'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingSectionQuizzesSchema', () => {
    it('should apply default values', () => {
      const schema = sortingSectionQuizzesSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingSectionQuizzesSchema();
      const result = schema.safeParse({
        sortFields: ['AI_GENERATED'],
      });

      expect(result.success).toBe(true);
    });
  });

  describe('sortingQuizAttemptsSchema', () => {
    it('should apply default values', () => {
      const schema = sortingQuizAttemptsSchema();
      const result = schema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.size).toBe(10);
        expect(result.data.sortDirection).toBe('asc');
        expect(result.data.sortFields).toEqual([]);
      }
    });

    it('should accept valid sort field', () => {
      const schema = sortingQuizAttemptsSchema();
      const result = schema.safeParse({
        sortFields: ['SUBMISSION_DATE'],
      });

      expect(result.success).toBe(true);
    });
  });
});
