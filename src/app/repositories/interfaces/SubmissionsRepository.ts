import type {
  FiltersSubmission,
  PaginatedSubmissions,
  SortingSubmissions,
} from '../../../utils/index.js';
import type {
  SubmissionAssignmentInDTO,
  SubmissionAssignmentOutDTO,
  SubmissionAssignmentUpdateDTO,
} from '../../models/index.js';

export interface SubmissionsRepository {
  getSubmissions(
    filters: FiltersSubmission,
    sort: SortingSubmissions
  ): Promise<PaginatedSubmissions>;
  getSubmissionById(submissionId: string): Promise<SubmissionAssignmentOutDTO>;
  createSubmission(dto: SubmissionAssignmentInDTO): Promise<SubmissionAssignmentOutDTO>;
  updateSubmission(
    submissionId: string,
    dto: SubmissionAssignmentUpdateDTO
  ): Promise<SubmissionAssignmentOutDTO>;
  deleteSubmissionById(submissionId: string): Promise<void>;
}
