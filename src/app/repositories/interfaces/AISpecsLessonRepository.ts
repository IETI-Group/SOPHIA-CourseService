import type {
  FiltersAISpecsLesson,
  PaginatedLessonAISpecs,
  SortingAILessonSpecs,
} from '../../../utils/index.js';
import type { AISpecsLessonInDTO, AISpecsLessonOutLightDTO } from '../../models/index.js';

export interface AISpecsLessonRepository {
  getAISpecs(
    filters: FiltersAISpecsLesson,
    sort: SortingAILessonSpecs,
    lightDTO: boolean
  ): PaginatedLessonAISpecs;
  getAISpecById(aiSpecId: string, lightDTO: boolean): AISpecsLessonOutLightDTO;
  createAISpec(dto: AISpecsLessonInDTO, lightDTO: boolean): AISpecsLessonOutLightDTO;
  updateAISpec(
    aiSpecId: string,
    dto: AISpecsLessonInDTO,
    lightDTO: boolean
  ): AISpecsLessonOutLightDTO;
  deleteAISpecById(aiSpecId: string): void;
}
