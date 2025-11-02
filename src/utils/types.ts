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
// Respuesta estándar de la API
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

// Respuesta de error de la API
export interface ApiErrorResponse {
  success: false;
  error: string;
  timestamp: string;
  stack?: string;
}

// Respuesta paginada
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Query parameters para paginación
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Información de salud del servicio
export interface HealthInfo {
  success: boolean;
  message: string;
  timestamp: string;
  service: string;
  version: string;
  environment: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
}
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
