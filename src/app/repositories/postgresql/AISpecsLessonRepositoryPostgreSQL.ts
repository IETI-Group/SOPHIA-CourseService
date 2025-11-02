import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersAISpecsLesson,
  PaginatedLessonAISpecs,
  SortingAILessonSpecs,
} from '../../../utils/index.js';
import type { AISpecsLessonInDTO, AISpecsLessonOutLightDTO } from '../../models/index.js';
import type { AISpecsLessonRepository } from '../index.js';

export class AISpecsLessonRepositoryPostgreSQL implements AISpecsLessonRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getAISpecs(
    _filters: FiltersAISpecsLesson,
    _sort: SortingAILessonSpecs,
    _lightDTO: boolean
  ): Promise<PaginatedLessonAISpecs> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getAISpecById(_aiSpecId: string, _lightDTO: boolean): Promise<AISpecsLessonOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  createAISpec(_dto: AISpecsLessonInDTO, _lightDTO: boolean): Promise<AISpecsLessonOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateAISpec(
    _aiSpecId: string,
    _dto: AISpecsLessonInDTO,
    _lightDTO: boolean
  ): Promise<AISpecsLessonOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteAISpecById(_aiSpecId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
