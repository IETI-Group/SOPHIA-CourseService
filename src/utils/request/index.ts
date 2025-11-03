import type {
  SORT_AI_SPECS_LESSON,
  SORT_ASSIGNMENT,
  SORT_ATTEMPT_QUIZ,
  SORT_CATEGORY,
  SORT_COURSES,
  SORT_FAVORITE_COURSE,
  SORT_INSCRIPTION,
  SORT_LESSON,
  SORT_LESSON_CONTENT,
  SORT_OPTION_QUIZ,
  SORT_PROGRESS_CONTENT,
  SORT_QUESTION_QUIZ,
  SORT_QUIZ_SECTION,
  SORT_RESOURCE,
  SORT_SECTION,
  SORT_SUBMISSION,
  SORT_TAG,
} from '../sort_types/index.js';

export interface ApiRequest {
  page: number;
  size: number;
  sortDirection: 'asc' | 'desc';
}

export interface Sorting<T> {
  sortFields: T[];
}

export type SortingAssignments = Sorting<SORT_ASSIGNMENT>;
export type SortingAILessonSpecs = Sorting<SORT_AI_SPECS_LESSON>;
export type SortingLessons = Sorting<SORT_LESSON>;
export type SortingSubmissions = Sorting<SORT_SUBMISSION>;
export type SortingInscriptions = Sorting<SORT_INSCRIPTION>;
export type SortingResources = Sorting<SORT_RESOURCE>;
export type SortingCourses = Sorting<SORT_COURSES>;
export type SortingLessonContent = Sorting<SORT_LESSON_CONTENT>;
export type SortingTags = Sorting<SORT_TAG>;
export type SortingContentProgress = Sorting<SORT_PROGRESS_CONTENT>;
export type SortingCategories = Sorting<SORT_CATEGORY>;
export type SortingQuizQuestions = Sorting<SORT_QUESTION_QUIZ>;
export type SortingSections = Sorting<SORT_SECTION>;
export type SortingQuizOptions = Sorting<SORT_OPTION_QUIZ>;
export type SortingFavoriteCourses = Sorting<SORT_FAVORITE_COURSE>;
export type SortingSectionQuizzes = Sorting<SORT_QUIZ_SECTION>;
export type SortingQuizAttempts = Sorting<SORT_ATTEMPT_QUIZ>;
