import {
  AssignmentType,
  CourseLevel,
  CourseStatus,
  DifficultyLevel,
  DiscriminantResource,
  LearningTechnique,
  LessonContentType,
  LessonType,
  ResourceType,
  SubmissionStatus,
} from '@prisma/client';
import { z } from 'zod';

export const filtersAISpecsLessonSchema = () => {
  return z
    .object({
      lessonContentId: z.string().min(1).max(200).nullable().catch(null),
      generationPromptSummary: z.string().min(1).max(2000).nullable().catch(null),
      estimatedVideoDurationMin: z.coerce.number().min(0).nullable().catch(null),
      estimatedVideoDurationMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        lessonContentId: data.lessonContentId ?? null,
        generationPromptSummary: data.generationPromptSummary ?? null,
        estimatedVideoDurationMin: data.estimatedVideoDurationMin ?? null,
        estimatedVideoDurationMax: data.estimatedVideoDurationMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersCourseSchema = () => {
  return z
    .object({
      instructorId: z.string().min(1).max(200).nullable().catch(null),
      generationTaskId: z.string().min(1).max(200).nullable().catch(null),
      title: z.string().min(1).max(500).nullable().catch(null),
      level: z.enum(CourseLevel).nullable().catch(null),
      status: z.enum(CourseStatus).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      aiGenerated: z.coerce.boolean().nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
      updatedAtStart: z.coerce.date().nullable().catch(null),
      updatedAtEnd: z.coerce.date().nullable().catch(null),
      publishedAtStart: z.coerce.date().nullable().catch(null),
      publishedAtEnd: z.coerce.date().nullable().catch(null),
      lastAIUpdateAtStart: z.coerce.date().nullable().catch(null),
      lastAIUpdateAtEnd: z.coerce.date().nullable().catch(null),
      priceMin: z.coerce.number().min(0).nullable().catch(null),
      priceMax: z.coerce.number().min(0).nullable().catch(null),
      averageReviewsMin: z.coerce.number().min(0).nullable().catch(null),
      averageReviewsMax: z.coerce.number().min(0).nullable().catch(null),
      durationHoursMin: z.coerce.number().min(0).nullable().catch(null),
      durationHoursMax: z.coerce.number().min(0).nullable().catch(null),
      totalLessonsMin: z.coerce.number().min(0).nullable().catch(null),
      totalLessonsMax: z.coerce.number().min(0).nullable().catch(null),
      totalReviewsMin: z.coerce.number().min(0).nullable().catch(null),
      totalReviewsMax: z.coerce.number().min(0).nullable().catch(null),
      totalEnrollmentsMin: z.coerce.number().min(0).nullable().catch(null),
      totalEnrollmentsMax: z.coerce.number().min(0).nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        instructorId: data.instructorId ?? null,
        generationTaskId: data.generationTaskId ?? null,
        title: data.title ?? null,
        level: data.level ?? null,
        status: data.status ?? null,
        active: data.active ?? null,
        aiGenerated: data.aiGenerated ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
        updatedAtStart: data.updatedAtStart ?? null,
        updatedAtEnd: data.updatedAtEnd ?? null,
        publishedAtStart: data.publishedAtStart ?? null,
        publishedAtEnd: data.publishedAtEnd ?? null,
        lastAIUpdateAtStart: data.lastAIUpdateAtStart ?? null,
        lastAIUpdateAtEnd: data.lastAIUpdateAtEnd ?? null,
        priceMin: data.priceMin ?? null,
        priceMax: data.priceMax ?? null,
        averageReviewsMin: data.averageReviewsMin ?? null,
        averageReviewsMax: data.averageReviewsMax ?? null,
        durationHoursMin: data.durationHoursMin ?? null,
        durationHoursMax: data.durationHoursMax ?? null,
        totalLessonsMin: data.totalLessonsMin ?? null,
        totalLessonsMax: data.totalLessonsMax ?? null,
        totalReviewsMin: data.totalReviewsMin ?? null,
        totalReviewsMax: data.totalReviewsMax ?? null,
        totalEnrollmentsMin: data.totalEnrollmentsMin ?? null,
        totalEnrollmentsMax: data.totalEnrollmentsMax ?? null,
      };
    });
};

export const filtersCategorySchema = () => {
  return z
    .object({
      name: z.string().min(1).max(200).nullable().catch(null),
      parentCategory: z.string().min(1).max(200).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        name: data.name ?? null,
        parentCategory: data.parentCategory ?? null,
        active: data.active ?? null,
      };
    });
};

export const filtersSubmissionSchema = () => {
  return z
    .object({
      assignmentId: z.string().min(1).max(200).nullable().catch(null),
      userId: z.string().min(1).max(200).nullable().catch(null),
      status: z.enum(SubmissionStatus).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      scoreMin: z.coerce.number().min(0).nullable().catch(null),
      scoreMax: z.coerce.number().min(0).nullable().catch(null),
      submittedAtStart: z.coerce.date().nullable().catch(null),
      submittedAtEnd: z.coerce.date().nullable().catch(null),
      gradedAtStart: z.coerce.date().nullable().catch(null),
      gradedAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        assignmentId: data.assignmentId ?? null,
        userId: data.userId ?? null,
        status: data.status ?? null,
        active: data.active ?? null,
        scoreMin: data.scoreMin ?? null,
        scoreMax: data.scoreMax ?? null,
        submittedAtStart: data.submittedAtStart ?? null,
        submittedAtEnd: data.submittedAtEnd ?? null,
        gradedAtStart: data.gradedAtStart ?? null,
        gradedAtEnd: data.gradedAtEnd ?? null,
      };
    });
};

