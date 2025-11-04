import type {
  DIFFICULTY_LEVEL,
  Json,
  LEARNING_TECHNIQUE,
  LESSON_CONTENT_TYPE,
} from '../../../utils/index.js';

export interface ContentLessonInDTO {
  lessonId: string;
  metadata: Json;
  difficultyLevel: DIFFICULTY_LEVEL;
  learningTechnique: LEARNING_TECHNIQUE;
  orderPreference: number | null;
  aiGenerated: boolean;
  generationLogId: string | null;
  contentType: LESSON_CONTENT_TYPE;
  parentContentId: string | null;
}
