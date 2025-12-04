import type { ApiResponse, FiltersForum, SortingForums } from '../../../utils/index.js';
import type { ForumInDTO, ForumUpdateDTO } from '../../models/index.js';

export interface ForumService {
  getForums(
    filters: FiltersForum,
    sort: SortingForums,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  getForumById(forumId: string, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  getForumByCourseId(courseId: string, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  postForum(dto: ForumInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  putForum(
    forumId: string,
    dto: Partial<ForumUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteForum(forumId: string): Promise<ApiResponse<unknown>>;
}
