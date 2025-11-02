import type { FiltersCourse, PaginatedCourses, SortingCourses } from '../../../utils/index.js';
import type { CourseInDTO, CourseLightDTO, CourseUpdateDTO } from '../../models/index.js';

export interface CoursesRepository {
  getCourses(filters: FiltersCourse, sort: SortingCourses, lightDTO: boolean): PaginatedCourses;
  getCourseById(courseId: string, lightDTO: boolean): CourseLightDTO;
  createCourse(dto: CourseInDTO, lightDTO: boolean): CourseLightDTO;
  updateCourse(courseId: string, dto: CourseUpdateDTO, lightDTO: boolean): CourseLightDTO;
  deleteCourseById(courseId: string): void;
}
