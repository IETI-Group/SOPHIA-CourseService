import type { LESSON_TYPE } from '../../../utils/index.js';

export interface LessonSectionOutLightDTO {
  idLesson: string;
  active: boolean;
  createdAt: Date;
  sectionId: string;
  title: string;
  order: number;
  durationMinutes: number;
  lessonType: LESSON_TYPE;
}
