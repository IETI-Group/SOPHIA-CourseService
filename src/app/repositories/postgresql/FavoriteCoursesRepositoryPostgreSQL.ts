import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersFavoriteCourse,
  PaginatedFavoriteCourses,
  SortingFavoriteCourses,
} from '../../../utils/index.js';
import { SORT_FAVORITE_COURSE } from '../../../utils/index.js';
import type { FavoriteCourseInDTO, FavoriteCourseOutDTO } from '../../models/index.js';
import type { FavoriteCoursesRepository } from '../index.js';

export class FavoriteCoursesRepositoryPostgreSQL implements FavoriteCoursesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(value: T | null, field: string, where: Record<string, unknown>): void {
    if (value !== null && value !== undefined) {
      where[field] = value;
    }
  }

  private addDateRangeFilter(
    start: Date | null,
    end: Date | null,
    field: string,
    where: Record<string, unknown>
  ): void {
    if (start !== null || end !== null) {
      const rangeFilter: Prisma.DateTimeFilter = {};
      if (start !== null) rangeFilter.gte = start;
      if (end !== null) rangeFilter.lte = end;
      where[field] = rangeFilter;
    }
  }

  private buildWhere(filters: FiltersFavoriteCourse): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    this.addExactFilter(filters.courseId, 'course_id', where);
    this.addExactFilter(filters.userId, 'user_id', where);

    if (
      filters.courseTitle !== null ||
      filters.courseLevel !== null ||
      filters.courseAverageReviewsMin !== null ||
      filters.courseAverageReviewsMax !== null ||
      filters.courseTotalEnrollmentsMin !== null ||
      filters.courseTotalEnrollmentsMax !== null
    ) {
      const coursesFilter: Record<string, unknown> = {};

      if (
        filters.courseTitle !== null &&
        filters.courseTitle !== undefined &&
        filters.courseTitle.trim() !== ''
      ) {
        coursesFilter.title = { contains: filters.courseTitle, mode: 'insensitive' };
      }

      this.addExactFilter(filters.courseLevel, 'level', coursesFilter);

      if (filters.courseAverageReviewsMin !== null || filters.courseAverageReviewsMax !== null) {
        const avgReviewsFilter: Prisma.FloatFilter = {};
        if (filters.courseAverageReviewsMin !== null)
          avgReviewsFilter.gte = filters.courseAverageReviewsMin;
        if (filters.courseAverageReviewsMax !== null)
          avgReviewsFilter.lte = filters.courseAverageReviewsMax;
        coursesFilter.average_reviews = avgReviewsFilter;
      }

      if (
        filters.courseTotalEnrollmentsMin !== null ||
        filters.courseTotalEnrollmentsMax !== null
      ) {
        const totalEnrollmentsFilter: Prisma.IntFilter = {};
        if (filters.courseTotalEnrollmentsMin !== null)
          totalEnrollmentsFilter.gte = filters.courseTotalEnrollmentsMin;
        if (filters.courseTotalEnrollmentsMax !== null)
          totalEnrollmentsFilter.lte = filters.courseTotalEnrollmentsMax;
        coursesFilter.total_enrollments = totalEnrollmentsFilter;
      }

      if (Object.keys(coursesFilter).length > 0) {
        where.courses = coursesFilter;
      }
    }

    this.addDateRangeFilter(filters.createdAtStart, filters.createdAtEnd, 'created_at', where);

    return where;
  }

  private readonly sortFieldMapping: Record<SORT_FAVORITE_COURSE, Record<string, unknown>> = {
    [SORT_FAVORITE_COURSE.CREATION_DATE]: { created_at: undefined },
    [SORT_FAVORITE_COURSE.TITLE]: { courses: { title: undefined } },
    [SORT_FAVORITE_COURSE.AVERAGE_REVIEWS]: { courses: { average_reviews: undefined } },
    [SORT_FAVORITE_COURSE.TOTAL_ENROLLMENTS]: { courses: { total_enrollments: undefined } },
    [SORT_FAVORITE_COURSE.LEVEL]: { courses: { level: undefined } },
  };

  private buildSort(sort: SortingFavoriteCourses): Record<string, unknown>[] {
    const orderBy: Record<string, unknown>[] = [];

    for (const field of sort.sortFields) {
      const mappedField = this.sortFieldMapping[field];
      if (mappedField) {
        const entry = JSON.parse(JSON.stringify(mappedField));
        const key = Object.keys(entry)[0];
        if (typeof entry[key] === 'object' && entry[key] !== null) {
          const nestedKey = Object.keys(entry[key])[0];
          entry[key][nestedKey] = sort.sortDirection;
        } else {
          entry[key] = sort.sortDirection;
        }
        orderBy.push(entry);
      }
    }

    return orderBy;
  }

  private buildDTO(favoriteCourse: {
    user_id: string;
    course_id: string;
    created_at: Date;
    courses: {
      title: string;
      average_reviews: number;
      total_enrollments: number;
      level: string;
    };
  }): FavoriteCourseOutDTO {
    return {
      userId: favoriteCourse.user_id,
      courseId: favoriteCourse.course_id,
      createdAt: favoriteCourse.created_at,
      courseTitle: favoriteCourse.courses.title,
      courseAverageReviews: favoriteCourse.courses.average_reviews,
      courseTotalEnrollments: favoriteCourse.courses.total_enrollments,
      courseLevel: favoriteCourse.courses.level as never,
    };
  }

  private buildPaginatedResponse(
    data: FavoriteCourseOutDTO[],
    page: number,
    size: number,
    total: number
  ): PaginatedFavoriteCourses {
    return {
      success: true,
      message: 'Favorite courses retrieved successfully',
      data,
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      hasNext: page * size < total,
      hasPrev: page > 1,
      timestamp: new Date().toISOString(),
    };
  }

  private parseCompositeKey(favoriteCourseId: string): { userId: string; courseId: string } {
    const [userId, courseId] = favoriteCourseId.split('_');
    return { userId, courseId };
  }

  async getFavoriteCourses(
    filters: FiltersFavoriteCourse,
    sort: SortingFavoriteCourses
  ): Promise<PaginatedFavoriteCourses> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;

    const [favoriteCourses, total] = await Promise.all([
      this.prismaClient.favouritesCourses.findMany({
        where,
        orderBy,
        skip,
        take: sort.size,
        include: {
          courses: {
            select: {
              title: true,
              average_reviews: true,
              total_enrollments: true,
              level: true,
            },
          },
        },
      }),
      this.prismaClient.favouritesCourses.count({ where }),
    ]);

    const favoriteCourseDTOs = favoriteCourses.map((favoriteCourse) =>
      this.buildDTO(favoriteCourse as never)
    );

    return this.buildPaginatedResponse(favoriteCourseDTOs, sort.page, sort.size, total);
  }

  async getFavoriteCourseById(favoriteCourseId: string): Promise<FavoriteCourseOutDTO> {
    const { userId, courseId } = this.parseCompositeKey(favoriteCourseId);

    const favoriteCourse = await this.prismaClient.favouritesCourses.findUniqueOrThrow({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
      include: {
        courses: {
          select: {
            title: true,
            average_reviews: true,
            total_enrollments: true,
            level: true,
          },
        },
      },
    });

    return this.buildDTO(favoriteCourse as never);
  }

  async createFavoriteCourse(dto: FavoriteCourseInDTO): Promise<FavoriteCourseOutDTO> {
    const favoriteCourse = await this.prismaClient.favouritesCourses.create({
      data: {
        user_id: dto.userId,
        course_id: dto.courseId,
      },
      include: {
        courses: {
          select: {
            title: true,
            average_reviews: true,
            total_enrollments: true,
            level: true,
          },
        },
      },
    });

    return this.buildDTO(favoriteCourse as never);
  }

  async updateFavoriteCourse(
    favoriteCourseId: string,
    dto: FavoriteCourseInDTO
  ): Promise<FavoriteCourseOutDTO> {
    const { userId, courseId } = this.parseCompositeKey(favoriteCourseId);

    const favoriteCourse = await this.prismaClient.favouritesCourses.update({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
      data: {
        user_id: dto.userId,
        course_id: dto.courseId,
      },
      include: {
        courses: {
          select: {
            title: true,
            average_reviews: true,
            total_enrollments: true,
            level: true,
          },
        },
      },
    });

    return this.buildDTO(favoriteCourse as never);
  }

  async deleteFavoriteCourseById(favoriteCourseId: string): Promise<void> {
    const { userId, courseId } = this.parseCompositeKey(favoriteCourseId);

    const result = await this.prismaClient.favouritesCourses.delete({
      where: {
        user_id_course_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
    });
    if (!result) throw new Error('Favorite course not found');
  }
}
