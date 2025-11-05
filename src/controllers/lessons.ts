import type {
  ContentLessonInDTO,
  ContentLessonUpdateDTO,
  LessonSectionInDTO,
  LessonSectionUpdateDTO,
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
} from '../app/index.js';
import type {
  ApiResponse,
  FiltersLesson,
  FiltersLessonContent,
  FiltersProgressContent,
  SortingContentProgress,
  SortingLessonContent,
  SortingLessons,
} from '../utils/index.js';

export class LessonsController {
  getSectionLessons(
    _filters: FiltersLesson,
    _sort: SortingLessons,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getLessonById(_lessonId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postSectionLesson(_dto: LessonSectionInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putLesson(
    _lessonId: string,
    _dto: Partial<LessonSectionUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteLesson(_lessonId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getLessonContents(
    _filters: FiltersLessonContent,
    _sort: SortingLessonContent,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getLessonContentsById(
    _lessonContentId: string,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postLessonContents(_dto: ContentLessonInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putLessonContents(
    _lessonContentId: string,
    _dto: ContentLessonUpdateDTO,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteLessonContents(_lessonContentId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getProgressContent(
    _filters: FiltersProgressContent,
    _sort: SortingContentProgress
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getProgressById(_progressId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postProgressContent(_dto: ProgressContentInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putProgress(_progressId: string, _dto: ProgressContentUpdateDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteProgress(_progressId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
