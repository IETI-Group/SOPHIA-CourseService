import type { SUBMISSION_STATUS } from '../../../utils/index.js';
import type { SubmissionAssignmentInDTO } from './SubmissionAssignmentInDTO.js';

export interface SubmissionAssignmentUpdateDTO extends SubmissionAssignmentInDTO {
  feedback: string | null;
  active: boolean;
  score: number | null;
  status: SUBMISSION_STATUS;
}
