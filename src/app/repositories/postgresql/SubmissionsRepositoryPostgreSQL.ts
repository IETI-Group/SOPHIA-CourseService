import type { PrismaClient } from '@prisma/client/default.js';
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
import type { SubmissionsRepository } from '../index.js';

export class SubmissionsRepositoryPostgreSQL implements SubmissionsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getSubmissions(
    _filters: FiltersSubmission,
    _sort: SortingSubmissions
  ): Promise<PaginatedSubmissions> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getSubmissionById(_submissionId: string): Promise<SubmissionAssignmentOutDTO> {
    throw new Error('Method not implemented.');
  }
  createSubmission(_dto: SubmissionAssignmentInDTO): Promise<SubmissionAssignmentOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateSubmission(
    _submissionId: string,
    _dto: SubmissionAssignmentUpdateDTO
  ): Promise<SubmissionAssignmentOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteSubmissionById(_submissionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
