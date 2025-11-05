import type { AISpecsLessonInDTO, AISpecsService } from '../app/index.js';
import type { ApiResponse, FiltersAISpecsLesson, SortingAILessonSpecs } from '../utils/index.js';

export class AISpecsController {
  private readonly aISpecsService: AISpecsService;

  constructor(aISpecsService: AISpecsService) {
    this.aISpecsService = aISpecsService;
  }
  getAISpecs(
    filters: FiltersAISpecsLesson,
    sort: SortingAILessonSpecs,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.aISpecsService.getAISpecs(filters, sort, lightDTO);
  }
  getAISpecById(aiSpecId: string, lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    return this.aISpecsService.getAISpecById(aiSpecId, lightDTO);
  }
  postAISpec(dto: AISpecsLessonInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    return this.aISpecsService.postAISpec(dto, lightDTO);
  }
  putAISpec(
    aiSpecId: string,
    dto: Partial<AISpecsLessonInDTO>,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.aISpecsService.putAISpec(aiSpecId, dto, lightDTO);
  }
  deleteAISpec(aiSpecId: string): Promise<ApiResponse<unknown>> {
    return this.aISpecsService.deleteAISpec(aiSpecId);
  }
}
