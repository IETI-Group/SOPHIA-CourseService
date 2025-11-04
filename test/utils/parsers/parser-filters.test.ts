import { describe, expect, it } from 'vitest';
import {
  filtersAISpecsLessonSchema,
  filtersAssignmentLessonSchema,
  filtersAttemptQuizSchema,
  filtersCategorySchema,
  filtersCourseSchema,
  filtersFavoriteCourseSchema,
  filtersInscriptionSchema,
  filtersLessonContentSchema,
  filtersLessonSchema,
  filtersOptionQuizSchema,
  filtersProgressContentSchema,
  filtersQuestionQuizSchema,
  filtersQuizSectionSchema,
  filtersResourceSchema,
  filtersSectionSchema,
  filtersSubmissionSchema,
  filtersTagSchema,
} from '../../../src/utils/parsers/filters.js';

describe('Filter Schemas', () => {
  describe('filtersAISpecsLessonSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersAISpecsLessonSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonContentId).toBeNull();
        expect(result.data.generationPromptSummary).toBeNull();
        expect(result.data.estimatedVideoDurationMin).toBeNull();
        expect(result.data.estimatedVideoDurationMax).toBeNull();
        expect(result.data.createdAtStart).toBeNull();
        expect(result.data.createdAtEnd).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersAISpecsLessonSchema().safeParse({
        lessonContentId: 'content-123',
        generationPromptSummary: 'Test prompt',
        estimatedVideoDurationMin: 10,
        estimatedVideoDurationMax: 20,
        createdAtStart: '2024-01-01',
        createdAtEnd: '2024-12-31',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonContentId).toBe('content-123');
        expect(result.data.generationPromptSummary).toBe('Test prompt');
        expect(result.data.estimatedVideoDurationMin).toBe(10);
        expect(result.data.estimatedVideoDurationMax).toBe(20);
      }
    });
  });

  describe('filtersCourseSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersCourseSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.instructorId).toBeNull();
        expect(result.data.generationTaskId).toBeNull();
        expect(result.data.title).toBeNull();
        expect(result.data.level).toBeNull();
        expect(result.data.status).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.aiGenerated).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersCourseSchema().safeParse({
        instructorId: 'instructor-123',
        title: 'Test Course',
        active: true,
        priceMin: 10,
        priceMax: 100,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.instructorId).toBe('instructor-123');
        expect(result.data.title).toBe('Test Course');
        expect(result.data.active).toBe(true);
        expect(result.data.priceMin).toBe(10);
        expect(result.data.priceMax).toBe(100);
      }
    });
  });

  describe('filtersCategorySchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersCategorySchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBeNull();
        expect(result.data.parentCategory).toBeNull();
        expect(result.data.active).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersCategorySchema().safeParse({
        name: 'Programming',
        parentCategory: 'Technology',
        active: true,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Programming');
        expect(result.data.parentCategory).toBe('Technology');
        expect(result.data.active).toBe(true);
      }
    });
  });

  describe('filtersSubmissionSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersSubmissionSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.assignmentId).toBeNull();
        expect(result.data.userId).toBeNull();
        expect(result.data.status).toBeNull();
        expect(result.data.active).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersSubmissionSchema().safeParse({
        assignmentId: 'assignment-123',
        userId: 'user-456',
        status: 'SUBMITTED',
        active: true,
        scoreMin: 0,
        scoreMax: 100,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.assignmentId).toBe('assignment-123');
        expect(result.data.userId).toBe('user-456');
        expect(result.data.status).toBe('SUBMITTED');
        expect(result.data.active).toBe(true);
      }
    });
  });

  describe('filtersQuestionQuizSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersQuestionQuizSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quizId).toBeNull();
        expect(result.data.question).toBeNull();
        expect(result.data.durationMinutesMin).toBeNull();
        expect(result.data.durationMinutesMax).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersQuestionQuizSchema().safeParse({
        quizId: 'quiz-123',
        question: 'What is TypeScript?',
        durationMinutesMin: 5,
        durationMinutesMax: 10,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quizId).toBe('quiz-123');
        expect(result.data.question).toBe('What is TypeScript?');
        expect(result.data.durationMinutesMin).toBe(5);
        expect(result.data.durationMinutesMax).toBe(10);
      }
    });
  });

  describe('filtersSectionSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersSectionSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBeNull();
        expect(result.data.generationTaskId).toBeNull();
        expect(result.data.title).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.aiGenerated).toBeNull();
        expect(result.data.suggestedByAI).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersSectionSchema().safeParse({
        courseId: 'course-123',
        title: 'Introduction',
        active: true,
        aiGenerated: false,
        durationHoursMin: 1,
        durationHoursMax: 5,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBe('course-123');
        expect(result.data.title).toBe('Introduction');
        expect(result.data.active).toBe(true);
        expect(result.data.aiGenerated).toBe(false);
      }
    });
  });

  describe('filtersLessonSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersLessonSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sectionId).toBeNull();
        expect(result.data.generationTaskId).toBeNull();
        expect(result.data.title).toBeNull();
        expect(result.data.lessonType).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.aiGenerated).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersLessonSchema().safeParse({
        sectionId: 'section-123',
        title: 'Variables in JavaScript',
        lessonType: 'VIDEO',
        active: true,
        durationMinutesMin: 10,
        durationMinutesMax: 30,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sectionId).toBe('section-123');
        expect(result.data.title).toBe('Variables in JavaScript');
        expect(result.data.lessonType).toBe('VIDEO');
        expect(result.data.active).toBe(true);
      }
    });
  });

  describe('filtersLessonContentSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersLessonContentSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonId).toBeNull();
        expect(result.data.parentContentId).toBeNull();
        expect(result.data.generationLogId).toBeNull();
        expect(result.data.contentType).toBeNull();
        expect(result.data.difficultyLevel).toBeNull();
        expect(result.data.learningTechnique).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.aiGenerated).toBeNull();
        expect(result.data.isCurrentVersion).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersLessonContentSchema().safeParse({
        lessonId: 'lesson-123',
        contentType: 'TEXT',
        difficultyLevel: 'BEGINNER',
        active: true,
        aiGenerated: true,
        isCurrentVersion: true,
        versionMin: 1,
        versionMax: 5,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonId).toBe('lesson-123');
        expect(result.data.contentType).toBe('TEXT');
        expect(result.data.difficultyLevel).toBe('BEGINNER');
        expect(result.data.active).toBe(true);
      }
    });
  });

  describe('filtersQuizSectionSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersQuizSectionSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sectionId).toBeNull();
        expect(result.data.generationTaskId).toBeNull();
        expect(result.data.title).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.aiGenerated).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersQuizSectionSchema().safeParse({
        sectionId: 'section-123',
        title: 'Final Quiz',
        active: true,
        aiGenerated: false,
        durationMinutesMin: 30,
        durationMinutesMax: 60,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sectionId).toBe('section-123');
        expect(result.data.title).toBe('Final Quiz');
        expect(result.data.active).toBe(true);
        expect(result.data.aiGenerated).toBe(false);
      }
    });
  });

  describe('filtersInscriptionSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersInscriptionSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.completed).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersInscriptionSchema().safeParse({
        courseId: 'course-123',
        active: true,
        completed: false,
        createdAtStart: '2024-01-01',
        createdAtEnd: '2024-12-31',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBe('course-123');
        expect(result.data.active).toBe(true);
        expect(result.data.completed).toBe(false);
      }
    });
  });

  describe('filtersProgressContentSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersProgressContentSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.userId).toBeNull();
        expect(result.data.lessonContentId).toBeNull();
        expect(result.data.active).toBeNull();
        expect(result.data.timeSpendMinutesMin).toBeNull();
        expect(result.data.timeSpendMinutesMax).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersProgressContentSchema().safeParse({
        userId: 'user-123',
        lessonContentId: 'content-456',
        active: true,
        completionPercentageMin: 0,
        completionPercentageMax: 100,
        userRatingMin: 1,
        userRatingMax: 5,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.userId).toBe('user-123');
        expect(result.data.lessonContentId).toBe('content-456');
        expect(result.data.active).toBe(true);
        expect(result.data.completionPercentageMin).toBe(0);
        expect(result.data.completionPercentageMax).toBe(100);
      }
    });
  });

  describe('filtersAttemptQuizSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersAttemptQuizSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quizId).toBeNull();
        expect(result.data.userId).toBeNull();
        expect(result.data.durationMinutesMin).toBeNull();
        expect(result.data.durationMinutesMax).toBeNull();
        expect(result.data.GRADEMin).toBeNull();
        expect(result.data.GRADEMax).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersAttemptQuizSchema().safeParse({
        quizId: 'quiz-123',
        userId: 'user-456',
        durationMinutesMin: 10,
        durationMinutesMax: 30,
        GRADEMin: 0,
        GRADEMax: 100,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quizId).toBe('quiz-123');
        expect(result.data.userId).toBe('user-456');
        expect(result.data.durationMinutesMin).toBe(10);
        expect(result.data.durationMinutesMax).toBe(30);
      }
    });
  });

  describe('filtersOptionQuizSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersOptionQuizSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quizQuestionId).toBeNull();
        expect(result.data.option).toBeNull();
        expect(result.data.isCorrect).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersOptionQuizSchema().safeParse({
        quizQuestionId: 'question-123',
        option: 'Option A',
        isCorrect: true,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.quizQuestionId).toBe('question-123');
        expect(result.data.option).toBe('Option A');
        expect(result.data.isCorrect).toBe(true);
      }
    });
  });

  describe('filtersTagSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersTagSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBeNull();
        expect(result.data.name).toBeNull();
        expect(result.data.categoryId).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersTagSchema().safeParse({
        courseId: 'course-123',
        name: 'JavaScript',
        categoryId: 'category-456',
        createdAtStart: '2024-01-01',
        createdAtEnd: '2024-12-31',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBe('course-123');
        expect(result.data.name).toBe('JavaScript');
        expect(result.data.categoryId).toBe('category-456');
      }
    });
  });

  describe('filtersFavoriteCourseSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersFavoriteCourseSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBeNull();
        expect(result.data.courseTitle).toBeNull();
        expect(result.data.userId).toBeNull();
        expect(result.data.courseLevel).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersFavoriteCourseSchema().safeParse({
        courseId: 'course-123',
        courseTitle: 'Advanced TypeScript',
        userId: 'user-456',
        courseLevel: 'ADVANCED',
        courseAverageReviewsMin: 4.0,
        courseAverageReviewsMax: 5.0,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.courseId).toBe('course-123');
        expect(result.data.courseTitle).toBe('Advanced TypeScript');
        expect(result.data.userId).toBe('user-456');
        expect(result.data.courseLevel).toBe('ADVANCED');
      }
    });
  });

  describe('filtersAssignmentLessonSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersAssignmentLessonSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonId).toBeNull();
        expect(result.data.title).toBeNull();
        expect(result.data.allowedTypes).toBeNull();
        expect(result.data.active).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersAssignmentLessonSchema().safeParse({
        lessonId: 'lesson-123',
        title: 'Final Project',
        allowedTypes: 'PDF',
        active: true,
        limitFileSizeMbMin: 1,
        limitFileSizeMbMax: 10,
        limitScoreMin: 0,
        limitScoreMax: 100,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lessonId).toBe('lesson-123');
        expect(result.data.title).toBe('Final Project');
        expect(result.data.allowedTypes).toBe('PDF');
        expect(result.data.active).toBe(true);
      }
    });
  });

  describe('filtersResourceSchema', () => {
    it('should return all fields as null when no data is provided', () => {
      const result = filtersResourceSchema().safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.entityReference).toBeNull();
        expect(result.data.name).toBeNull();
        expect(result.data.discriminant).toBeNull();
        expect(result.data.type).toBeNull();
      }
    });

    it('should accept and validate valid data', () => {
      const result = filtersResourceSchema().safeParse({
        entityReference: 'entity-123',
        name: 'Tutorial Video',
        discriminant: 'VIDEO',
        type: 'MP4',
        orderMin: 1,
        orderMax: 10,
        durationSecondsMin: 60,
        durationSecondsMax: 3600,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.entityReference).toBe('entity-123');
        expect(result.data.name).toBe('Tutorial Video');
        expect(result.data.discriminant).toBe('VIDEO');
        expect(result.data.type).toBe('MP4');
      }
    });
  });
});
