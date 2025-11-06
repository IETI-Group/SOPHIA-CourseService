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
  getAssignments(
    filters: FiltersAssignmentLesson,
    sort: SortingAssignments
  ): Promise<PaginatedAssignments>;
  getAssignmentById(assignmentLessonId: string): Promise<AssignmentLessonOutDTO>;
  createAssignment(dto: AssignmentLessonInDTO): Promise<AssignmentLessonOutDTO>;
  updateAssignment(
    assignmentLessonId: string,
    dto: Partial<AssignmentLessonUpdateDTO>
  ): Promise<AssignmentLessonOutDTO>;
  deleteAssignmentById(assignmentLessonId: string): Promise<void>;
}
