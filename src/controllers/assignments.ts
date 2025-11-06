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
    filters: FiltersAssignmentLesson,
    sort: SortingAssignments
  ): Promise<ApiResponse<unknown>> {
    return this.assignmentService.getAssignmentsLesson(filters, sort);
  }
  getAssignmentById(assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    return this.assignmentService.getAssignmentById(assignmentLessonId);
  }
  postAssignmentLesson(dto: AssignmentLessonInDTO): Promise<ApiResponse<unknown>> {
    return this.assignmentService.postAssignmentLesson(dto);
  }
  putAssignment(
    assignmentLessonId: string,
    dto: Partial<AssignmentLessonUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    return this.assignmentService.putAssignment(assignmentLessonId, dto);
  }
  deleteAssignment(assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    return this.assignmentService.deleteAssignment(assignmentLessonId);
  }
  getSubmissionsAssignment(
    filters: FiltersSubmission,
    sort: SortingSubmissions
  ): Promise<ApiResponse<unknown>> {
    return this.submissionService.getSubmissionsAssignment(filters, sort);
  }
  getSubmission(submissionId: string): Promise<ApiResponse<unknown>> {
    return this.submissionService.getSubmission(submissionId);
  }
  postSubmissionAssignment(dto: SubmissionAssignmentInDTO): Promise<ApiResponse<unknown>> {
    return this.submissionService.postSubmissionAssignment(dto);
  }
  putSubmission(
    submissionId: string,
    dto: Partial<SubmissionAssignmentUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    return this.submissionService.putSubmission(submissionId, dto);
  }
  deleteSubmission(submissionId: string): Promise<ApiResponse<unknown>> {
    return this.submissionService.deleteSubmission(submissionId);
  }
}
