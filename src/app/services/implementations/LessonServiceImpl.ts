import type { ApiResponse, FiltersLesson, SortingLessons } from '../../../utils/index.js';
import type { LessonSectionInDTO, LessonSectionUpdateDTO } from '../../models/index.js';
import type { LessonsRepository } from '../../repositories/index.js';
import type { LessonService } from '../index.js';

export class LessonServiceImpl implements LessonService {
  private readonly lessonsRepository: LessonsRepository;
  constructor(lessonsRepository: LessonsRepository) {
    this.lessonsRepository = lessonsRepository;
  }
  getSectionLessons(
    _filters: FiltersLesson,
    _sort: SortingLessons,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.lessonsRepository;
    throw new Error('Method not implemented.');
  }
  getLessonById(_lessonId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postSectionLesson(_dto: LessonSectionInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putLesson(
    _lessonId: string,
    _dto: Partial<LessonSectionUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteLesson(_lessonId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
