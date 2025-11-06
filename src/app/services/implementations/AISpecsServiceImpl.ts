import type {
  ApiResponse,
  FiltersAISpecsLesson,
  SortingAILessonSpecs,
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
    _filters: FiltersAISpecsLesson,
    _sort: SortingAILessonSpecs,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.aiSpecsLessonRepository;
    throw new Error('Method not implemented.');
  }
  getAISpecById(_aiSpecId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postAISpec(_dto: AISpecsLessonInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putAISpec(
    _aiSpecId: string,
    _dto: Partial<AISpecsLessonInDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteAISpec(_aiSpecId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
