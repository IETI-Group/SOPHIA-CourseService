import type { ApiResponse, FiltersSubmission, SortingSubmissions } from '../../../utils/index.js';
import type {
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
} from '../../models/index.js';

export interface SubmissionService {
  getSubmissionsAssignment(
    filters: FiltersSubmission,
    sort: SortingSubmissions
  ): Promise<ApiResponse<unknown>>;
  getSubmission(submissionId: string): Promise<ApiResponse<unknown>>;
  postSubmissionAssignment(dto: SubmissionAssignmentInDTO): Promise<ApiResponse<unknown>>;
  putSubmission(
    submissionId: string,
    dto: Partial<SubmissionAssignmentUpdateDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteSubmission(submissionId: string): Promise<ApiResponse<unknown>>;
}
