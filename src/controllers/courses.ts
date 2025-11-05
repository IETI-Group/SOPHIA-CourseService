import type {
  CourseInDTO,
  CourseService,
  CourseUpdateDTO,
  FavoriteCourseInDTO,
  FavoriteService,
  InscriptionCourseInDTO,
  InscriptionCourseUpdateDTO,
  InscriptionService,
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
  private readonly courseService: CourseService;
  private readonly inscriptionService: InscriptionService;
  private readonly favoriteService: FavoriteService;
  constructor(
    courseService: CourseService,
    inscriptionService: InscriptionService,
    favoriteService: FavoriteService
  ) {
    this.courseService = courseService;
    this.inscriptionService = inscriptionService;
    this.favoriteService = favoriteService;
  }
  async getCourses(
    _filters: FiltersCourse,
    _sort: SortingCourses,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.courseService;
    this.inscriptionService;
    this.favoriteService;
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
    _dto: Partial<CourseUpdateDTO>,
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
    _dto: Partial<InscriptionCourseUpdateDTO>
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
    _dto: Partial<FavoriteCourseInDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  async deleteFavorite(_favorite_CourseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
