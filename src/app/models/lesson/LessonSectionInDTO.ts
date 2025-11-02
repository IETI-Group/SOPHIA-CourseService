import type { LESSON_TYPE } from '../../../utils/index.js';

export interface LessonSectionInDTO {
  sectionId: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
  aiGenerated: boolean;
  generationTaskId: string | null;
  lessonType: LESSON_TYPE;
  estimatedDifficulty: number;
}
