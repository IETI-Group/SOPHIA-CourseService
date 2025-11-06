import {
  type ApiResponse,
  type FiltersFavoriteCourse,
  parseApiResponse,
  type SortingFavoriteCourses,
} from '../../../utils/index.js';
import type { FavoriteCourseInDTO } from '../../models/index.js';
import type { FavoriteCoursesRepository } from '../../repositories/index.js';
import type { FavoriteService } from '../index.js';

export class FavoriteServiceImpl implements FavoriteService {
  private readonly favoriteCoursesRepository: FavoriteCoursesRepository;
  constructor(favoriteCoursesRepository: FavoriteCoursesRepository) {
    this.favoriteCoursesRepository = favoriteCoursesRepository;
  }
  getFavoriteCourses(
    filters: FiltersFavoriteCourse,
    sort: SortingFavoriteCourses
  ): Promise<ApiResponse<unknown>> {
    return this.favoriteCoursesRepository.getFavoriteCourses(filters, sort);
  }
  async getFavorite(favoriteCourseId: string): Promise<ApiResponse<unknown>> {
    const result = await this.favoriteCoursesRepository.getFavoriteCourseById(favoriteCourseId);
    return parseApiResponse(result, 'Favorite retrieved successfully');
  }
  async postFavoriteCourse(dto: FavoriteCourseInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.favoriteCoursesRepository.createFavoriteCourse(dto);
    return parseApiResponse(result, 'Favorite created successfully');
  }
  async putFavorite(
    favoriteCourseId: string,
    dto: Partial<FavoriteCourseInDTO>
  ): Promise<ApiResponse<unknown>> {
    const result = await this.favoriteCoursesRepository.updateFavoriteCourse(favoriteCourseId, dto);
    return parseApiResponse(result, 'Favorite updated successfully');
  }
  async deleteFavorite(favoriteCourseId: string): Promise<ApiResponse<unknown>> {
    await this.favoriteCoursesRepository.deleteFavoriteCourseById(favoriteCourseId);
    return parseApiResponse(null, 'Favorite deleted successfully');
  }
}
