import type { DIFFICULTY_LEVEL, LEARNING_TECHNIQUE } from '../../../utils/index.js';

export interface ContentLessonOutLightDTO {
  idLessonContent: string;
  version: number;
  lessonId: string;
  active: boolean;
  isCurrentVersion: boolean;
  difficultyLevel: DIFFICULTY_LEVEL;
  learningTechnique: LEARNING_TECHNIQUE;
  orderPreference: number | null;
  createdAt: Date;
}
