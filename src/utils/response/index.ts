import type {
  AISpecsLessonOutLightDTO,
  AssignmentLessonOutDTO,
  AttemptQuizOutDTO,
  CategoryCourseOutDTO,
  ContentLessonOutLightDTO,
  CourseLightDTO,
  FavoriteCourseOutDTO,
  ForumLightDTO,
  ForumMessageLightDTO,
  InscriptionCourseOutDTO,
  LessonSectionOutLightDTO,
  OptionQuizOutDTO,
  ProgressContentOutDTO,
  QuestionQuizOutDTO,
  QuizSectionOutLightDTO,
  ResourcesOutLightDTO,
  SectionCourseOutLightDTO,
  SubmissionAssignmentOutDTO,
  TagCourseOutDTO,
} from '../../app/models/index.js';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedQuizAttempts extends PaginatedResponse<AttemptQuizOutDTO[]> {}
export interface PaginatedCategories extends PaginatedResponse<CategoryCourseOutDTO[]> {}
export interface PaginatedQuizzes extends PaginatedResponse<QuizSectionOutLightDTO[]> {}

export interface PaginatedTags extends PaginatedResponse<TagCourseOutDTO[]> {}
export interface PaginatedLessonContents extends PaginatedResponse<ContentLessonOutLightDTO[]> {}
export interface PaginatedContentProgress extends PaginatedResponse<ProgressContentOutDTO[]> {}
export interface PaginatedLessonAISpecs extends PaginatedResponse<AISpecsLessonOutLightDTO[]> {}

export interface PaginatedCourses extends PaginatedResponse<CourseLightDTO[]> {}
export interface PaginatedInscriptions extends PaginatedResponse<InscriptionCourseOutDTO[]> {}
export interface PaginatedFavoriteCourses extends PaginatedResponse<FavoriteCourseOutDTO[]> {}
export interface PaginatedQuizQuestions extends PaginatedResponse<QuestionQuizOutDTO[]> {}
export interface PaginatedSections extends PaginatedResponse<SectionCourseOutLightDTO[]> {}
export interface PaginatedQuizOptions extends PaginatedResponse<OptionQuizOutDTO[]> {}
export interface PaginatedLessons extends PaginatedResponse<LessonSectionOutLightDTO[]> {}
export interface PaginatedSubmissions extends PaginatedResponse<SubmissionAssignmentOutDTO[]> {}
export interface PaginatedResources extends PaginatedResponse<ResourcesOutLightDTO[]> {}
export interface PaginatedAssignments extends PaginatedResponse<AssignmentLessonOutDTO[]> {}
export interface PaginatedForums extends PaginatedResponse<ForumLightDTO[]> {}
export interface PaginatedForumMessages extends PaginatedResponse<ForumMessageLightDTO[]> {}

export const parseApiResponse = (
  data: unknown,
  message = 'Request successful'
): ApiResponse<unknown> => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};
