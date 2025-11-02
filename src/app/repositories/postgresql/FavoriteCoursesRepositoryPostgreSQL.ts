import type { PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersFavoriteCourse,
  PaginatedFavoriteCourses,
  SortingFavoriteCourses,
} from '../../../utils/index.js';
import type { FavoriteCourseInDTO, FavoriteCourseOutDTO } from '../../models/index.js';
import type { FavoriteCoursesRepository } from '../index.js';

export class FavoriteCoursesRepositoryPostgreSQL implements FavoriteCoursesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getFavoriteCourses(
    _filters: FiltersFavoriteCourse,
    _sort: SortingFavoriteCourses
  ): Promise<PaginatedFavoriteCourses> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getFavoriteCourseById(_favoriteCourseId: string): Promise<FavoriteCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  createFavoriteCourse(_dto: FavoriteCourseInDTO): Promise<FavoriteCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateFavoriteCourse(
    _favoriteCourseId: string,
    _dto: FavoriteCourseInDTO
  ): Promise<FavoriteCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteFavoriteCourseById(_favoriteCourseId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
