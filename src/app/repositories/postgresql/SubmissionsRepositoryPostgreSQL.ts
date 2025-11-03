import { SubmissionStatus } from '@prisma/client';
import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersSubmission,
  PaginatedSubmissions,
  SORT_SUBMISSION,
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

  private addExactFilter<T>(value: T | null, field: string, where: Record<string, unknown>): void {
    if (value !== null && value !== undefined) {
      where[field] = value;
    }
  }

  private addNumericRangeFilter(
    min: number | null,
    max: number | null,
    field: string,
    where: Record<string, unknown>
  ): void {
    if (min !== null || max !== null) {
      const rangeFilter: Prisma.FloatNullableFilter = {};
      if (min !== null) rangeFilter.gte = min;
      if (max !== null) rangeFilter.lte = max;
      where[field] = rangeFilter;
    }
  }

  private addDateRangeFilter(
    start: Date | null,
    end: Date | null,
    field: string,
    where: Record<string, unknown>
  ): void {
    if (start !== null || end !== null) {
      const rangeFilter: Prisma.DateTimeNullableFilter = {};
      if (start !== null) rangeFilter.gte = start;
      if (end !== null) rangeFilter.lte = end;
      where[field] = rangeFilter;
    }
  }

  private buildWhere(filters: FiltersSubmission): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    this.addExactFilter(filters.assignmentId, 'assignment_id', where);
    this.addExactFilter(filters.userId, 'user_id', where);
    this.addExactFilter(filters.status, 'status', where);
    this.addExactFilter(filters.active, 'active', where);

    this.addNumericRangeFilter(filters.scoreMin, filters.scoreMax, 'score', where);
    this.addDateRangeFilter(
      filters.submittedAtStart,
      filters.submittedAtEnd,
      'submitted_at',
      where
    );
    this.addDateRangeFilter(filters.gradedAtStart, filters.gradedAtEnd, 'greated_at', where);

    return where;
  }

  private buildSort(sort: SortingSubmissions): Record<string, Prisma.SortOrder>[] {
    const orderBy: Record<string, Prisma.SortOrder>[] = [];

    for (const field of sort.sortFields) {
      switch (field) {
        case 'ACTIVE' as SORT_SUBMISSION:
          orderBy.push({ active: sort.sortDirection });
          break;
        case 'SCORE' as SORT_SUBMISSION:
          orderBy.push({ score: sort.sortDirection });
          break;
        case 'STATUS' as SORT_SUBMISSION:
          orderBy.push({ status: sort.sortDirection });
          break;
        case 'SUBMISSION_DATE' as SORT_SUBMISSION:
          orderBy.push({ submitted_at: sort.sortDirection });
          break;
        case 'GRADING_DATE' as SORT_SUBMISSION:
          orderBy.push({ greated_at: sort.sortDirection });
          break;
      }
    }

    return orderBy;
  }

  private buildDTO(submission: {
    id_submission: string;
    assignment_id: string;
    user_id: string;
    feedback: string | null;
    greated_at: Date | null;
    submitted_at: Date | null;
    active: boolean;
    score: number | null;
    status: string;
  }): SubmissionAssignmentOutDTO {
    return {
      idSubmission: submission.id_submission,
      assignmentId: submission.assignment_id,
      userId: submission.user_id,
      feedback: submission.feedback,
      gradedAt: submission.greated_at,
      submittedAt: submission.submitted_at,
      active: submission.active,
      score: submission.score,
      status: submission.status as never,
    };
  }

  private buildPaginatedResponse(
    data: SubmissionAssignmentOutDTO[],
    page: number,
    size: number,
    total: number
  ): PaginatedSubmissions {
    return {
      success: true,
      message: 'Submissions retrieved successfully',
      data,
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      hasNext: page * size < total,
      hasPrev: page > 1,
      timestamp: new Date().toISOString(),
    };
  }

  async getSubmissions(
    filters: FiltersSubmission,
    sort: SortingSubmissions
  ): Promise<PaginatedSubmissions> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;

    const [submissions, total] = await Promise.all([
      this.prismaClient.submissions.findMany({
        where,
        orderBy,
        skip,
        take: sort.size,
      }),
      this.prismaClient.submissions.count({ where }),
    ]);

    const submissionDTOs = submissions.map((submission) => this.buildDTO(submission));

    return this.buildPaginatedResponse(submissionDTOs, sort.page, sort.size, total);
  }

  async getSubmissionById(submissionId: string): Promise<SubmissionAssignmentOutDTO> {
    const submission = await this.prismaClient.submissions.findUniqueOrThrow({
      where: { id_submission: submissionId },
    });

    return this.buildDTO(submission);
  }

  async createSubmission(dto: SubmissionAssignmentInDTO): Promise<SubmissionAssignmentOutDTO> {
    const submission = await this.prismaClient.submissions.create({
      data: {
        assignment_id: dto.assignmentId,
        user_id: dto.userId,
        active: false,
        status: SubmissionStatus.PENDING,
      },
    });

    return this.buildDTO(submission);
  }

  async updateSubmission(
    submissionId: string,
    dto: SubmissionAssignmentUpdateDTO
  ): Promise<SubmissionAssignmentOutDTO> {
    const submission = await this.prismaClient.submissions.update({
      where: { id_submission: submissionId },
      data: {
        assignment_id: dto.assignmentId,
        user_id: dto.userId,
        feedback: dto.feedback,
        active: dto.active,
        score: dto.score,
        status: dto.status as never,
      },
    });

    return this.buildDTO(submission);
  }

  async deleteSubmissionById(submissionId: string): Promise<void> {
    const result = await this.prismaClient.submissions.delete({
      where: { id_submission: submissionId },
    });
    if (!result) throw new Error('Submission not found');
  }
}
