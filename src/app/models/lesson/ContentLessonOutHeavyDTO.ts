import type { Json, LESSON_CONTENT_TYPE } from '../../../utils/index.js';
import type { ContentLessonOutLightDTO } from './ContentLessonOutLightDTO.js';

export interface ContentLessonOutHeavyDTO extends ContentLessonOutLightDTO {
  metadata: Json;
  aiGenerated: boolean;
  generationLogId: string | null;
  contentType: LESSON_CONTENT_TYPE;
  parentContentId: string | null;
}
