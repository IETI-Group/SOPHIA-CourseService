import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  CourseInDTO,
  CourseUpdateDTO,
  FavoriteCourseInDTO,
  ForumInDTO,
  ForumMessageInDTO,
  ForumMessageUpdateDTO,
  ForumUpdateDTO,
  InscriptionCourseInDTO,
  InscriptionCourseUpdateDTO,
} from '../../src/app/models/index.js';
import type { CourseService } from '../../src/app/services/interfaces/CourseService.js';
import type { FavoriteService } from '../../src/app/services/interfaces/FavoriteService.js';
import type { ForumMessageService } from '../../src/app/services/interfaces/ForumMessageService.js';
import type { ForumService } from '../../src/app/services/interfaces/ForumService.js';
import type { InscriptionService } from '../../src/app/services/interfaces/InscriptionService.js';
import { CoursesController } from '../../src/controllers/courses.js';
import type {
  COURSE_LEVEL,
  FiltersCourse,
  FiltersFavoriteCourse,
  FiltersForum,
  FiltersForumMessage,
  FiltersInscription,
  SORT_COURSES,
  SORT_FAVORITE_COURSE,
  SORT_FORUM,
  SORT_FORUM_MESSAGE,
  SORT_INSCRIPTION,
} from '../../src/utils/index.js';

