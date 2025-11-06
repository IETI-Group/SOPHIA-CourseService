import type { COURSE_LEVEL, COURSE_STATUS } from '../../../utils/index.js';

export interface CourseLightDTO {
  idCourse: string;
  instructorId: string | null;
  title: string;
  price: number;
  level: COURSE_LEVEL;
  active: boolean;
  averageReviews: number;
  durationHours: number;
  totalLessons: number;
  status: COURSE_STATUS;
  updatedAt: Date | null;
  createdAt: Date;
  totalReviews: number;
  totalEnrollments: number;
  publishedAt: Date | null;
}
