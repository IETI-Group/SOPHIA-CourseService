import type {
  AssignmentLessonInDTO,
  AssignmentLessonUpdateDTO,
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
} from '../app/index.js';
import type {
  ApiResponse,
  FiltersAssignmentLesson,
  FiltersSubmission,
  SortingAssignments,
  SortingSubmissions,
} from '../utils/index.js';

export class AssignmentsController {
  getAssignmentsLesson(
    _filters: FiltersAssignmentLesson,
    _sort: SortingAssignments
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getAssignmentById(_assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postAssignmentLesson(_dto: AssignmentLessonInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putAssignment(
    _assignmentLessonId: string,
    _dto: AssignmentLessonUpdateDTO
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteAssignment(_assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getSubmissionsAssignment(
    _filters: FiltersSubmission,
    _sort: SortingSubmissions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getSubmission(_submissionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postSubmissionAssignment(_dto: SubmissionAssignmentInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putSubmission(
    _submissionId: string,
    _dto: SubmissionAssignmentUpdateDTO
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteSubmission(_submissionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
