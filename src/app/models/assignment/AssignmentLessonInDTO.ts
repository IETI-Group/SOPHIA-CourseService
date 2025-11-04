import type { ASSIGNMENT_TYPE } from '../../../utils/index.js';

export interface AssignmentLessonInDTO {
  lessonId: string;
  title: string;
  instructions: string;
  maxFileSizeMb: number;
  allowedTypes: ASSIGNMENT_TYPE;
  dueDate: Date;
  maxScore: number;
}
