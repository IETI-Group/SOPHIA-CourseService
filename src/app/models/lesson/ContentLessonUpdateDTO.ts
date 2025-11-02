import type { ContentLessonInDTO } from './ContentLessonInDTO.js';

export interface ContentLessonUpdateDTO extends ContentLessonInDTO {
  active: boolean;
  isCurrentVersion: boolean;
}
