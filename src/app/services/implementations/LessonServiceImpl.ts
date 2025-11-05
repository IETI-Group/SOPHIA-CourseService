import type { ApiResponse, FiltersLessonContent, SortingLessons } from '../../../utils/index.js';
import type { LessonSectionInDTO, LessonSectionUpdateDTO } from '../../models/index.js';
import type { LessonService } from '../index.js';

export class LessonServiceImpl implements LessonService {
  getSectionLessons(
    _filters: FiltersLessonContent,
    _sort: SortingLessons,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
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
