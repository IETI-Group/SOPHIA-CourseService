import type { AssignmentLessonInDTO } from './AssignmentLessonInDTO.js';

export interface AssignmentLessonUpdateDTO extends AssignmentLessonInDTO {
  active: boolean;
}
