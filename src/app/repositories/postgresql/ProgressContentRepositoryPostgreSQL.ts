import type { PrismaClient } from '@prisma/client/default.js';
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
import type { ProgressContentRepository } from '../index.js';

export class ProgressContentRepositoryPostgreSQL implements ProgressContentRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getProgress(
    _filters: FiltersProgressContent,
    _sort: SortingContentProgress
  ): Promise<PaginatedContentProgress> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getProgressById(_progressId: string): Promise<ProgressContentOutDTO> {
    throw new Error('Method not implemented.');
  }
  createProgress(_dto: ProgressContentInDTO): Promise<ProgressContentOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateProgress(
    _progressId: string,
    _dto: ProgressContentUpdateDTO
  ): Promise<ProgressContentOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteProgressById(_progressId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
