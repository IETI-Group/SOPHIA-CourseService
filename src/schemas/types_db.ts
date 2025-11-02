import type {
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

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type COURSE_LEVEL = CourseLevel;
export type COURSE_STATUS = CourseStatus;
export type DIFFICULTY_LEVEL = DifficultyLevel;
export type SUBMISSION_STATUS = SubmissionStatus;
export type LEARNING_TECHNIQUE = LearningTechnique;
export type LESSON_CONTENT_TYPE = LessonContentType;
export type LESSON_TYPE = LessonType;
export type ASSIGNMENT_TYPE = AssignmentType;
export type RESOURCE_TYPE = ResourceType;
export type DISCRIMINANT_RESOURCE = DiscriminantResource;
