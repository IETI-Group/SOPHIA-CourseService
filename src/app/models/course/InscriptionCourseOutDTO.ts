import type { InscriptionCourseUpdateDTO } from './InscriptionCourseUpdateDTO.js';

export interface InscriptionCourseOutDTO extends InscriptionCourseUpdateDTO {
  idInscription: string;
  createdAt: Date;
  completed: boolean;
}
