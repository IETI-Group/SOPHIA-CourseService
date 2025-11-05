import type {
  ContentLessonInDTO,
  ContentLessonUpdateDTO,
  LessonContentService,
  LessonSectionInDTO,
  LessonSectionUpdateDTO,
  LessonService,
  ProgressContentInDTO,
  ProgressContentUpdateDTO,
  ProgressService,
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
  private readonly lessonContentService: LessonContentService;
  private readonly lessonService: LessonService;
  private readonly progressService: ProgressService;

  constructor(
    lessonContentService: LessonContentService,
    lessonService: LessonService,
    progressService: ProgressService
  ) {
    this.lessonContentService = lessonContentService;
    this.lessonService = lessonService;
    this.progressService = progressService;
  }

  getSectionLessons(
    filters: FiltersLesson,
    sort: SortingLessons,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonService.getSectionLessons(filters, sort, lightDTO);
  }
  getLessonById(lessonId: string, lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    return this.lessonService.getLessonById(lessonId, lightDTO);
  }
  postSectionLesson(dto: LessonSectionInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    return this.lessonService.postSectionLesson(dto, lightDTO);
  }
  putLesson(
    lessonId: string,
    dto: Partial<LessonSectionUpdateDTO>,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonService.putLesson(lessonId, dto, lightDTO);
  }
  deleteLesson(lessonId: string): Promise<ApiResponse<unknown>> {
    return this.lessonService.deleteLesson(lessonId);
  }
  getLessonContents(
    filters: FiltersLessonContent,
    sort: SortingLessonContent,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonContentService.getLessonContents(filters, sort, lightDTO);
  }
  getLessonContentsById(
    lessonContentId: string,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonContentService.getLessonContentsById(lessonContentId, lightDTO);
  }
  postLessonContents(dto: ContentLessonInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    return this.lessonContentService.postLessonContents(dto, lightDTO);
  }
  putLessonContents(
    lessonContentId: string,
    dto: ContentLessonUpdateDTO,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonContentService.putLessonContents(lessonContentId, dto, lightDTO);
  }
  deleteLessonContents(lessonContentId: string): Promise<ApiResponse<unknown>> {
    return this.lessonContentService.deleteLessonContents(lessonContentId);
  }
  getProgressContent(
    filters: FiltersProgressContent,
    sort: SortingContentProgress
  ): Promise<ApiResponse<unknown>> {
    return this.progressService.getProgressContent(filters, sort);
  }
  getProgressById(progressId: string): Promise<ApiResponse<unknown>> {
    return this.progressService.getProgressById(progressId);
  }
  postProgressContent(dto: ProgressContentInDTO): Promise<ApiResponse<unknown>> {
    return this.progressService.postProgressContent(dto);
  }
  putProgress(progressId: string, dto: ProgressContentUpdateDTO): Promise<ApiResponse<unknown>> {
    return this.progressService.putProgress(progressId, dto);
  }
  deleteProgress(progressId: string): Promise<ApiResponse<unknown>> {
    return this.progressService.deleteProgress(progressId);
  }
}
