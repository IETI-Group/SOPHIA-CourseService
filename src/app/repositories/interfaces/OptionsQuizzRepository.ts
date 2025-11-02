import type {
  FiltersOptionQuiz,
  PaginatedQuizOptions,
  SortingQuizOptions,
} from '../../../utils/index.js';
import type { OptionQuizInDTO, OptionQuizOutDTO } from '../../models/index.js';

export interface OptionsQuizzRepository {
  getOptions(filters: FiltersOptionQuiz, sort: SortingQuizOptions): Promise<PaginatedQuizOptions>;
  getOptionById(optionId: string): Promise<OptionQuizOutDTO>;
  createOption(dto: OptionQuizInDTO): Promise<OptionQuizOutDTO>;
  updateOption(optionId: string, dto: OptionQuizInDTO): Promise<OptionQuizOutDTO>;
  deleteOptionById(optionId: string): Promise<void>;
}
