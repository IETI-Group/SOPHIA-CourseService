import type {
  ApiResponse,
  FiltersAssignmentLesson,
  SortingAssignments,
} from '../../../utils/index.js';
import type { AssignmentLessonInDTO, AssignmentLessonUpdateDTO } from '../../models/index.js';
import type { AssignmentService } from '../index.js';

export class AssignmentServiceImpl implements AssignmentService {
  getAssignmentsLesson(
    _filters: FiltersAssignmentLesson,
    _sort: SortingAssignments
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getAssignmentById(_assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postAssignmentLesson(_dto: AssignmentLessonInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putAssignment(
    _assignmentLessonId: string,
    _dto: Partial<AssignmentLessonUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteAssignment(_assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
