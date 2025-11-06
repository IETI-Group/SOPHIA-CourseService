import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  AssignmentLessonInDTO,
  AssignmentLessonUpdateDTO,
} from '../../../src/app/models/index.js';
import type { AssignmentsLessonRepository } from '../../../src/app/repositories/index.js';
import { AssignmentServiceImpl } from '../../../src/app/services/implementations/AssignmentServiceImpl.js';
import type { FiltersAssignmentLesson, SortingAssignments } from '../../../src/utils/index.js';

describe('AssignmentServiceImpl', () => {
  const mockAssignmentsLessonRepository = mockDeep<AssignmentsLessonRepository>();
  let service: AssignmentServiceImpl;

  beforeEach(() => {
    service = new AssignmentServiceImpl(mockAssignmentsLessonRepository);
  });

  afterEach(() => {
    mockReset(mockAssignmentsLessonRepository);
  });

  it('should call assignmentsLessonRepository.getAssignments with filters and sort', async () => {
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
    const sort: SortingAssignments = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getAssignmentsLesson(filters, sort);

    expect(mockAssignmentsLessonRepository.getAssignments).toHaveBeenCalledWith(filters, sort);
  });

  it('should call assignmentsLessonRepository.getAssignmentById with assignmentLessonId', async () => {
    const assignmentLessonId: string = 'assignment-123';

    await service.getAssignmentById(assignmentLessonId);

    expect(mockAssignmentsLessonRepository.getAssignmentById).toHaveBeenCalledWith(
      assignmentLessonId
    );
  });

  it('should call assignmentsLessonRepository.createAssignment with dto', async () => {
    const dto: AssignmentLessonInDTO = {
      lessonId: 'lesson-123',
      title: 'New Assignment',
      instructions: 'Assignment instructions',
      allowedTypes: 'PDF',
      maxFileSizeMb: 10,
      maxScore: 100,
      dueDate: new Date(),
    };

    await service.postAssignmentLesson(dto);

    expect(mockAssignmentsLessonRepository.createAssignment).toHaveBeenCalledWith(dto);
  });

  it('should call assignmentsLessonRepository.updateAssignment with assignmentLessonId and dto', async () => {
    const assignmentLessonId: string = 'assignment-123';
    const dto: Partial<AssignmentLessonUpdateDTO> = {
      title: 'Updated Assignment',
      active: false,
    };

    await service.putAssignment(assignmentLessonId, dto);

    expect(mockAssignmentsLessonRepository.updateAssignment).toHaveBeenCalledWith(
      assignmentLessonId,
      dto
    );
  });

  it('should call assignmentsLessonRepository.deleteAssignmentById with assignmentLessonId', async () => {
    const assignmentLessonId: string = 'assignment-123';

    await service.deleteAssignment(assignmentLessonId);

    expect(mockAssignmentsLessonRepository.deleteAssignmentById).toHaveBeenCalledWith(
      assignmentLessonId
    );
  });
});
