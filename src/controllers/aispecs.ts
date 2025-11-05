import type { AISpecsLessonInDTO, AISpecsService } from '../app/index.js';
import type { ApiResponse, FiltersAISpecsLesson, SortingAILessonSpecs } from '../utils/index.js';

export class AISpecsController {
  private readonly aISpecsService: AISpecsService;

  constructor(aISpecsService: AISpecsService) {
    this.aISpecsService = aISpecsService;
  }
  getAISpecs(
    _filters: FiltersAISpecsLesson,
    _sort: SortingAILessonSpecs,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.aISpecsService;
    throw new Error('Method not implemented');
  }
  getAISpecById(_aiSpecId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postAISpec(_dto: AISpecsLessonInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putAISpec(
    _aiSpecId: string,
    _dto: Partial<AISpecsLessonInDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteAISpec(_aiSpecId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
