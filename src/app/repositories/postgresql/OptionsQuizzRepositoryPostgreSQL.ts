import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersOptionQuiz,
  PaginatedQuizOptions,
  SortingQuizOptions,
} from '../../../utils/index.js';
import type { OptionQuizInDTO, OptionQuizOutDTO } from '../../models/index.js';
import type { OptionsQuizzRepository } from '../index.js';

export class OptionsQuizzRepositoryPostgreSQL implements OptionsQuizzRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getOptions(
    _filters: FiltersOptionQuiz,
    _sort: SortingQuizOptions
  ): Promise<PaginatedQuizOptions> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getOptionById(_optionId: string): Promise<OptionQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  createOption(_dto: OptionQuizInDTO): Promise<OptionQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateOption(_optionId: string, _dto: OptionQuizInDTO): Promise<OptionQuizOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteOptionById(_optionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
