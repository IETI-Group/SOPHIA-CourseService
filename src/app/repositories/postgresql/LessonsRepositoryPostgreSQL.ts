import type { PrismaClient } from '@prisma/client/default.js';
import type { FiltersLesson, PaginatedLessons, SortingLessons } from '../../../utils/index.js';
import type {
  LessonSectionInDTO,
  LessonSectionOutLightDTO,
  LessonSectionUpdateDTO,
} from '../../models/index.js';
import type { LessonsRepository } from '../index.js';

export class LessonsRepositoryPostgreSQL implements LessonsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getLessons(
    _filters: FiltersLesson,
    _sort: SortingLessons,
    _lightDTO: boolean
  ): Promise<PaginatedLessons> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getLessonById(_lessonId: string, _lightDTO: boolean): Promise<LessonSectionOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  createLesson(_dto: LessonSectionInDTO, _lightDTO: boolean): Promise<LessonSectionOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateLesson(
    _lessonId: string,
    _dto: LessonSectionUpdateDTO,
    _lightDTO: boolean
  ): Promise<LessonSectionOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteLessonById(_lessonId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
