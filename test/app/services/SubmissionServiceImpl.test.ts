import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
} from '../../../src/app/models/index.js';
import type { SubmissionsRepository } from '../../../src/app/repositories/index.js';
import { SubmissionServiceImpl } from '../../../src/app/services/implementations/SubmissionServiceImpl.js';
import type { FiltersSubmission, SortingSubmissions } from '../../../src/utils/index.js';

describe('SubmissionServiceImpl', () => {
  const mockSubmissionsRepository = mockDeep<SubmissionsRepository>();
  let service: SubmissionServiceImpl;

  beforeEach(() => {
    service = new SubmissionServiceImpl(mockSubmissionsRepository);
  });

  afterEach(() => {
    mockReset(mockSubmissionsRepository);
  });

  it('should call submissionsRepository.getSubmissions with filters and sort', async () => {
    const filters: FiltersSubmission = {
      assignmentId: 'assignment-123',
      userId: null,
      status: null,
      active: null,
      scoreMin: null,
      scoreMax: null,
      submittedAtStart: null,
      submittedAtEnd: null,
      gradedAtStart: null,
      gradedAtEnd: null,
    };
    const sort: SortingSubmissions = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getSubmissionsAssignment(filters, sort);

    expect(mockSubmissionsRepository.getSubmissions).toHaveBeenCalledWith(filters, sort);
  });

  it('should call submissionsRepository.getSubmissionById with submissionId', async () => {
    const submissionId: string = 'submission-123';

    await service.getSubmission(submissionId);

    expect(mockSubmissionsRepository.getSubmissionById).toHaveBeenCalledWith(submissionId);
  });

  it('should call submissionsRepository.createSubmission with dto', async () => {
    const dto: SubmissionAssignmentInDTO = {
      assignmentId: 'assignment-123',
      userId: 'user-123',
    };

    await service.postSubmissionAssignment(dto);

    expect(mockSubmissionsRepository.createSubmission).toHaveBeenCalledWith(dto);
  });

  it('should call submissionsRepository.updateSubmission with submissionId and dto', async () => {
    const submissionId: string = 'submission-123';
    const dto: Partial<SubmissionAssignmentUpdateDTO> = {
      status: 'GRADED',
      active: false,
    };

    await service.putSubmission(submissionId, dto);

    expect(mockSubmissionsRepository.updateSubmission).toHaveBeenCalledWith(submissionId, dto);
  });

  it('should call submissionsRepository.deleteSubmissionById with submissionId', async () => {
    const submissionId: string = 'submission-123';

    await service.deleteSubmission(submissionId);

    expect(mockSubmissionsRepository.deleteSubmissionById).toHaveBeenCalledWith(submissionId);
  });
});
