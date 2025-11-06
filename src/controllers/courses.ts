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
    filters: FiltersCourse,
    sort: SortingCourses,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.courseService.getCourses(filters, sort, lightDTO);
  }
  async getCourseById(courseId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.courseService.getCourseById(courseId, lightDTO);
  }
  async postCourse(dto: CourseInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.courseService.postCourse(dto, lightDTO);
  }
  async putCourse(
    courseId: string,
    dto: Partial<CourseUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.courseService.putCourse(courseId, dto, lightDTO);
  }
  async deleteCourse(courseId: string): Promise<ApiResponse<unknown>> {
    return this.courseService.deleteCourse(courseId);
  }
  async getInscriptionsCourse(
    filters: FiltersInscription,
    sort: SortingInscriptions
  ): Promise<ApiResponse<unknown>> {
    return this.inscriptionService.getInscriptionsCourse(filters, sort);
  }
  async getInscriptionById(inscriptionId: string): Promise<ApiResponse<unknown>> {
    return this.inscriptionService.getInscriptionById(inscriptionId);
  }
  async postInscriptionCourse(dto: InscriptionCourseInDTO): Promise<ApiResponse<unknown>> {
    return this.inscriptionService.postInscriptionCourse(dto);
  }
  async putInscription(
    inscriptionId: string,
    dto: Partial<InscriptionCourseUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    return this.inscriptionService.putInscription(inscriptionId, dto);
  }
  async deleteInscription(inscriptionId: string): Promise<ApiResponse<unknown>> {
    return this.inscriptionService.deleteInscription(inscriptionId);
  }
  async getFavoriteCourses(
    filters: FiltersFavoriteCourse,
    sort: SortingFavoriteCourses
  ): Promise<ApiResponse<unknown>> {
    return this.favoriteService.getFavoriteCourses(filters, sort);
  }
  async getFavorite(favorite_CourseId: string): Promise<ApiResponse<unknown>> {
    return this.favoriteService.getFavorite(favorite_CourseId);
  }
  async postFavoriteCourse(dto: FavoriteCourseInDTO): Promise<ApiResponse<unknown>> {
    return this.favoriteService.postFavoriteCourse(dto);
  }
  async putFavorite(
    favorite_CourseId: string,
    dto: Partial<FavoriteCourseInDTO>
  ): Promise<ApiResponse<unknown>> {
    return this.favoriteService.putFavorite(favorite_CourseId, dto);
  }
  async deleteFavorite(favorite_CourseId: string): Promise<ApiResponse<unknown>> {
    return this.favoriteService.deleteFavorite(favorite_CourseId);
  }
}
