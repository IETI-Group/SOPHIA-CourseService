import type { ProgressContentInDTO } from './ProgressContentInDTO.js';

export interface ProgressContentUpdateDTO extends ProgressContentInDTO {
  timeSpendMinutes: number;
  completionPercentage: number;
  effectivinessScore: number;
  active: boolean;
  userRating: number | null;
}
