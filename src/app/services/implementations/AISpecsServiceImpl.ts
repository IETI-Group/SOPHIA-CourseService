import {
  type ApiResponse,
  type FiltersAISpecsLesson,
  parseApiResponse,
  type SortingAILessonSpecs,
} from '../../../utils/index.js';
import type { AISpecsLessonInDTO } from '../../models/index.js';
import type { AISpecsLessonRepository } from '../../repositories/index.js';
import type { AISpecsService } from '../index.js';

export class AISpecsServiceImpl implements AISpecsService {
  private readonly aiSpecsLessonRepository: AISpecsLessonRepository;
  constructor(aiSpecsLessonRepository: AISpecsLessonRepository) {
    this.aiSpecsLessonRepository = aiSpecsLessonRepository;
  }
  getAISpecs(
    filters: FiltersAISpecsLesson,
    sort: SortingAILessonSpecs,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.aiSpecsLessonRepository.getAISpecs(filters, sort, lightDTO);
  }
  async getAISpecById(aiSpecId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.aiSpecsLessonRepository.getAISpecById(aiSpecId, lightDTO);
    return parseApiResponse(result, 'AI Spec retrieved successfully');
  }
  async postAISpec(dto: AISpecsLessonInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.aiSpecsLessonRepository.createAISpec(dto, lightDTO);
    return parseApiResponse(result, 'AI Spec created successfully');
  }
  async putAISpec(
    aiSpecId: string,
    dto: Partial<AISpecsLessonInDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.aiSpecsLessonRepository.updateAISpec(aiSpecId, dto, lightDTO);
    return parseApiResponse(result, 'AI Spec updated successfully');
  }
  async deleteAISpec(aiSpecId: string): Promise<ApiResponse<unknown>> {
    await this.aiSpecsLessonRepository.deleteAISpecById(aiSpecId);
    return parseApiResponse(null, 'AI Spec deleted successfully');
  }
}
