import {
  type ApiResponse,
  type FiltersSubmission,
  parseApiResponse,
  type SortingSubmissions,
} from '../../../utils/index.js';
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
    filters: FiltersSubmission,
    sort: SortingSubmissions
  ): Promise<ApiResponse<unknown>> {
    return this.submissionsRepository.getSubmissions(filters, sort);
  }
  async getSubmission(submissionId: string): Promise<ApiResponse<unknown>> {
    const result = await this.submissionsRepository.getSubmissionById(submissionId);
    return parseApiResponse(result, 'Submission retrieved successfully');
  }
  async postSubmissionAssignment(dto: SubmissionAssignmentInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.submissionsRepository.createSubmission(dto);
    return parseApiResponse(result, 'Submission created successfully');
  }
  async putSubmission(
    submissionId: string,
    dto: Partial<SubmissionAssignmentUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.submissionsRepository.updateSubmission(submissionId, dto);
    return parseApiResponse(result, 'Submission updated successfully');
  }
  async deleteSubmission(submissionId: string): Promise<ApiResponse<unknown>> {
    await this.submissionsRepository.deleteSubmissionById(submissionId);
    return parseApiResponse(null, 'Submission deleted successfully');
  }
}
