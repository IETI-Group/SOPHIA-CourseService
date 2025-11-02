import type {
  FiltersOptionQuiz,
  PaginatedQuizOptions,
  SortingQuizOptions,
} from '../../../utils/index.js';
import type { OptionQuizInDTO, OptionQuizOutDTO } from '../../models/index.js';

export interface OptionsQuizzRepository {
  getOptions(filters: FiltersOptionQuiz, sort: SortingQuizOptions): PaginatedQuizOptions;
  getOptionById(optionId: string): OptionQuizOutDTO;
  createOption(dto: OptionQuizInDTO): OptionQuizOutDTO;
  updateOption(optionId: string, dto: OptionQuizInDTO): OptionQuizOutDTO;
  deleteOptionById(optionId: string): void;
}
