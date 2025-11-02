import type { TagCourseInDTO } from './TagCourseInDTO.js';

export interface TagCourseOutDTO extends TagCourseInDTO {
  createdAt: Date;
  name: string;
}