describe('CoursesController', () => {
  const mockCourseService = mockDeep<CourseService>();
  const mockInscriptionService = mockDeep<InscriptionService>();
  const mockFavoriteService = mockDeep<FavoriteService>();
  const mockForumService = mockDeep<ForumService>();
  const mockForumMessageService = mockDeep<ForumMessageService>();
  let controller: CoursesController;

  beforeEach(() => {
    controller = new CoursesController(
      mockCourseService,
      mockInscriptionService,
      mockFavoriteService,
      mockForumService,
      mockForumMessageService
    );
  });

  afterEach(() => {
    mockReset(mockCourseService);
    mockReset(mockInscriptionService);
    mockReset(mockFavoriteService);
    mockReset(mockForumService);
    mockReset(mockForumMessageService);
  });

  it('should call courseService.getCourses with filters, sort and lightDTO', async () => {
    const filters: FiltersCourse = {
      instructorId: null,
      generationTaskId: null,
      title: null,
      level: null,
      status: null,
      active: null,
      aiGenerated: null,
      createdAtStart: null,
      createdAtEnd: null,
      updatedAtStart: null,
      updatedAtEnd: null,
      publishedAtStart: null,
      publishedAtEnd: null,
      lastAIUpdateAtStart: null,
      lastAIUpdateAtEnd: null,
      priceMin: null,
      priceMax: null,
      averageReviewsMin: null,
      averageReviewsMax: null,
      durationHoursMin: null,
      durationHoursMax: null,
      totalLessonsMin: null,
      totalLessonsMax: null,
      totalReviewsMin: null,
      totalReviewsMax: null,
      totalEnrollmentsMin: null,
      totalEnrollmentsMax: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_COURSES[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getCourses(filters, sort, lightDTO);

    expect(mockCourseService.getCourses).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call courseService.getCourseById with courseId and lightDTO', async () => {
    const courseId: string = 'course-123';
    const lightDTO: boolean = false;

    await controller.getCourseById(courseId, lightDTO);

    expect(mockCourseService.getCourseById).toHaveBeenCalledWith(courseId, lightDTO);
  });

  it('should call courseService.postCourse with dto and lightDTO', async () => {
    const dto: CourseInDTO = {
      instructorId: 'instructor-123',
      title: 'Test Course',
      description: 'Course description',
      price: 99.99,
      level: 'BEGINNER' as COURSE_LEVEL,
      aiGenerated: false,
      generationTaskId: null,
      generationMetadata: {},
      lastAIUpdateAt: null,
    };
    const lightDTO: boolean = true;

    await controller.postCourse(dto, lightDTO);

    expect(mockCourseService.postCourse).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call courseService.putCourse with courseId, dto and lightDTO', async () => {
    const courseId: string = 'course-123';
    const dto: Partial<CourseUpdateDTO> = {
      title: 'Updated Course',
      price: 79.99,
    };
    const lightDTO: boolean = false;

    await controller.putCourse(courseId, dto, lightDTO);

    expect(mockCourseService.putCourse).toHaveBeenCalledWith(courseId, dto, lightDTO);
  });

  it('should call courseService.deleteCourse with courseId', async () => {
    const courseId: string = 'course-123';

    await controller.deleteCourse(courseId);

    expect(mockCourseService.deleteCourse).toHaveBeenCalledWith(courseId);
  });

  it('should call inscriptionService.getInscriptionsCourse with filters and sort', async () => {
    const filters: FiltersInscription = {
      courseId: 'course-123',
      active: null,
      completed: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_INSCRIPTION[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'desc',
      sortFields: [],
    };

    await controller.getInscriptionsCourse(filters, sort);

    expect(mockInscriptionService.getInscriptionsCourse).toHaveBeenCalledWith(filters, sort);
  });

  it('should call inscriptionService.getInscriptionById with inscriptionId', async () => {
    const inscriptionId: string = 'inscription-123';

    await controller.getInscriptionById(inscriptionId);

    expect(mockInscriptionService.getInscriptionById).toHaveBeenCalledWith(inscriptionId);
  });

  it('should call inscriptionService.postInscriptionCourse with dto', async () => {
    const dto: InscriptionCourseInDTO = {
      userId: 'user-123',
      courseId: 'course-123',
    };

    await controller.postInscriptionCourse(dto);

    expect(mockInscriptionService.postInscriptionCourse).toHaveBeenCalledWith(dto);
  });

  it('should call inscriptionService.putInscription with inscriptionId and dto', async () => {
    const inscriptionId: string = 'inscription-123';
    const dto: Partial<InscriptionCourseUpdateDTO> = {
      userId: 'user-123',
      courseId: 'course-123',
    };

    await controller.putInscription(inscriptionId, dto);

    expect(mockInscriptionService.putInscription).toHaveBeenCalledWith(inscriptionId, dto);
  });

  it('should call inscriptionService.deleteInscription with inscriptionId', async () => {
    const inscriptionId: string = 'inscription-123';

    await controller.deleteInscription(inscriptionId);

    expect(mockInscriptionService.deleteInscription).toHaveBeenCalledWith(inscriptionId);
  });

  it('should call favoriteService.getFavoriteCourses with filters and sort', async () => {
    const filters: FiltersFavoriteCourse = {
      courseId: null,
      courseTitle: null,
      userId: 'user-123',
      courseLevel: null,
      courseAverageReviewsMin: null,
      courseAverageReviewsMax: null,
      courseTotalEnrollmentsMin: null,
      courseTotalEnrollmentsMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_FAVORITE_COURSE[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await controller.getFavoriteCourses(filters, sort);

    expect(mockFavoriteService.getFavoriteCourses).toHaveBeenCalledWith(filters, sort);
  });

  it('should call favoriteService.getFavorite with favorite_CourseId', async () => {
    const favorite_CourseId: string = 'favorite-123';

    await controller.getFavorite(favorite_CourseId);

    expect(mockFavoriteService.getFavorite).toHaveBeenCalledWith(favorite_CourseId);
  });

  it('should call favoriteService.postFavoriteCourse with dto', async () => {
    const dto: FavoriteCourseInDTO = {
      userId: 'user-123',
      courseId: 'course-123',
    };

    await controller.postFavoriteCourse(dto);

    expect(mockFavoriteService.postFavoriteCourse).toHaveBeenCalledWith(dto);
  });

  it('should call favoriteService.putFavorite with favorite_CourseId and dto', async () => {
    const favorite_CourseId: string = 'favorite-123';
    const dto: Partial<FavoriteCourseInDTO> = {
      courseId: 'course-456',
    };

    await controller.putFavorite(favorite_CourseId, dto);

    expect(mockFavoriteService.putFavorite).toHaveBeenCalledWith(favorite_CourseId, dto);
  });

  it('should call favoriteService.deleteFavorite with favorite_CourseId', async () => {
    const favorite_CourseId: string = 'favorite-123';

    await controller.deleteFavorite(favorite_CourseId);

    expect(mockFavoriteService.deleteFavorite).toHaveBeenCalledWith(favorite_CourseId);
  });

  // Forum tests
  it('should call forumService.getForums with filters, sort and lightDTO', async () => {
    const filters: FiltersForum = {
      courseId: null,
      active: null,
      createdAtStart: null,
      createdAtEnd: null,
      commentsCountMin: null,
      commentsCountMax: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_FORUM[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getForums(filters, sort, lightDTO);

    expect(mockForumService.getForums).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call forumService.getForumById with forumId and lightDTO', async () => {
    const forumId: string = 'forum-123';
    const lightDTO: boolean = false;

    await controller.getForumById(forumId, lightDTO);

    expect(mockForumService.getForumById).toHaveBeenCalledWith(forumId, lightDTO);
  });

  it('should call forumService.getForumByCourseId with courseId and lightDTO', async () => {
    const courseId: string = 'course-123';
    const lightDTO: boolean = true;

    await controller.getForumByCourseId(courseId, lightDTO);

    expect(mockForumService.getForumByCourseId).toHaveBeenCalledWith(courseId, lightDTO);
  });

  it('should call forumService.postForum with dto and lightDTO', async () => {
    const dto: ForumInDTO = {
      courseId: 'course-123',
      active: true,
    };
    const lightDTO: boolean = true;

    await controller.postForum(dto, lightDTO);

    expect(mockForumService.postForum).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call forumService.putForum with forumId, dto and lightDTO', async () => {
    const forumId: string = 'forum-123';
    const dto: Partial<ForumUpdateDTO> = {
      active: true,
      commentsCount: 1,
    };
    const lightDTO: boolean = false;

    await controller.putForum(forumId, dto, lightDTO);

    expect(mockForumService.putForum).toHaveBeenCalledWith(forumId, dto, lightDTO);
  });

  it('should call forumService.deleteForum with forumId', async () => {
    const forumId: string = 'forum-123';

    await controller.deleteForum(forumId);

    expect(mockForumService.deleteForum).toHaveBeenCalledWith(forumId);
  });

  // ForumMessage tests
  it('should call forumMessageService.getForumMessages with filters, sort and lightDTO', async () => {
    const filters: FiltersForumMessage = {
      forumId: null,
      userId: null,
      parentMessageId: null,
      content: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_FORUM_MESSAGE[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'desc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getForumMessages(filters, sort, lightDTO);

    expect(mockForumMessageService.getForumMessages).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call forumMessageService.getForumMessageById with messageId and lightDTO', async () => {
    const messageId: string = 'message-123';
    const lightDTO: boolean = false;

    await controller.getForumMessageById(messageId, lightDTO);

    expect(mockForumMessageService.getForumMessageById).toHaveBeenCalledWith(messageId, lightDTO);
  });

  it('should call forumMessageService.getMessagesByForumId with forumId, sort and lightDTO', async () => {
    const forumId: string = 'forum-123';
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_FORUM_MESSAGE[];
    } = {
      page: 1,
      size: 20,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getMessagesByForumId(forumId, sort, lightDTO);

    expect(mockForumMessageService.getMessagesByForumId).toHaveBeenCalledWith(
      forumId,
      sort,
      lightDTO
    );
  });

  it('should call forumMessageService.getRepliesByParentId with parentMessageId, sort and lightDTO', async () => {
    const parentMessageId: string = 'message-123';
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_FORUM_MESSAGE[];
    } = {
      page: 1,
      size: 15,
      sortDirection: 'desc',
      sortFields: [],
    };
    const lightDTO: boolean = false;

    await controller.getRepliesByParentId(parentMessageId, sort, lightDTO);

    expect(mockForumMessageService.getRepliesByParentId).toHaveBeenCalledWith(
      parentMessageId,
      sort,
      lightDTO
    );
  });

  it('should call forumMessageService.postForumMessage with dto and lightDTO', async () => {
    const dto: ForumMessageInDTO = {
      forumId: 'forum-123',
      userId: 'user-123',
      content: 'Test message content',
      parentMessageId: null,
    };
    const lightDTO: boolean = true;

    await controller.postForumMessage(dto, lightDTO);

    expect(mockForumMessageService.postForumMessage).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call forumMessageService.putForumMessage with messageId, dto and lightDTO', async () => {
    const messageId: string = 'message-123';
    const dto: Partial<ForumMessageUpdateDTO> = {
      content: 'Updated message content',
    };
    const lightDTO: boolean = false;

    await controller.putForumMessage(messageId, dto, lightDTO);

    expect(mockForumMessageService.putForumMessage).toHaveBeenCalledWith(messageId, dto, lightDTO);
  });

  it('should call forumMessageService.deleteForumMessage with messageId', async () => {
    const messageId: string = 'message-123';

    await controller.deleteForumMessage(messageId);

    expect(mockForumMessageService.deleteForumMessage).toHaveBeenCalledWith(messageId);
  });
});
