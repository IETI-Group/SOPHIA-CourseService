import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { FavoriteCourseInDTO } from '../../../src/app/models/index.js';
import type { FavoriteCoursesRepository } from '../../../src/app/repositories/index.js';
import { FavoriteServiceImpl } from '../../../src/app/services/implementations/FavoriteServiceImpl.js';
import type { FiltersFavoriteCourse, SortingFavoriteCourses } from '../../../src/utils/index.js';

describe('FavoriteServiceImpl', () => {
  const mockFavoriteCoursesRepository = mockDeep<FavoriteCoursesRepository>();
  let service: FavoriteServiceImpl;

  beforeEach(() => {
    service = new FavoriteServiceImpl(mockFavoriteCoursesRepository);
  });

  afterEach(() => {
    mockReset(mockFavoriteCoursesRepository);
  });

  it('should call favoriteCoursesRepository.getFavoriteCourses with filters and sort', async () => {
    const filters: FiltersFavoriteCourse = {
      courseId: 'course-123',
      courseTitle: null,
      userId: null,
      courseLevel: null,
      courseAverageReviewsMin: null,
      courseAverageReviewsMax: null,
      courseTotalEnrollmentsMin: null,
      courseTotalEnrollmentsMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingFavoriteCourses = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getFavoriteCourses(filters, sort);

    expect(mockFavoriteCoursesRepository.getFavoriteCourses).toHaveBeenCalledWith(filters, sort);
  });

  it('should call favoriteCoursesRepository.getFavoriteCourseById with favoriteCourseId', async () => {
    const favoriteCourseId: string = 'favorite-123';

    await service.getFavorite(favoriteCourseId);

    expect(mockFavoriteCoursesRepository.getFavoriteCourseById).toHaveBeenCalledWith(
      favoriteCourseId
    );
  });

  it('should call favoriteCoursesRepository.createFavoriteCourse with dto', async () => {
    const dto: FavoriteCourseInDTO = {
      userId: 'user-123',
      courseId: 'course-123',
    };

    await service.postFavoriteCourse(dto);

    expect(mockFavoriteCoursesRepository.createFavoriteCourse).toHaveBeenCalledWith(dto);
  });

  it('should call favoriteCoursesRepository.updateFavoriteCourse with favoriteCourseId and dto', async () => {
    const favoriteCourseId: string = 'favorite-123';
    const dto: Partial<FavoriteCourseInDTO> = {
      courseId: 'course-456',
    };

    await service.putFavorite(favoriteCourseId, dto);

    expect(mockFavoriteCoursesRepository.updateFavoriteCourse).toHaveBeenCalledWith(
      favoriteCourseId,
      dto
    );
  });

  it('should call favoriteCoursesRepository.deleteFavoriteCourseById with favoriteCourseId', async () => {
    const favoriteCourseId: string = 'favorite-123';

    await service.deleteFavorite(favoriteCourseId);

    expect(mockFavoriteCoursesRepository.deleteFavoriteCourseById).toHaveBeenCalledWith(
      favoriteCourseId
    );
  });
});
