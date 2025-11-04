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
  ): Promise<PaginatedLessonContents>;
  getLessonContentById(
    lessonContentId: string,
    lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO>;
  createLessonContent(
    dto: ContentLessonInDTO,
    lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO>;
  updateLessonContent(
    lessonContentId: string,
    dto: ContentLessonUpdateDTO,
    lightDTO: boolean
  ): Promise<ContentLessonOutLightDTO>;
  deleteLessonContentById(lessonContentId: string): Promise<void>;
}
