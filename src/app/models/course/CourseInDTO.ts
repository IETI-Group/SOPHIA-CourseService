import type { COURSE_LEVEL, Json } from '../../../utils/index.js';

export interface CourseInDTO {
  instructorId: string | null;
  title: string;
  description: string;
  price: number;
  level: COURSE_LEVEL;
  aiGenerated: boolean;
  generationTaskId: string | null;
  generationMetadata: Json;
  lastAIUpdateAt: Date | null;
}
