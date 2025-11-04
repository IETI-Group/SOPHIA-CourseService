import type { SubmissionAssignmentUpdateDTO } from './SubmissionAssignmentUpdateDTO.js';

export interface SubmissionAssignmentOutDTO extends SubmissionAssignmentUpdateDTO {
  idSubmission: string;
  gradedAt: Date | null;
  submittedAt: Date | null;
}
