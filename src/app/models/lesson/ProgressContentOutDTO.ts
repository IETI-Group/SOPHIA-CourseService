import type { ProgressContentUpdateDTO } from './ProgressContentUpdateDTO.js';

export interface ProgressContentOutDTO extends ProgressContentUpdateDTO {
  idContentProgress: string;
  startedAt: Date | null;
  completedAt: Date | null;
}
