import type {
  CourseInDTO,
  CourseUpdateDTO,
  FavoriteCourseInDTO,
  InscriptionCourseInDTO,
  InscriptionCourseUpdateDTO,
} from '../app/index.js';
import type {
  ApiResponse,
  FiltersCourse,
  FiltersFavoriteCourse,
  FiltersInscription,
  SortingCourses,
  SortingFavoriteCourses,
  SortingInscriptions,
} from '../utils/index.js';

export class CoursesController {
  async getCourses(
    _filters: FiltersCourse,
    _sort: SortingCourses,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async getCourseById(_courseId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async postCourse(_dto: CourseInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async putCourse(
    _courseId: string,
    _dto: CourseUpdateDTO,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async deleteCourse(_courseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async getInscriptionsCourse(
    _filters: FiltersInscription,
    _sort: SortingInscriptions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async getInscriptionById(_inscriptionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async postInscriptionCourse(_dto: InscriptionCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async putInscription(
    _inscriptionId: string,
    _dto: InscriptionCourseUpdateDTO
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async deleteInscription(_inscriptionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async getFavoriteCourses(
    _filters: FiltersFavoriteCourse,
    _sort: SortingFavoriteCourses
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async getFavorite(_favorite_CourseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async postFavoriteCourse(_dto: FavoriteCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async putFavorite(
    _favorite_CourseId: string,
    _dto: FavoriteCourseInDTO
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async deleteFavorite(_favorite_CourseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
