import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersAssignmentLesson,
  PaginatedAssignments,
  SortingAssignments,
} from '../../../utils/index.js';
import type {
  AssignmentLessonInDTO,
  AssignmentLessonOutDTO,
  AssignmentLessonUpdateDTO,
} from '../../models/index.js';
import type { AssignmentsLessonRepository } from '../index.js';

export class AssignmentsLessonRepositoryPostgreSQL implements AssignmentsLessonRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getAssignments(
    _filters: FiltersAssignmentLesson,
    _sort: SortingAssignments
  ): Promise<PaginatedAssignments> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getAssignmentById(_assignmentLessonId: string): Promise<AssignmentLessonOutDTO> {
    throw new Error('Method not implemented.');
  }
  createAssignment(_dto: AssignmentLessonInDTO): Promise<AssignmentLessonOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateAssignment(
    _assignmentLessonId: string,
    _dto: AssignmentLessonUpdateDTO
  ): Promise<AssignmentLessonOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteAssignmentById(_assignmentLessonId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
