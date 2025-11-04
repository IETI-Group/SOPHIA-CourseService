import type { FiltersCourse, PaginatedCourses, SortingCourses } from '../../../utils/index.js';
import type { CourseInDTO, CourseLightDTO, CourseUpdateDTO } from '../../models/index.js';

export interface CoursesRepository {
  getCourses(
    filters: FiltersCourse,
    sort: SortingCourses,
    lightDTO: boolean
  ): Promise<PaginatedCourses>;
  getCourseById(courseId: string, lightDTO: boolean): Promise<CourseLightDTO>;
  createCourse(dto: CourseInDTO, lightDTO: boolean): Promise<CourseLightDTO>;
  updateCourse(courseId: string, dto: CourseUpdateDTO, lightDTO: boolean): Promise<CourseLightDTO>;
  deleteCourseById(courseId: string): Promise<void>;
}
