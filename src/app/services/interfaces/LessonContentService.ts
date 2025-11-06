import type {
  ApiResponse,
  FiltersLessonContent,
  SortingLessonContent,
} from '../../../utils/index.js';
import type { ContentLessonInDTO, ContentLessonUpdateDTO } from '../../models/index.js';

export interface LessonContentService {
  getLessonContents(
    filters: FiltersLessonContent,
    sort: SortingLessonContent,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  getLessonContentsById(lessonContentId: string, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  postLessonContents(dto: ContentLessonInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  putLessonContents(
    lessonContentId: string,
    dto: Partial<ContentLessonUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteLessonContents(lessonContentId: string): Promise<ApiResponse<unknown>>;
}
