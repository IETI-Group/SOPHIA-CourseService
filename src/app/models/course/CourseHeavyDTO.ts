import type { Json } from '../../../utils/index.js';
import type { CourseLightDTO } from './CourseLightDTO.js';

export interface CourseHeavyDTO extends CourseLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  generationMetadata: Json;
  lastAIUpdateAt: Date | null;
}
