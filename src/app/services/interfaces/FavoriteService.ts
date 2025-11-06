import type {
  ApiResponse,
  FiltersFavoriteCourse,
  SortingFavoriteCourses,
} from '../../../utils/index.js';
import type { FavoriteCourseInDTO } from '../../models/index.js';

export interface FavoriteService {
  getFavoriteCourses(
    filters: FiltersFavoriteCourse,
    sort: SortingFavoriteCourses
  ): Promise<ApiResponse<unknown>>;
  getFavorite(favoriteCourseId: string): Promise<ApiResponse<unknown>>;
  postFavoriteCourse(dto: FavoriteCourseInDTO): Promise<ApiResponse<unknown>>;
  putFavorite(
    favoriteCourseId: string,
    dto: Partial<FavoriteCourseInDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteFavorite(favoriteCourseId: string): Promise<ApiResponse<unknown>>;
}
