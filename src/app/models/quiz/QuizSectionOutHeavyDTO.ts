import type { Json } from '../../../utils/index.js';
import type { QuizSectionOutLightDTO } from './QuizSectionOutLightDTO.js';

export interface QuizSectionOutHeavyDTO extends QuizSectionOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  difficultyDistribution: Json;
  adaptativeLogic: Json;
}
