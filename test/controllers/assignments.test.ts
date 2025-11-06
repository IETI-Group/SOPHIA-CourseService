import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  AssignmentLessonInDTO,
  AssignmentLessonUpdateDTO,
  SubmissionAssignmentInDTO,
  SubmissionAssignmentUpdateDTO,
} from '../../src/app/models/index.js';
import type { AssignmentService } from '../../src/app/services/interfaces/AssignmentService.js';
import type { SubmissionService } from '../../src/app/services/interfaces/SubmissionService.js';
import { AssignmentsController } from '../../src/controllers/assignments.js';
import type {
  ASSIGNMENT_TYPE,
  FiltersAssignmentLesson,
  FiltersSubmission,
  SORT_ASSIGNMENT,
  SORT_SUBMISSION,
  SUBMISSION_STATUS,
} from '../../src/utils/index.js';

describe('AssignmentsController', () => {
  const mockAssignmentService = mockDeep<AssignmentService>();
  const mockSubmissionService = mockDeep<SubmissionService>();
  let controller: AssignmentsController;

  beforeEach(() => {
    controller = new AssignmentsController(mockAssignmentService, mockSubmissionService);
  });

  afterEach(() => {
    mockReset(mockAssignmentService);
    mockReset(mockSubmissionService);
  });

  it('should call assignmentService.getAssignmentsLesson with filters and sort', async () => {
    const filters: FiltersAssignmentLesson = {
      lessonId: 'lesson-123',
      title: null,
      allowedTypes: null,
      active: null,
      limitFileSizeMbMin: null,
      limitFileSizeMbMax: null,
      limitScoreMin: null,
      limitScoreMax: null,
      orderMin: null,
      orderMax: null,
      createdAtStart: null,
      createdAtEnd: null,
      dueDateStart: null,
      dueDateEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_ASSIGNMENT[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await controller.getAssignmentsLesson(filters, sort);

    expect(mockAssignmentService.getAssignmentsLesson).toHaveBeenCalledWith(filters, sort);
  });

  it('should call assignmentService.getAssignmentById with assignmentLessonId', async () => {
    const assignmentLessonId: string = 'assignment-123';

    await controller.getAssignmentById(assignmentLessonId);

    expect(mockAssignmentService.getAssignmentById).toHaveBeenCalledWith(assignmentLessonId);
  });

  it('should call assignmentService.postAssignmentLesson with dto', async () => {
    const dto: AssignmentLessonInDTO = {
      lessonId: 'lesson-123',
      title: 'Test Assignment',
      instructions: 'Complete the task',
      maxFileSizeMb: 10,
      allowedTypes: 'PDF' as ASSIGNMENT_TYPE,
      dueDate: new Date(),
      maxScore: 100,
    };

    await controller.postAssignmentLesson(dto);

    expect(mockAssignmentService.postAssignmentLesson).toHaveBeenCalledWith(dto);
  });

  it('should call assignmentService.putAssignment with assignmentLessonId and dto', async () => {
    const assignmentLessonId: string = 'assignment-123';
    const dto: Partial<AssignmentLessonUpdateDTO> = {
      title: 'Updated Assignment',
      active: false,
    };

    await controller.putAssignment(assignmentLessonId, dto);

    expect(mockAssignmentService.putAssignment).toHaveBeenCalledWith(assignmentLessonId, dto);
  });

  it('should call assignmentService.deleteAssignment with assignmentLessonId', async () => {
    const assignmentLessonId: string = 'assignment-123';

    await controller.deleteAssignment(assignmentLessonId);

    expect(mockAssignmentService.deleteAssignment).toHaveBeenCalledWith(assignmentLessonId);
  });

  it('should call submissionService.getSubmissionsAssignment with filters and sort', async () => {
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
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_SUBMISSION[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'desc',
      sortFields: [],
    };

    await controller.getSubmissionsAssignment(filters, sort);

    expect(mockSubmissionService.getSubmissionsAssignment).toHaveBeenCalledWith(filters, sort);
  });

  it('should call submissionService.getSubmission with submissionId', async () => {
    const submissionId: string = 'submission-123';

    await controller.getSubmission(submissionId);

    expect(mockSubmissionService.getSubmission).toHaveBeenCalledWith(submissionId);
  });

  it('should call submissionService.postSubmissionAssignment with dto', async () => {
    const dto: SubmissionAssignmentInDTO = {
      assignmentId: 'assignment-123',
      userId: 'user-123',
    };

    await controller.postSubmissionAssignment(dto);

    expect(mockSubmissionService.postSubmissionAssignment).toHaveBeenCalledWith(dto);
  });

  it('should call submissionService.putSubmission with submissionId and dto', async () => {
    const submissionId: string = 'submission-123';
    const dto: Partial<SubmissionAssignmentUpdateDTO> = {
      score: 85,
      status: 'GRADED' as SUBMISSION_STATUS,
      feedback: 'Good work',
    };

    await controller.putSubmission(submissionId, dto);

    expect(mockSubmissionService.putSubmission).toHaveBeenCalledWith(submissionId, dto);
  });

  it('should call submissionService.deleteSubmission with submissionId', async () => {
    const submissionId: string = 'submission-123';

    await controller.deleteSubmission(submissionId);

    expect(mockSubmissionService.deleteSubmission).toHaveBeenCalledWith(submissionId);
  });
});
