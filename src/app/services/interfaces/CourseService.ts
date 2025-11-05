import type { ApiResponse, FiltersCourse, SortingCourses } from '../../../utils/index.js';
import type { CourseInDTO, CourseUpdateDTO } from '../../models/index.js';

export interface CourseService {
  getCourses(
    filters: FiltersCourse,
    sort: SortingCourses,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  getCourseById(courseId: string, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  postCourse(dto: CourseInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  putCourse(
    courseId: string,
    dto: Partial<CourseUpdateDTO>,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteCourse(courseId: string): Promise<ApiResponse<unknown>>;
}
