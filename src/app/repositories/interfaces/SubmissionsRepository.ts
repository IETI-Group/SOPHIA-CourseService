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
  getSubmissions(filters: FiltersSubmission, sort: SortingSubmissions): PaginatedSubmissions;
  getSubmissionById(submissionId: string): SubmissionAssignmentOutDTO;
  createSubmission(dto: SubmissionAssignmentInDTO): SubmissionAssignmentOutDTO;
  updateSubmission(
    submissionId: string,
    dto: SubmissionAssignmentUpdateDTO
  ): SubmissionAssignmentOutDTO;
  deleteSubmissionById(submissionId: string): void;
}
