import type { LessonSectionInDTO } from './LessonSectionInDTO.js';

export interface LessonSectionUpdateDTO extends LessonSectionInDTO {
  active: boolean;
}
