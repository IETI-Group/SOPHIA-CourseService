import type {
  FiltersForumMessage,
  PaginatedForumMessages,
  SortingForumMessages,
} from '../../../utils/index.js';
import type {
  ForumMessageInDTO,
  ForumMessageLightDTO,
  ForumMessageUpdateDTO,
} from '../../models/index.js';

export interface ForumMessagesRepository {
  getForumMessages(
    filters: FiltersForumMessage,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<PaginatedForumMessages>;
  getForumMessageById(messageId: string, lightDTO: boolean): Promise<ForumMessageLightDTO>;
  getMessagesByForumId(
    forumId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<PaginatedForumMessages>;
  getRepliesByParentId(
    parentMessageId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<PaginatedForumMessages>;
  createForumMessage(dto: ForumMessageInDTO, lightDTO: boolean): Promise<ForumMessageLightDTO>;
  updateForumMessage(
    messageId: string,
    dto: Partial<ForumMessageUpdateDTO>,
    lightDTO: boolean
  ): Promise<ForumMessageLightDTO>;
  deleteForumMessageById(messageId: string): Promise<void>;
}
