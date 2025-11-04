import type {
  FiltersProgressContent,
  PaginatedContentProgress,
  SortingContentProgress,
} from '../../../utils/index.js';
import type {
  ProgressContentInDTO,
  ProgressContentOutDTO,
  ProgressContentUpdateDTO,
} from '../../models/index.js';

export interface ProgressContentRepository {
  getProgress(
    filters: FiltersProgressContent,
    sort: SortingContentProgress
  ): Promise<PaginatedContentProgress>;
  getProgressById(progressId: string): Promise<ProgressContentOutDTO>;
  createProgress(dto: ProgressContentInDTO): Promise<ProgressContentOutDTO>;
  updateProgress(progressId: string, dto: ProgressContentUpdateDTO): Promise<ProgressContentOutDTO>;
  deleteProgressById(progressId: string): Promise<void>;
}
