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
  ): Promise<PaginatedLessonAISpecs>;
  getAISpecById(aiSpecId: string, lightDTO: boolean): Promise<AISpecsLessonOutLightDTO>;
  createAISpec(dto: AISpecsLessonInDTO, lightDTO: boolean): Promise<AISpecsLessonOutLightDTO>;
  updateAISpec(
    aiSpecId: string,
    dto: Partial<AISpecsLessonInDTO>,
    lightDTO: boolean
  ): Promise<AISpecsLessonOutLightDTO>;
  deleteAISpecById(aiSpecId: string): Promise<void>;
}
