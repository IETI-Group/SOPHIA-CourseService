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

export interface AssignmentsLessonRepository {
  getAssignments(filters: FiltersAssignmentLesson, sort: SortingAssignments): PaginatedAssignments;
  getAssignmentById(assignmentLessonId: string): AssignmentLessonOutDTO;
  createAssignment(dto: AssignmentLessonInDTO): AssignmentLessonOutDTO;
  updateAssignment(
    assignmentLessonId: string,
    dto: AssignmentLessonUpdateDTO
  ): AssignmentLessonOutDTO;
  deleteAssignmentById(assignmentLessonId: string): void;
}
