import type { AttemptQuizUpdateDTO } from './AttemptQuizUpdateDTO.js';

export interface AttemptQuizOutDTO extends AttemptQuizUpdateDTO {
  idQuizAttempt: string;
  submittedAt: Date;
  durationMinutes: number;
}
