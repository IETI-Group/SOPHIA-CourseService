import type { SectionCourseInDTO } from './SectionCourseInDTO.js';

export interface SectionCourseUpdateDTO extends SectionCourseInDTO {
  active: boolean;
}
