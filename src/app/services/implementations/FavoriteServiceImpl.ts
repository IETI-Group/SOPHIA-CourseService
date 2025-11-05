import type {
  ApiResponse,
  FiltersFavoriteCourse,
  SortingFavoriteCourses,
} from '../../../utils/index.js';
import type { FavoriteCourseInDTO } from '../../models/index.js';
import type { FavoriteService } from '../index.js';

export class FavoriteServiceImpl implements FavoriteService {
  getFavoriteCourses(
    _filters: FiltersFavoriteCourse,
    _sort: SortingFavoriteCourses
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getFavorite(_favoriteCourseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postFavoriteCourse(_dto: FavoriteCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putFavorite(
    _favoriteCourseId: string,
    _dto: Partial<FavoriteCourseInDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteFavorite(_favoriteCourseId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