export const filtersQuestionQuizSchema = () => {
  return z
    .object({
      quizId: z.string().min(1).max(200).nullable().catch(null),
      question: z.string().min(1).max(1000).nullable().catch(null),
      durationMinutesMin: z.coerce.number().min(0).nullable().catch(null),
      durationMinutesMax: z.coerce.number().min(0).nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        quizId: data.quizId ?? null,
        question: data.question ?? null,
        durationMinutesMin: data.durationMinutesMin ?? null,
        durationMinutesMax: data.durationMinutesMax ?? null,
      };
    });
};

export const filtersSectionSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(200).nullable().catch(null),
      generationTaskId: z.string().min(1).max(200).nullable().catch(null),
      title: z.string().min(1).max(500).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      aiGenerated: z.coerce.boolean().nullable().catch(null),
      suggestedByAI: z.coerce.boolean().nullable().catch(null),
      durationHoursMin: z.coerce.number().min(0).nullable().catch(null),
      durationHoursMax: z.coerce.number().min(0).nullable().catch(null),
      orderMin: z.coerce.number().min(0).nullable().catch(null),
      orderMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        courseId: data.courseId ?? null,
        generationTaskId: data.generationTaskId ?? null,
        title: data.title ?? null,
        active: data.active ?? null,
        aiGenerated: data.aiGenerated ?? null,
        suggestedByAI: data.suggestedByAI ?? null,
        durationHoursMin: data.durationHoursMin ?? null,
        durationHoursMax: data.durationHoursMax ?? null,
        orderMin: data.orderMin ?? null,
        orderMax: data.orderMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersLessonSchema = () => {
  return z
    .object({
      sectionId: z.string().min(1).max(200).nullable().catch(null),
      generationTaskId: z.string().min(1).max(200).nullable().catch(null),
      title: z.string().min(1).max(500).nullable().catch(null),
      lessonType: z.enum(LessonType).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      aiGenerated: z.coerce.boolean().nullable().catch(null),
      durationMinutesMin: z.coerce.number().min(0).nullable().catch(null),
      durationMinutesMax: z.coerce.number().min(0).nullable().catch(null),
      orderMin: z.coerce.number().min(0).nullable().catch(null),
      orderMax: z.coerce.number().min(0).nullable().catch(null),
      estimatedDifficultyMin: z.coerce.number().min(0).nullable().catch(null),
      estimatedDifficultyMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        sectionId: data.sectionId ?? null,
        generationTaskId: data.generationTaskId ?? null,
        title: data.title ?? null,
        lessonType: data.lessonType ?? null,
        active: data.active ?? null,
        aiGenerated: data.aiGenerated ?? null,
        durationMinutesMin: data.durationMinutesMin ?? null,
        durationMinutesMax: data.durationMinutesMax ?? null,
        orderMin: data.orderMin ?? null,
        orderMax: data.orderMax ?? null,
        estimatedDifficultyMin: data.estimatedDifficultyMin ?? null,
        estimatedDifficultyMax: data.estimatedDifficultyMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersLessonContentSchema = () => {
  return z
    .object({
      lessonId: z.string().min(1).max(200).nullable().catch(null),
      parentContentId: z.string().min(1).max(200).nullable().catch(null),
      generationLogId: z.string().min(1).max(200).nullable().catch(null),
      contentType: z.enum(LessonContentType).nullable().catch(null),
      difficultyLevel: z.enum(DifficultyLevel).nullable().catch(null),
      learningTechnique: z.enum(LearningTechnique).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      aiGenerated: z.coerce.boolean().nullable().catch(null),
      isCurrentVersion: z.coerce.boolean().nullable().catch(null),
      versionMin: z.coerce.number().min(0).nullable().catch(null),
      versionMax: z.coerce.number().min(0).nullable().catch(null),
      orderPreferenceMin: z.coerce.number().min(0).nullable().catch(null),
      orderPreferenceMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        lessonId: data.lessonId ?? null,
        parentContentId: data.parentContentId ?? null,
        generationLogId: data.generationLogId ?? null,
        contentType: data.contentType ?? null,
        difficultyLevel: data.difficultyLevel ?? null,
        learningTechnique: data.learningTechnique ?? null,
        active: data.active ?? null,
        aiGenerated: data.aiGenerated ?? null,
        isCurrentVersion: data.isCurrentVersion ?? null,
        versionMin: data.versionMin ?? null,
        versionMax: data.versionMax ?? null,
        orderPreferenceMin: data.orderPreferenceMin ?? null,
        orderPreferenceMax: data.orderPreferenceMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersQuizSectionSchema = () => {
  return z
    .object({
      sectionId: z.string().min(1).max(200).nullable().catch(null),
      generationTaskId: z.string().min(1).max(200).nullable().catch(null),
      title: z.string().min(1).max(500).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      aiGenerated: z.coerce.boolean().nullable().catch(null),
      durationMinutesMin: z.coerce.number().min(0).nullable().catch(null),
      durationMinutesMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        sectionId: data.sectionId ?? null,
        generationTaskId: data.generationTaskId ?? null,
        title: data.title ?? null,
        active: data.active ?? null,
        aiGenerated: data.aiGenerated ?? null,
        durationMinutesMin: data.durationMinutesMin ?? null,
        durationMinutesMax: data.durationMinutesMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersInscriptionSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(200).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      completed: z.coerce.boolean().nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        courseId: data.courseId ?? null,
        active: data.active ?? null,
        completed: data.completed ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersProgressContentSchema = () => {
  return z
    .object({
      userId: z.string().min(1).max(200).nullable().catch(null),
      lessonContentId: z.string().min(1).max(200).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      timeSpendMinutesMin: z.coerce.number().min(0).nullable().catch(null),
      timeSpendMinutesMax: z.coerce.number().min(0).nullable().catch(null),
      completionPercentageMin: z.coerce.number().min(0).nullable().catch(null),
      completionPercentageMax: z.coerce.number().min(0).nullable().catch(null),
      effectivinessScoreMin: z.coerce.number().min(0).nullable().catch(null),
      effectivinessScoreMax: z.coerce.number().min(0).nullable().catch(null),
      userRatingMin: z.coerce.number().min(0).nullable().catch(null),
      userRatingMax: z.coerce.number().min(0).nullable().catch(null),
      startedAtStart: z.coerce.date().nullable().catch(null),
      startedAtEnd: z.coerce.date().nullable().catch(null),
      completedAtStart: z.coerce.date().nullable().catch(null),
      completedAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        userId: data.userId ?? null,
        lessonContentId: data.lessonContentId ?? null,
        active: data.active ?? null,
        timeSpendMinutesMin: data.timeSpendMinutesMin ?? null,
        timeSpendMinutesMax: data.timeSpendMinutesMax ?? null,
        completionPercentageMin: data.completionPercentageMin ?? null,
        completionPercentageMax: data.completionPercentageMax ?? null,
        effectivinessScoreMin: data.effectivinessScoreMin ?? null,
        effectivinessScoreMax: data.effectivinessScoreMax ?? null,
        userRatingMin: data.userRatingMin ?? null,
        userRatingMax: data.userRatingMax ?? null,
        startedAtStart: data.startedAtStart ?? null,
        startedAtEnd: data.startedAtEnd ?? null,
        completedAtStart: data.completedAtStart ?? null,
        completedAtEnd: data.completedAtEnd ?? null,
      };
    });
};

export const filtersAttemptQuizSchema = () => {
  return z
    .object({
      quizId: z.string().min(1).max(200).nullable().catch(null),
      userId: z.string().min(1).max(200).nullable().catch(null),
      durationMinutesMin: z.coerce.number().min(0).nullable().catch(null),
      durationMinutesMax: z.coerce.number().min(0).nullable().catch(null),
      GRADEMin: z.coerce.number().min(0).nullable().catch(null),
      GRADEMax: z.coerce.number().min(0).nullable().catch(null),
      submittedAtStart: z.coerce.date().nullable().catch(null),
      submittedAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        quizId: data.quizId ?? null,
        userId: data.userId ?? null,
        durationMinutesMin: data.durationMinutesMin ?? null,
        durationMinutesMax: data.durationMinutesMax ?? null,
        GRADEMin: data.GRADEMin ?? null,
        GRADEMax: data.GRADEMax ?? null,
        submittedAtStart: data.submittedAtStart ?? null,
        submittedAtEnd: data.submittedAtEnd ?? null,
      };
    });
};

export const filtersOptionQuizSchema = () => {
  return z
    .object({
      quizQuestionId: z.string().min(1).max(200).nullable().catch(null),
      option: z.string().min(1).max(1000).nullable().catch(null),
      isCorrect: z.coerce.boolean().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        quizQuestionId: data.quizQuestionId ?? null,
        option: data.option ?? null,
        isCorrect: data.isCorrect ?? null,
      };
    });
};

export const filtersTagSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(200).nullable().catch(null),
      name: z.string().min(1).max(200).nullable().catch(null),
      categoryId: z.string().min(1).max(200).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        courseId: data.courseId ?? null,
        name: data.name ?? null,
        categoryId: data.categoryId ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersFavoriteCourseSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(200).nullable().catch(null),
      courseTitle: z.string().min(1).max(500).nullable().catch(null),
      userId: z.string().min(1).max(200).nullable().catch(null),
      courseLevel: z.enum(CourseLevel).nullable().catch(null),
      courseAverageReviewsMin: z.coerce.number().min(0).nullable().catch(null),
      courseAverageReviewsMax: z.coerce.number().min(0).nullable().catch(null),
      courseTotalEnrollmentsMin: z.coerce.number().min(0).nullable().catch(null),
      courseTotalEnrollmentsMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        courseId: data.courseId ?? null,
        courseTitle: data.courseTitle ?? null,
        userId: data.userId ?? null,
        courseLevel: data.courseLevel ?? null,
        courseAverageReviewsMin: data.courseAverageReviewsMin ?? null,
        courseAverageReviewsMax: data.courseAverageReviewsMax ?? null,
        courseTotalEnrollmentsMin: data.courseTotalEnrollmentsMin ?? null,
        courseTotalEnrollmentsMax: data.courseTotalEnrollmentsMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
      };
    });
};

export const filtersAssignmentLessonSchema = () => {
  return z
    .object({
      lessonId: z.string().min(1).max(200).nullable().catch(null),
      title: z.string().min(1).max(500).nullable().catch(null),
      allowedTypes: z.enum(AssignmentType).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      limitFileSizeMbMin: z.coerce.number().min(0).nullable().catch(null),
      limitFileSizeMbMax: z.coerce.number().min(0).nullable().catch(null),
      limitScoreMin: z.coerce.number().min(0).nullable().catch(null),
      limitScoreMax: z.coerce.number().min(0).nullable().catch(null),
      orderMin: z.coerce.number().min(0).nullable().catch(null),
      orderMax: z.coerce.number().min(0).nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
      dueDateStart: z.coerce.date().nullable().catch(null),
      dueDateEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        lessonId: data.lessonId ?? null,
        title: data.title ?? null,
        allowedTypes: data.allowedTypes ?? null,
        active: data.active ?? null,
        limitFileSizeMbMin: data.limitFileSizeMbMin ?? null,
        limitFileSizeMbMax: data.limitFileSizeMbMax ?? null,
        limitScoreMin: data.limitScoreMin ?? null,
        limitScoreMax: data.limitScoreMax ?? null,
        orderMin: data.orderMin ?? null,
        orderMax: data.orderMax ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
        dueDateStart: data.dueDateStart ?? null,
        dueDateEnd: data.dueDateEnd ?? null,
      };
    });
};

export const filtersResourceSchema = () => {
  return z
    .object({
      entityReference: z.string().min(1).max(200).nullable().catch(null),
      name: z.string().min(1).max(500).nullable().catch(null),
      discriminant: z.enum(DiscriminantResource).nullable().catch(null),
      type: z.enum(ResourceType).nullable().catch(null),
      orderMin: z.coerce.number().min(0).nullable().catch(null),
      orderMax: z.coerce.number().min(0).nullable().catch(null),
      durationSecondsMin: z.coerce.number().min(0).nullable().catch(null),
      durationSecondsMax: z.coerce.number().min(0).nullable().catch(null),
      fileSizeMbMin: z.coerce.number().min(0).nullable().catch(null),
      fileSizeMbMax: z.coerce.number().min(0).nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        entityReference: data.entityReference ?? null,
        name: data.name ?? null,
        discriminant: data.discriminant ?? null,
        type: data.type ?? null,
        orderMin: data.orderMin ?? null,
        orderMax: data.orderMax ?? null,
        durationSecondsMin: data.durationSecondsMin ?? null,
        durationSecondsMax: data.durationSecondsMax ?? null,
        fileSizeMbMin: data.fileSizeMbMin ?? null,
        fileSizeMbMax: data.fileSizeMbMax ?? null,
      };
    });
};

