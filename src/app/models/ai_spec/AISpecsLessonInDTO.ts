import type { Json } from '../../../utils/index.js';

export interface AISpecsLessonInDTO {
  lessonContentId: string;
  generationPromptSummary: string;
  contentStructure: Json;
  estimatedVideoDuration: number | null;
  videoScript: string | null;
  videoGenerationInstructions: Json;
  interactiveElements: Json;
  exerciseParameters: Json;
}
