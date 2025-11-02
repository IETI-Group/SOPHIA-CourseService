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

export interface LessonContentsRepository {
  getLessonContents(
    filters: FiltersLessonContent,
    sort: SortingLessonContent,
    lightDTO: boolean
  ): PaginatedLessonContents;
  getLessonContentById(lessonContentId: string, lightDTO: boolean): ContentLessonOutLightDTO;
  createLessonContent(dto: ContentLessonInDTO, lightDTO: boolean): ContentLessonOutLightDTO;
  updateLessonContent(
    lessonContentId: string,
    dto: ContentLessonUpdateDTO,
    lightDTO: boolean
  ): ContentLessonOutLightDTO;
  deleteLessonContentById(lessonContentId: string): void;
}
