import type { CategoryCourseInDTO } from './CategoryCourseInDTO.js';

export interface CategoryCourseUpdateDTO extends CategoryCourseInDTO {
  active: boolean;
}
