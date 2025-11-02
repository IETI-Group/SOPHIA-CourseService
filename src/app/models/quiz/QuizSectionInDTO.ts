import type { Json } from '../../../utils/index.js';

export interface QuizSectionInDTO {
  sectionId: string;
  description: string;
  title: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  difficultyDistribution: Json;
  adaptativeLogic: Json;
}
