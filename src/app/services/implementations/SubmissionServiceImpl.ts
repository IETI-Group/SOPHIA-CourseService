import type { ApiResponse, FiltersSubmission, SortingSubmissions } from '../../../utils/index.js';
import type {
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
} from '../../models/index.js';
import type { SubmissionsRepository } from '../../repositories/index.js';
import type { SubmissionService } from '../index.js';

export class SubmissionServiceImpl implements SubmissionService {
  private readonly submissionsRepository: SubmissionsRepository;
  constructor(submissionsRepository: SubmissionsRepository) {
    this.submissionsRepository = submissionsRepository;
  }
  getSubmissionsAssignment(
    _filters: FiltersSubmission,
    _sort: SortingSubmissions
  ): Promise<ApiResponse<unknown>> {
    this.submissionsRepository;
    throw new Error('Method not implemented.');
  }
  getSubmission(_submissionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postSubmissionAssignment(_dto: SubmissionAssignmentInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putSubmission(
    _submissionId: string,
    _dto: Partial<SubmissionAssignmentUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteSubmission(_submissionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
