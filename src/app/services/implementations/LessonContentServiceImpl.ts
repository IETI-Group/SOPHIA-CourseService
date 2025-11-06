import {
  type ApiResponse,
  type FiltersLessonContent,
  parseApiResponse,
  type SortingLessonContent,
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
    filters: FiltersLessonContent,
    sort: SortingLessonContent,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonContentsRepository.getLessonContents(filters, sort, lightDTO);
  }
  async getLessonContentsById(
    lessonContentId: string,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.lessonContentsRepository.getLessonContentById(
      lessonContentId,
      lightDTO
    );
    return parseApiResponse(result, 'Lesson content retrieved successfully');
  }
  async postLessonContents(
    dto: ContentLessonInDTO,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.lessonContentsRepository.createLessonContent(dto, lightDTO);
    return parseApiResponse(result, 'Lesson content created successfully');
  }
  async putLessonContents(
    lessonContentId: string,
    dto: Partial<ContentLessonUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.lessonContentsRepository.updateLessonContent(
      lessonContentId,
      dto,
      lightDTO
    );
    return parseApiResponse(result, 'Lesson content updated successfully');
  }
  async deleteLessonContents(lessonContentId: string): Promise<ApiResponse<unknown>> {
    await this.lessonContentsRepository.deleteLessonContentById(lessonContentId);
    return parseApiResponse(null, 'Lesson content deleted successfully');
  }
}
