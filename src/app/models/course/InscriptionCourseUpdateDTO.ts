import type { InscriptionCourseInDTO } from './InscriptionCourseInDTO.js';

export interface InscriptionCourseUpdateDTO extends InscriptionCourseInDTO {
  progressPercentage: number;
  score: number | null;
  active: boolean;
}
