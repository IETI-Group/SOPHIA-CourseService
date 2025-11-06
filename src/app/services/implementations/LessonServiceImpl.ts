import {
  type ApiResponse,
  type FiltersLesson,
  parseApiResponse,
  type SortingLessons,
} from '../../../utils/index.js';
import type { LessonSectionInDTO, LessonSectionUpdateDTO } from '../../models/index.js';
import type { LessonsRepository } from '../../repositories/index.js';
import type { LessonService } from '../index.js';

export class LessonServiceImpl implements LessonService {
  private readonly lessonsRepository: LessonsRepository;
  constructor(lessonsRepository: LessonsRepository) {
    this.lessonsRepository = lessonsRepository;
  }
  getSectionLessons(
    filters: FiltersLesson,
    sort: SortingLessons,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.lessonsRepository.getLessons(filters, sort, lightDTO);
  }
  async getLessonById(lessonId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.lessonsRepository.getLessonById(lessonId, lightDTO);
    return parseApiResponse(result, 'Lesson retrieved successfully');
  }
  async postSectionLesson(
    dto: LessonSectionInDTO,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.lessonsRepository.createLesson(dto, lightDTO);
    return parseApiResponse(result, 'Lesson created successfully');
  }
  async putLesson(
    lessonId: string,
    dto: Partial<LessonSectionUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.lessonsRepository.updateLesson(lessonId, dto, lightDTO);
    return parseApiResponse(result, 'Lesson updated successfully');
  }
  async deleteLesson(lessonId: string): Promise<ApiResponse<unknown>> {
    await this.lessonsRepository.deleteLessonById(lessonId);
    return parseApiResponse(null, 'Lesson deleted successfully');
  }
}
