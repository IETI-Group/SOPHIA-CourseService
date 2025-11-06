import type {
  ApiResponse,
  FiltersProgressContent,
  SortingContentProgress,
} from '../../../utils/index.js';
import type { ProgressContentInDTO, ProgressContentUpdateDTO } from '../../models/index.js';
import type { ProgressContentRepository } from '../../repositories/index.js';
import type { ProgressService } from '../index.js';

export class ProgressServiceImpl implements ProgressService {
  private readonly progressContentRepository: ProgressContentRepository;
  constructor(progressContentRepository: ProgressContentRepository) {
    this.progressContentRepository = progressContentRepository;
  }
  getProgressContent(
    _filters: FiltersProgressContent,
    _sort: SortingContentProgress
  ): Promise<ApiResponse<unknown>> {
    this.progressContentRepository;
    throw new Error('Method not implemented.');
  }
  getProgressById(_progressId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postProgressContent(_dto: ProgressContentInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putProgress(
    _progressId: string,
    _dto: Partial<ProgressContentUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteProgress(_progressId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
