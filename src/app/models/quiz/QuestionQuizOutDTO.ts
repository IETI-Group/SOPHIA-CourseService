import type { QuestionQuizInDTO } from './QuestionQuizInDTO.js';

export interface QuestionQuizOutDTO extends QuestionQuizInDTO {
  idQuizQuestion: string;
}
