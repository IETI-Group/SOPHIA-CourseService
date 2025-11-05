import type {
  ApiResponse,
  FiltersAISpecsLesson,
  SortingAILessonSpecs,
} from '../../../utils/index.js';
import type { AISpecsLessonInDTO } from '../../models/index.js';

export interface AISpecsService {
  getAISpecs(
    filters: FiltersAISpecsLesson,
    sort: SortingAILessonSpecs,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  getAISpecById(aiSpecId: string, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  postAISpec(dto: AISpecsLessonInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  putAISpec(
    aiSpecId: string,
    dto: Partial<AISpecsLessonInDTO>,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteAISpec(aiSpecId: string): Promise<ApiResponse<unknown>>;
}
