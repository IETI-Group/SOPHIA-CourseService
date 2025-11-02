import type { Json } from '../../../utils/index.js';

export interface AISpecsLessonOutLightDTO {
  idLessonSpec: string;
  createdAt: Date;
  lessonContentId: string;
  generationPromptSummary: string;
  contentStructure: Json;
  estimatedVideoDuration: number | null;
}
