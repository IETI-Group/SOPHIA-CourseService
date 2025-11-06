import type { COURSE_LEVEL } from '../../../utils/index.js';
import type { FavoriteCourseInDTO } from './FavoriteCourseInDTO.js';

export interface FavoriteCourseOutDTO extends FavoriteCourseInDTO {
  createdAt: Date;
  courseTitle: string;
  courseAverageReviews: number;
  courseTotalEnrollments: number;
  courseLevel: COURSE_LEVEL;
}
