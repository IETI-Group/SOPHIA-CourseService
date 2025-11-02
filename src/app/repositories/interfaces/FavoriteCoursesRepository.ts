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
  ): PaginatedFavoriteCourses;
  getFavoriteCourseById(favoriteCourseId: string): FavoriteCourseOutDTO;
  createFavoriteCourse(dto: FavoriteCourseInDTO): FavoriteCourseOutDTO;
  updateFavoriteCourse(favoriteCourseId: string, dto: FavoriteCourseInDTO): FavoriteCourseOutDTO;
  deleteFavoriteCourseById(favoriteCourseId: string): void;
}
