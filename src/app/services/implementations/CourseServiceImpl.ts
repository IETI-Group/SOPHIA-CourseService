import {
  type ApiResponse,
  type FiltersCourse,
  parseApiResponse,
  type SortingCourses,
} from '../../../utils/index.js';
import type { CourseInDTO, CourseUpdateDTO } from '../../models/index.js';
import type { CoursesRepository } from '../../repositories/index.js';
import type { CourseService } from '../index.js';

export class CourseServiceImpl implements CourseService {
  private readonly coursesRepository: CoursesRepository;
  constructor(coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository;
  }
  getCourses(
    filters: FiltersCourse,
    sort: SortingCourses,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.coursesRepository.getCourses(filters, sort, lightDTO);
  }
  async getCourseById(courseId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.coursesRepository.getCourseById(courseId, lightDTO);
    return parseApiResponse(result, 'Course retrieved successfully');
  }
  async postCourse(dto: CourseInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.coursesRepository.createCourse(dto, lightDTO);
    return parseApiResponse(result, 'Course created successfully');
  }
  async putCourse(
    courseId: string,
    dto: Partial<CourseUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.coursesRepository.updateCourse(courseId, dto, lightDTO);
    return parseApiResponse(result, 'Course updated successfully');
  }
  async deleteCourse(courseId: string): Promise<ApiResponse<unknown>> {
    await this.coursesRepository.deleteCourseById(courseId);
    return parseApiResponse(null, 'Course deleted successfully');
  }
}
