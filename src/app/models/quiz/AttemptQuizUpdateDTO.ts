import type { AttemptQuizInDTO } from './AttemptQuizInDTO.js';

export interface AttemptQuizUpdateDTO extends AttemptQuizInDTO {
  grade: number | null;
}
