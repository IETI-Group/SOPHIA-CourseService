import type {
  FiltersFavoriteCourse,
  PaginatedFavoriteCourses,
  SortingFavoriteCourses,
} from '../../../utils/index.js';
import type { FavoriteCourseInDTO, FavoriteCourseOutDTO } from '../../models/index.js';

export interface FavoriteCoursesRepository {
  getFavoriteCourses(
    filters: FiltersFavoriteCourse,
    sort: SortingFavoriteCourses
  ): Promise<PaginatedFavoriteCourses>;
  getFavoriteCourseById(favoriteCourseId: string): Promise<FavoriteCourseOutDTO>;
  createFavoriteCourse(dto: FavoriteCourseInDTO): Promise<FavoriteCourseOutDTO>;
  updateFavoriteCourse(
    favoriteCourseId: string,
    dto: FavoriteCourseInDTO
  ): Promise<FavoriteCourseOutDTO>;
  deleteFavoriteCourseById(favoriteCourseId: string): Promise<void>;
}
