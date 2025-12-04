import type {
  CourseInDTO,
  CourseService,
  CourseUpdateDTO,
  FavoriteCourseInDTO,
  FavoriteService,
  ForumInDTO,
  ForumMessageInDTO,
  ForumMessageService,
  ForumMessageUpdateDTO,
  ForumService,
  ForumUpdateDTO,
  InscriptionCourseInDTO,
  InscriptionCourseUpdateDTO,
  InscriptionService,
} from '../app/index.js';
import type {
  ApiResponse,
  FiltersCourse,
  FiltersFavoriteCourse,
  FiltersForum,
  FiltersForumMessage,
  FiltersInscription,
  SortingCourses,
  SortingFavoriteCourses,
  SortingForumMessages,
  SortingForums,
  SortingInscriptions,
} from '../utils/index.js';

export class CoursesController {
  private readonly courseService: CourseService;
  private readonly inscriptionService: InscriptionService;
  private readonly favoriteService: FavoriteService;
  private readonly forumService: ForumService;
  private readonly forumMessageService: ForumMessageService;
  constructor(
    courseService: CourseService,
    inscriptionService: InscriptionService,
    favoriteService: FavoriteService,
    forumService: ForumService,
    forumMessageService: ForumMessageService
  ) {
    this.courseService = courseService;
    this.inscriptionService = inscriptionService;
    this.favoriteService = favoriteService;
    this.forumService = forumService;
    this.forumMessageService = forumMessageService;
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

  // Forum methods
  async getForums(
    filters: FiltersForum,
    sort: SortingForums,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumService.getForums(filters, sort, lightDTO);
  }
  async getForumById(forumId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.forumService.getForumById(forumId, lightDTO);
  }
  async getForumByCourseId(courseId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.forumService.getForumByCourseId(courseId, lightDTO);
  }
  async postForum(dto: ForumInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.forumService.postForum(dto, lightDTO);
  }
  async putForum(
    forumId: string,
    dto: Partial<ForumUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumService.putForum(forumId, dto, lightDTO);
  }
  async deleteForum(forumId: string): Promise<ApiResponse<unknown>> {
    return this.forumService.deleteForum(forumId);
  }

  // Forum Message methods
  async getForumMessages(
    filters: FiltersForumMessage,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.getForumMessages(filters, sort, lightDTO);
  }
  async getForumMessageById(messageId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.getForumMessageById(messageId, lightDTO);
  }
  async getMessagesByForumId(
    forumId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.getMessagesByForumId(forumId, sort, lightDTO);
  }
  async getRepliesByParentId(
    parentMessageId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.getRepliesByParentId(parentMessageId, sort, lightDTO);
  }
  async postForumMessage(dto: ForumMessageInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.postForumMessage(dto, lightDTO);
  }
  async putForumMessage(
    messageId: string,
    dto: Partial<ForumMessageUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.putForumMessage(messageId, dto, lightDTO);
  }
  async deleteForumMessage(messageId: string): Promise<ApiResponse<unknown>> {
    return this.forumMessageService.deleteForumMessage(messageId);
  }
}
