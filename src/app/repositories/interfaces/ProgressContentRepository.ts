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
  ): PaginatedContentProgress;
  getProgressById(progressId: string): ProgressContentOutDTO;
  createProgress(dto: ProgressContentInDTO): ProgressContentOutDTO;
  updateProgress(progressId: string, dto: ProgressContentUpdateDTO): ProgressContentOutDTO;
  deleteProgressById(progressId: string): void;
}
