import type {
  ApiResponse,
  FiltersLessonContent,
  SortingLessonContent,
} from '../../../utils/index.js';
import type { ContentLessonInDTO, ContentLessonUpdateDTO } from '../../models/index.js';
import type { LessonContentsRepository } from '../../repositories/index.js';
import type { LessonContentService } from '../index.js';

export class LessonContentServiceImpl implements LessonContentService {
  private readonly lessonContentsRepository: LessonContentsRepository;
  constructor(lessonContentsRepository: LessonContentsRepository) {
    this.lessonContentsRepository = lessonContentsRepository;
  }
  getLessonContents(
    _filters: FiltersLessonContent,
    _sort: SortingLessonContent,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.lessonContentsRepository;
    throw new Error('Method not implemented.');
  }
  getLessonContentsById(
    _lessonContentId: string,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postLessonContents(_dto: ContentLessonInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putLessonContents(
    _lessonContentId: string,
    _dto: Partial<ContentLessonUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteLessonContents(_lessonContentId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
