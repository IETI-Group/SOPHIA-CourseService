import type {
  ApiResponse,
  FiltersAssignmentLesson,
  SortingAssignments,
} from '../../../utils/index.js';
import type { AssignmentLessonInDTO, AssignmentLessonUpdateDTO } from '../../models/index.js';

export interface AssignmentService {
  getAssignmentsLesson(
    filters: FiltersAssignmentLesson,
    sort: SortingAssignments
  ): Promise<ApiResponse<unknown>>;
  getAssignmentById(assignmentLessonId: string): Promise<ApiResponse<unknown>>;
  postAssignmentLesson(dto: AssignmentLessonInDTO): Promise<ApiResponse<unknown>>;
  putAssignment(
    assignmentLessonId: string,
    dto: Partial<AssignmentLessonUpdateDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteAssignment(assignmentLessonId: string): Promise<ApiResponse<unknown>>;
}
