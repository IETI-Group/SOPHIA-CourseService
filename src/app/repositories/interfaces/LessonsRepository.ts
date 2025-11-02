import type { FiltersLesson, PaginatedLessons, SortingLessons } from '../../../utils/index.js';
import type {
  LessonSectionInDTO,
  LessonSectionOutLightDTO,
  LessonSectionUpdateDTO,
} from '../../models/index.js';

export interface LessonsRepository {
  getLessons(
    filters: FiltersLesson,
    sort: SortingLessons,
    lightDTO: boolean
  ): Promise<PaginatedLessons>;
  getLessonById(lessonId: string, lightDTO: boolean): Promise<LessonSectionOutLightDTO>;
  createLesson(dto: LessonSectionInDTO, lightDTO: boolean): Promise<LessonSectionOutLightDTO>;
  updateLesson(
    lessonId: string,
    dto: LessonSectionUpdateDTO,
    lightDTO: boolean
  ): Promise<LessonSectionOutLightDTO>;
  deleteLessonById(lessonId: string): Promise<void>;
}
