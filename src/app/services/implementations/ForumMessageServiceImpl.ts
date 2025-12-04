import {
  type ApiResponse,
  type FiltersForumMessage,
  parseApiResponse,
  type SortingForumMessages,
} from '../../../utils/index.js';
import type { ForumMessageInDTO, ForumMessageUpdateDTO } from '../../models/index.js';
import type { ForumMessagesRepository } from '../../repositories/index.js';
import type { ForumMessageService } from '../index.js';

export class ForumMessageServiceImpl implements ForumMessageService {
  private readonly forumMessagesRepository: ForumMessagesRepository;
  constructor(forumMessagesRepository: ForumMessagesRepository) {
    this.forumMessagesRepository = forumMessagesRepository;
  }
  getForumMessages(
    filters: FiltersForumMessage,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.forumMessagesRepository.getForumMessages(filters, sort, lightDTO);
  }
  async getForumMessageById(messageId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.forumMessagesRepository.getForumMessageById(messageId, lightDTO);
    return parseApiResponse(result, 'Forum message retrieved successfully');
  }
  async getMessagesByForumId(
    forumId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.forumMessagesRepository.getMessagesByForumId(forumId, sort, lightDTO);
    return result;
  }
  async getRepliesByParentId(
    parentMessageId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.forumMessagesRepository.getRepliesByParentId(
      parentMessageId,
      sort,
      lightDTO
    );
    return result;
  }
  async postForumMessage(dto: ForumMessageInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.forumMessagesRepository.createForumMessage(dto, lightDTO);
    return parseApiResponse(result, 'Forum message created successfully');
  }
  async putForumMessage(
    messageId: string,
    dto: Partial<ForumMessageUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.forumMessagesRepository.updateForumMessage(messageId, dto, lightDTO);
    return parseApiResponse(result, 'Forum message updated successfully');
  }
  async deleteForumMessage(messageId: string): Promise<ApiResponse<unknown>> {
    await this.forumMessagesRepository.deleteForumMessageById(messageId);
    return parseApiResponse(null, 'Forum message deleted successfully');
  }
}
