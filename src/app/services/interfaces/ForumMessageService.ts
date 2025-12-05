import type {
  ApiResponse,
  FiltersForumMessage,
  SortingForumMessages,
} from '../../../utils/index.js';
import type { ForumMessageInDTO, ForumMessageUpdateDTO } from '../../models/index.js';

export interface ForumMessageService {
  getForumMessages(
    filters: FiltersForumMessage,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  getForumMessageById(messageId: string, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  getMessagesByForumId(
    forumId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  getRepliesByParentId(
    parentMessageId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  postForumMessage(dto: ForumMessageInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  putForumMessage(
    messageId: string,
    dto: Partial<ForumMessageUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteForumMessage(messageId: string): Promise<ApiResponse<unknown>>;
}
