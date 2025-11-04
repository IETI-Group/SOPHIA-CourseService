import type { QuizSectionInDTO } from './QuizSectionInDTO.js';

export interface QuizSectionUpdateDTO extends QuizSectionInDTO {
  active: boolean;
  durationMinutes: number;
}
