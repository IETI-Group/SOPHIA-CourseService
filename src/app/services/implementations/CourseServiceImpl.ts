import type { ApiResponse, FiltersCourse, SortingCourses } from '../../../utils/index.js';
import type { CourseInDTO, CourseUpdateDTO } from '../../models/index.js';
import type { CoursesRepository } from '../../repositories/index.js';
import type { CourseService } from '../index.js';

export class CourseServiceImpl implements CourseService {
  private readonly coursesRepository: CoursesRepository;
  constructor(coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository;
  }
  getCourses(
    _filters: FiltersCourse,
    _sort: SortingCourses,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.coursesRepository;
    throw new Error('Method not implemented.');
  }
  getCourseById(_courseId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postCourse(_dto: CourseInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putCourse(
    _courseId: string,
    _dto: Partial<CourseUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteCourse(_courseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
