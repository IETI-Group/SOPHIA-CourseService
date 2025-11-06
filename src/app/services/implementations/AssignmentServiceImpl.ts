import {
  type ApiResponse,
  type FiltersAssignmentLesson,
  parseApiResponse,
  type SortingAssignments,
} from '../../../utils/index.js';
import type { AssignmentLessonInDTO, AssignmentLessonUpdateDTO } from '../../models/index.js';
import type { AssignmentsLessonRepository } from '../../repositories/index.js';
import type { AssignmentService } from '../index.js';

export class AssignmentServiceImpl implements AssignmentService {
  private readonly assignmentsLessonRepository: AssignmentsLessonRepository;
  constructor(assignmentsLessonRepository: AssignmentsLessonRepository) {
    this.assignmentsLessonRepository = assignmentsLessonRepository;
  }
  getAssignmentsLesson(
    filters: FiltersAssignmentLesson,
    sort: SortingAssignments
  ): Promise<ApiResponse<unknown>> {
    return this.assignmentsLessonRepository.getAssignments(filters, sort);
  }
  async getAssignmentById(assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    const result = await this.assignmentsLessonRepository.getAssignmentById(assignmentLessonId);
    return parseApiResponse(result, 'Assignment retrieved successfully');
  }
  async postAssignmentLesson(dto: AssignmentLessonInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.assignmentsLessonRepository.createAssignment(dto);
    return parseApiResponse(result, 'Assignment created successfully');
  }
  async putAssignment(
    assignmentLessonId: string,
    dto: Partial<AssignmentLessonUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.assignmentsLessonRepository.updateAssignment(assignmentLessonId, dto);
    return parseApiResponse(result, 'Assignment updated successfully');
  }
  async deleteAssignment(assignmentLessonId: string): Promise<ApiResponse<unknown>> {
    await this.assignmentsLessonRepository.deleteAssignmentById(assignmentLessonId);
    return parseApiResponse(null, 'Assignment deleted successfully');
  }
}
