import type { LessonSectionOutLightDTO } from './LessonSectionOutLightDTO.js';

export interface LessonSectionOutHeavyDTO extends LessonSectionOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  estimatedDifficulty: number;
}
