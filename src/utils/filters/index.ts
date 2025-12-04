import type {
  ASSIGNMENT_TYPE,
  COURSE_LEVEL,
  COURSE_STATUS,
  DIFFICULTY_LEVEL,
  DISCRIMINANT_RESOURCE,
  LEARNING_TECHNIQUE,
  LESSON_CONTENT_TYPE,
  LESSON_TYPE,
  RESOURCE_TYPE,
  SUBMISSION_STATUS,
} from '../../schemas/types_db.js';

// Utility type para hacer todas las propiedades opcionales y nullables
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface FiltersCourseBase {
  instructorId: string;
  generationTaskId: string;
  title: string;
  level: COURSE_LEVEL;
  status: COURSE_STATUS;
  active: boolean;
  aiGenerated: boolean;
  createdAtStart: Date;
  createdAtEnd: Date;
  updatedAtStart: Date;
  updatedAtEnd: Date;
  publishedAtStart: Date;
  publishedAtEnd: Date;
  lastAIUpdateAtStart: Date;
  lastAIUpdateAtEnd: Date;
  priceMin: number;
  priceMax: number;
  averageReviewsMin: number;
  averageReviewsMax: number;
  durationHoursMin: number;
  durationHoursMax: number;
  totalLessonsMin: number;
  totalLessonsMax: number;
  totalReviewsMin: number;
  totalReviewsMax: number;
  totalEnrollmentsMin: number;
  totalEnrollmentsMax: number;
}
export type FiltersCourse = Nullable<FiltersCourseBase>;

interface FiltersCategoryBase {
  name: string;
  parentCategory: string;
  active: boolean;
}
export type FiltersCategory = Nullable<FiltersCategoryBase>;

interface FiltersSubmissionBase {
  assignmentId: string;
  userId: string;
  status: SUBMISSION_STATUS;
  active: boolean;
  scoreMin: number;
  scoreMax: number;
  submittedAtStart: Date;
  submittedAtEnd: Date;
  gradedAtStart: Date;
  gradedAtEnd: Date;
}
export type FiltersSubmission = Nullable<FiltersSubmissionBase>;

interface FiltersQuestionQuizBase {
  quizId: string;
  question: string;
  durationMinutesMin: number;
  durationMinutesMax: number;
}
export type FiltersQuestionQuiz = Nullable<FiltersQuestionQuizBase>;

interface FiltersSectionBase {
  courseId: string;
  generationTaskId: string;
  title: string;
  active: boolean;
  aiGenerated: boolean;
  suggestedByAI: boolean;
  durationHoursMin: number;
  durationHoursMax: number;
  orderMin: number;
  orderMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersSection = Nullable<FiltersSectionBase>;

interface FiltersLessonBase {
  sectionId: string;
  generationTaskId: string;
  title: string;
  lessonType: LESSON_TYPE;
  active: boolean;
  aiGenerated: boolean;
  durationMinutesMin: number;
  durationMinutesMax: number;
  orderMin: number;
  orderMax: number;
  estimatedDifficultyMin: number;
  estimatedDifficultyMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersLesson = Nullable<FiltersLessonBase>;

interface FiltersLessonContentBase {
  lessonId: string;
  parentContentId: string;
  generationLogId: string;
  contentType: LESSON_CONTENT_TYPE;
  difficultyLevel: DIFFICULTY_LEVEL;
  learningTechnique: LEARNING_TECHNIQUE;
  active: boolean;
  aiGenerated: boolean;
  isCurrentVersion: boolean;
  versionMin: number;
  versionMax: number;
  orderPreferenceMin: number;
  orderPreferenceMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersLessonContent = Nullable<FiltersLessonContentBase>;

interface FiltersQuizSectionBase {
  sectionId: string;
  generationTaskId: string;
  title: string;
  active: boolean;
  aiGenerated: boolean;
  durationMinutesMin: number;
  durationMinutesMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersQuizSection = Nullable<FiltersQuizSectionBase>;

interface FiltersInscriptionBase {
  courseId: string;
  active: boolean;
  completed: boolean;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersInscription = Nullable<FiltersInscriptionBase>;

interface FiltersProgressContentBase {
  userId: string;
  lessonContentId: string;
  active: boolean;
  timeSpendMinutesMin: number;
  timeSpendMinutesMax: number;
  completionPercentageMin: number;
  completionPercentageMax: number;
  effectivinessScoreMin: number;
  effectivinessScoreMax: number;
  userRatingMin: number;
  userRatingMax: number;
  startedAtStart: Date;
  startedAtEnd: Date;
  completedAtStart: Date;
  completedAtEnd: Date;
}
export type FiltersProgressContent = Nullable<FiltersProgressContentBase>;

interface FiltersAttemptQuizBase {
  quizId: string;
  userId: string;
  durationMinutesMin: number;
  durationMinutesMax: number;
  GRADEMin: number;
  GRADEMax: number;
  submittedAtStart: Date;
  submittedAtEnd: Date;
}
export type FiltersAttemptQuiz = Nullable<FiltersAttemptQuizBase>;

interface FiltersOptionQuizBase {
  quizQuestionId: string;
  option: string;
  isCorrect: boolean;
}
export type FiltersOptionQuiz = Nullable<FiltersOptionQuizBase>;

interface FiltersTagBase {
  courseId: string;
  name: string;
  categoryId: string;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersTag = Nullable<FiltersTagBase>;

interface FiltersFavoriteCourseBase {
  courseId: string;
  courseTitle: string;
  userId: string;
  courseLevel: COURSE_LEVEL;
  courseAverageReviewsMin: number;
  courseAverageReviewsMax: number;
  courseTotalEnrollmentsMin: number;
  courseTotalEnrollmentsMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersFavoriteCourse = Nullable<FiltersFavoriteCourseBase>;

interface FiltersAssignmentLessonBase {
  lessonId: string;
  title: string;
  allowedTypes: ASSIGNMENT_TYPE;
  active: boolean;
  limitFileSizeMbMin: number;
  limitFileSizeMbMax: number;
  limitScoreMin: number;
  limitScoreMax: number;
  orderMin: number;
  orderMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
  dueDateStart: Date;
  dueDateEnd: Date;
}
export type FiltersAssignmentLesson = Nullable<FiltersAssignmentLessonBase>;

interface FiltersAISpecsLessonBase {
  lessonContentId: string;
  generationPromptSummary: string;
  estimatedVideoDurationMin: number;
  estimatedVideoDurationMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersAISpecsLesson = Nullable<FiltersAISpecsLessonBase>;

interface FiltersResourceBase {
  entityReference: string;
  name: string;
  discriminant: DISCRIMINANT_RESOURCE;
  type: RESOURCE_TYPE;
  orderMin: number;
  orderMax: number;
  durationSecondsMin: number;
  durationSecondsMax: number;
  fileSizeMbMin: number;
  fileSizeMbMax: number;
}
export type FiltersResource = Nullable<FiltersResourceBase>;

interface FiltersForumBase {
  courseId: string;
  active: boolean;
  commentsCountMin: number;
  commentsCountMax: number;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersForum = Nullable<FiltersForumBase>;

interface FiltersForumMessageBase {
  forumId: string;
  userId: string;
  content: string;
  parentMessageId: string;
  createdAtStart: Date;
  createdAtEnd: Date;
}
export type FiltersForumMessage = Nullable<FiltersForumMessageBase>;
