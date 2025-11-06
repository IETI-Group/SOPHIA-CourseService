import type {
  ApiResponse,
  FiltersProgressContent,
  SortingContentProgress,
} from '../../../utils/index.js';
import type { ProgressContentInDTO, ProgressContentUpdateDTO } from '../../models/index.js';

export interface ProgressService {
  getProgressContent(
    filters: FiltersProgressContent,
    sort: SortingContentProgress
  ): Promise<ApiResponse<unknown>>;
  getProgressById(progressId: string): Promise<ApiResponse<unknown>>;
  postProgressContent(dto: ProgressContentInDTO): Promise<ApiResponse<unknown>>;
  putProgress(
    progressId: string,
    dto: Partial<ProgressContentUpdateDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteProgress(progressId: string): Promise<ApiResponse<unknown>>;
}
