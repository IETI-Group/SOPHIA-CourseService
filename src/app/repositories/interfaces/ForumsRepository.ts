import type { FiltersForum, PaginatedForums, SortingForums } from '../../../utils/index.js';
import type { ForumInDTO, ForumLightDTO, ForumUpdateDTO } from '../../models/index.js';

export interface ForumsRepository {
  getForums(
    filters: FiltersForum,
    sort: SortingForums,
    lightDTO: boolean
  ): Promise<PaginatedForums>;
  getForumById(forumId: string, lightDTO: boolean): Promise<ForumLightDTO>;
  getForumByCourseId(courseId: string, lightDTO: boolean): Promise<ForumLightDTO | null>;
  createForum(dto: ForumInDTO, lightDTO: boolean): Promise<ForumLightDTO>;
  updateForum(
    forumId: string,
    dto: Partial<ForumUpdateDTO>,
    lightDTO: boolean
  ): Promise<ForumLightDTO>;
  deleteForumById(forumId: string): Promise<void>;
}
