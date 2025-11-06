import type { Json } from '../../../utils/index.js';
import type { AISpecsLessonOutLightDTO } from './AISpecsLessonOutLightDTO.js';

export interface AISpecsLessonOutHeavyDTO extends AISpecsLessonOutLightDTO {
  videoScript: string | null;
  videoGenerationInstructions: Json;
  interactiveElements: Json;
  exerciseParameters: Json;
}