export const filtersForumSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(200).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
      updatedAtStart: z.coerce.date().nullable().catch(null),
      updatedAtEnd: z.coerce.date().nullable().catch(null),
      commentsCountMax: z.coerce.number().min(0).nullable().catch(null),
      commentsCountMin: z.coerce.number().min(0).nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        courseId: data.courseId ?? null,
        active: data.active ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
        updatedAtStart: data.updatedAtStart ?? null,
        updatedAtEnd: data.updatedAtEnd ?? null,
        commentsCountMin: data.commentsCountMin ?? null,
        commentsCountMax: data.commentsCountMax ?? null,
      };
    });
};

export const filtersForumMessageSchema = () => {
  return z
    .object({
      forumId: z.string().min(1).max(200).nullable().catch(null),
      userId: z.string().min(1).max(200).nullable().catch(null),
      parentMessageId: z.string().min(1).max(200).nullable().catch(null),
      content: z.string().min(1).nullable().catch(null),
      active: z.coerce.boolean().nullable().catch(null),
      createdAtStart: z.coerce.date().nullable().catch(null),
      createdAtEnd: z.coerce.date().nullable().catch(null),
      updatedAtStart: z.coerce.date().nullable().catch(null),
      updatedAtEnd: z.coerce.date().nullable().catch(null),
    })
    .partial()
    .transform((data) => {
      return {
        forumId: data.forumId ?? null,
        userId: data.userId ?? null,
        parentMessageId: data.parentMessageId ?? null,
        content: data.content ?? null,
        active: data.active ?? null,
        createdAtStart: data.createdAtStart ?? null,
        createdAtEnd: data.createdAtEnd ?? null,
        updatedAtStart: data.updatedAtStart ?? null,
        updatedAtEnd: data.updatedAtEnd ?? null,
      };
    });
};
