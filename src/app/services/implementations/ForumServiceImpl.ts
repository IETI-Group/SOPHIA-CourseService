import {
  type ApiResponse,
  type FiltersForum,
  parseApiResponse,
  type SortingForums,
} from '../../../utils/index.js';
import type { ForumInDTO, ForumUpdateDTO } from '../../models/index.js';
import type { ForumsRepository } from '../../repositories/index.js';
import type { ForumService } from '../index.js';

export class ForumServiceImpl implements ForumService {
  private readonly forumsRepository: ForumsRepository;
  constructor(forumsRepository: ForumsRepository) {
    this.forumsRepository = forumsRepository;
  }
  getForums(
    filters: FiltersForum,
    sort: SortingForums,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumsRepository.getForums(filters, sort, lightDTO);
  }
  async getForumById(forumId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.forumsRepository.getForumById(forumId, lightDTO);
    return parseApiResponse(result, 'Forum retrieved successfully');
  }
  async getForumByCourseId(courseId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.forumsRepository.getForumByCourseId(courseId, lightDTO);
    return parseApiResponse(result, 'Forum retrieved successfully');
  }
  async postForum(dto: ForumInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.forumsRepository.createForum(dto, lightDTO);
    return parseApiResponse(result, 'Forum created successfully');
  }
  async putForum(
    forumId: string,
    dto: Partial<ForumUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.forumsRepository.updateForum(forumId, dto, lightDTO);
    return parseApiResponse(result, 'Forum updated successfully');
  }
  async deleteForum(forumId: string): Promise<ApiResponse<unknown>> {
    await this.forumsRepository.deleteForumById(forumId);
    return parseApiResponse(null, 'Forum deleted successfully');
  }
}
