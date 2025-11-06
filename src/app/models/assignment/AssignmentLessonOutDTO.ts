import type { AssignmentLessonUpdateDTO } from './AssignmentLessonUpdateDTO.js';

export interface AssignmentLessonOutDTO extends AssignmentLessonUpdateDTO {
  idAssignment: string;
  createdAt: Date;
}
