import {
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
import { requestSchema } from './base.js';

export const sortingAssignmentsSchema = () => {
  return requestSchema(SORT_ASSIGNMENT);
};
export const sortingAILessonSpecsSchema = () => {
  return requestSchema(SORT_AI_SPECS_LESSON);
};
export const sortingLessonsSchema = () => {
  return requestSchema(SORT_LESSON);
};
export const sortingSubmissionsSchema = () => {
  return requestSchema(SORT_SUBMISSION);
};
export const sortingInscriptionsSchema = () => {
  return requestSchema(SORT_INSCRIPTION);
};
export const sortingResourcesSchema = () => {
  return requestSchema(SORT_RESOURCE);
};
export const sortingCoursesSchema = () => {
  return requestSchema(SORT_COURSES);
};
export const sortingLessonContentSchema = () => {
  return requestSchema(SORT_LESSON_CONTENT);
};
export const sortingTagsSchema = () => {
  return requestSchema(SORT_TAG);
};
export const sortingContentProgressSchema = () => {
  return requestSchema(SORT_PROGRESS_CONTENT);
};
export const sortingCategoriesSchema = () => {
  return requestSchema(SORT_CATEGORY);
};
export const sortingQuizQuestionsSchema = () => {
  return requestSchema(SORT_QUESTION_QUIZ);
};
export const sortingSectionsSchema = () => {
  return requestSchema(SORT_SECTION);
};
export const sortingQuizOptionsSchema = () => {
  return requestSchema(SORT_OPTION_QUIZ);
};
export const sortingFavoriteCoursesSchema = () => {
  return requestSchema(SORT_FAVORITE_COURSE);
};
export const sortingSectionQuizzesSchema = () => {
  return requestSchema(SORT_QUIZ_SECTION);
};
export const sortingQuizAttemptsSchema = () => {
  return requestSchema(SORT_ATTEMPT_QUIZ);
};
