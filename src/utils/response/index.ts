import type {
  AISpecsLessonOutLightDTO,
  AssignmentLessonOutDTO,
  AttemptQuizOutDTO,
  CategoryCourseOutDTO,
  ContentLessonOutLightDTO,
  CourseLightDTO,
  FavoriteCourseOutDTO,
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

export interface PaginatedQuizAttempts extends ApiResponse<AttemptQuizOutDTO[]> {}
export interface PaginatedCategories extends ApiResponse<CategoryCourseOutDTO[]> {}
export interface PaginatedQuizzes extends ApiResponse<QuizSectionOutLightDTO[]> {}

export interface PaginatedTags extends ApiResponse<TagCourseOutDTO[]> {}
export interface PaginatedLessonContents extends ApiResponse<ContentLessonOutLightDTO[]> {}
export interface PaginatedContentProgress extends ApiResponse<ProgressContentOutDTO[]> {}
export interface PaginatedLessonAISpecs extends ApiResponse<AISpecsLessonOutLightDTO[]> {}

export interface PaginatedCourses extends ApiResponse<CourseLightDTO[]> {}
export interface PaginatedInscriptions extends ApiResponse<InscriptionCourseOutDTO[]> {}
export interface PaginatedFavoriteCourses extends ApiResponse<FavoriteCourseOutDTO[]> {}
export interface PaginatedQuizQuestions extends ApiResponse<QuestionQuizOutDTO[]> {}
export interface PaginatedSections extends ApiResponse<SectionCourseOutLightDTO[]> {}
export interface PaginatedQuizOptions extends ApiResponse<OptionQuizOutDTO[]> {}
export interface PaginatedLessons extends ApiResponse<LessonSectionOutLightDTO[]> {}
export interface PaginatedSubmissions extends ApiResponse<SubmissionAssignmentOutDTO[]> {}
export interface PaginatedResources extends ApiResponse<ResourcesOutLightDTO[]> {}
export interface PaginatedAssignments extends ApiResponse<AssignmentLessonOutDTO[]> {}
