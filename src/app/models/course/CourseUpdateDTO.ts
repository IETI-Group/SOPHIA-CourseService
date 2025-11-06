import type { COURSE_STATUS } from '../../../utils/index.js';
import type { CourseInDTO } from './CourseInDTO.js';

export interface CourseUpdateDTO extends CourseInDTO {
  active: boolean;
  status: COURSE_STATUS;
}
