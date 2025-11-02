import type { FiltersLesson, PaginatedLessons, SortingLessons } from '../../../utils/index.js';
import type {
  LessonSectionInDTO,
  LessonSectionOutLightDTO,
  LessonSectionUpdateDTO,
} from '../../models/index.js';

export interface LessonsRepository {
  getLessons(filters: FiltersLesson, sort: SortingLessons, lightDTO: boolean): PaginatedLessons;
  getLessonById(lessonId: string, lightDTO: boolean): LessonSectionOutLightDTO;
  createLesson(dto: LessonSectionInDTO, lightDTO: boolean): LessonSectionOutLightDTO;
  updateLesson(
    lessonId: string,
    dto: LessonSectionUpdateDTO,
    lightDTO: boolean
  ): LessonSectionOutLightDTO;
  deleteLessonById(lessonId: string): void;
}
