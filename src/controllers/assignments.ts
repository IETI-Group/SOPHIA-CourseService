import type {
  AssignmentLessonInDTO,
  AssignmentLessonUpdateDTO,
  AssignmentService,
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
  SubmissionService,
} from '../app/index.js';
import type {
  ApiResponse,
  FiltersAssignmentLesson,
  FiltersSubmission,
  SortingAssignments,
  SortingSubmissions,
} from '../utils/index.js';

export class AssignmentsController {
  private readonly assignmentService: AssignmentService;
  private readonly submissionService: SubmissionService;

  constructor(assignmentService: AssignmentService, submissionService: SubmissionService) {
    this.assignmentService = assignmentService;
    this.submissionService = submissionService;
  }

  getAssignmentsLesson(
    _filters: FiltersAssignmentLesson,
    _sort: SortingAssignments
  ): Promise<ApiResponse<unknown>> {
    this.assignmentService;
    this.submissionService;
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
    _dto: Partial<AssignmentLessonUpdateDTO>
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
    _dto: Partial<SubmissionAssignmentUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteSubmission(_submissionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
