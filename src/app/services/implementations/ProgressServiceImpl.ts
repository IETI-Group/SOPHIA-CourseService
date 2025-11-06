import {
  type ApiResponse,
  type FiltersProgressContent,
  parseApiResponse,
  type SortingContentProgress,
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
    filters: FiltersProgressContent,
    sort: SortingContentProgress
  ): Promise<ApiResponse<unknown>> {
    return this.progressContentRepository.getProgress(filters, sort);
  }
  async getProgressById(progressId: string): Promise<ApiResponse<unknown>> {
    const result = await this.progressContentRepository.getProgressById(progressId);
    return parseApiResponse(result, 'Progress retrieved successfully');
  }
  async postProgressContent(dto: ProgressContentInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.progressContentRepository.createProgress(dto);
    return parseApiResponse(result, 'Progress created successfully');
  }
  async putProgress(
    progressId: string,
    dto: Partial<ProgressContentUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.progressContentRepository.updateProgress(progressId, dto);
    return parseApiResponse(result, 'Progress updated successfully');
  }
  async deleteProgress(progressId: string): Promise<ApiResponse<unknown>> {
    await this.progressContentRepository.deleteProgressById(progressId);
    return parseApiResponse(null, 'Progress deleted successfully');
  }
}
