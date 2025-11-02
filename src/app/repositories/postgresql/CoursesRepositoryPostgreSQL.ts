import type { PrismaClient } from '@prisma/client/default.js';
import type { FiltersCourse, PaginatedCourses, SortingCourses } from '../../../utils/index.js';
import type { CourseInDTO, CourseLightDTO, CourseUpdateDTO } from '../../models/index.js';
import type { CoursesRepository } from '../index.js';

export class CoursesRepositoryPostgreSQL implements CoursesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getCourses(
    _filters: FiltersCourse,
    _sort: SortingCourses,
    _lightDTO: boolean
  ): Promise<PaginatedCourses> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getCourseById(_courseId: string, _lightDTO: boolean): Promise<CourseLightDTO> {
    throw new Error('Method not implemented.');
  }
  createCourse(_dto: CourseInDTO, _lightDTO: boolean): Promise<CourseLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateCourse(
    _courseId: string,
    _dto: CourseUpdateDTO,
    _lightDTO: boolean
  ): Promise<CourseLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteCourseById(_courseId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
