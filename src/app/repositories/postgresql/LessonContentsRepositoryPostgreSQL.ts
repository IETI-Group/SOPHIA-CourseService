import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersLessonContent,
  PaginatedLessonContents,
  SortingLessonContent,
} from '../../../utils/index.js';
import type {
  ContentLessonInDTO,
  ContentLessonOutLightDTO,
  ContentLessonUpdateDTO,
} from '../../models/index.js';
import type { LessonContentsRepository } from '../index.js';

export class LessonContentsRepositoryPostgreSQL implements LessonContentsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getLessonContents(
    _filters: FiltersLessonContent,
    _sort: SortingLessonContent,
    _lightDTO: boolean
  ): Promise<PaginatedLessonContents> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getLessonContentById(
    _lessonContentId: string,
    _lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  createLessonContent(
    _dto: ContentLessonInDTO,
    _lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateLessonContent(
    _lessonContentId: string,
    _dto: ContentLessonUpdateDTO,
    _lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteLessonContentById(_lessonContentId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
