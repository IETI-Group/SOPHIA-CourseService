import type { ApiResponse, FiltersLesson, SortingLessons } from '../../../utils/index.js';
import type { LessonSectionInDTO, LessonSectionUpdateDTO } from '../../models/index.js';

export interface LessonService {
  getSectionLessons(
    filters: FiltersLesson,
    sort: SortingLessons,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  getLessonById(lessonId: string, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  postSectionLesson(dto: LessonSectionInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  putLesson(
    lessonId: string,
    dto: Partial<LessonSectionUpdateDTO>,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteLesson(lessonId: string): Promise<ApiResponse<unknown>>;
}
