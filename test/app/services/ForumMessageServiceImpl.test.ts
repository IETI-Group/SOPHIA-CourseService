import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ForumMessageInDTO, ForumMessageUpdateDTO } from '../../../src/app/models/index.js';
import type { ForumMessagesRepository } from '../../../src/app/repositories/index.js';
import { ForumMessageServiceImpl } from '../../../src/app/services/implementations/ForumMessageServiceImpl.js';
import type { FiltersForumMessage, SortingForumMessages } from '../../../src/utils/index.js';

describe('ForumMessageServiceImpl', () => {
  const mockForumMessagesRepository = mockDeep<ForumMessagesRepository>();
  let service: ForumMessageServiceImpl;

  beforeEach(() => {
    service = new ForumMessageServiceImpl(mockForumMessagesRepository);
  });

  afterEach(() => {
    mockReset(mockForumMessagesRepository);
  });

  it('should call forumMessagesRepository.getForumMessages with filters, sort and lightDTO', async () => {
    const filters: FiltersForumMessage = {
      forumId: 'forum-123',
      userId: 'user-456',
      content: null,
      parentMessageId: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingForumMessages = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO = true;

    await service.getForumMessages(filters, sort, lightDTO);

    expect(mockForumMessagesRepository.getForumMessages).toHaveBeenCalledWith(
      filters,
      sort,
      lightDTO
    );
  });

  it('should call forumMessagesRepository.getForumMessageById with messageId and lightDTO', async () => {
    const messageId = 'message-123';
    const lightDTO = false;

    await service.getForumMessageById(messageId, lightDTO);

    expect(mockForumMessagesRepository.getForumMessageById).toHaveBeenCalledWith(
      messageId,
      lightDTO
    );
  });

  it('should call forumMessagesRepository.getMessagesByForumId with forumId, sort and lightDTO', async () => {
    const forumId = 'forum-123';
    const sort: SortingForumMessages = {
      page: 1,
      size: 10,
      sortDirection: 'desc',
      sortFields: [],
    };
    const lightDTO = true;

    await service.getMessagesByForumId(forumId, sort, lightDTO);

    expect(mockForumMessagesRepository.getMessagesByForumId).toHaveBeenCalledWith(
      forumId,
      sort,
      lightDTO
    );
  });

  it('should call forumMessagesRepository.getRepliesByParentId with parentMessageId, sort and lightDTO', async () => {
    const parentMessageId = 'parent-message-123';
    const sort: SortingForumMessages = {
      page: 1,
      size: 20,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO = false;

    await service.getRepliesByParentId(parentMessageId, sort, lightDTO);

    expect(mockForumMessagesRepository.getRepliesByParentId).toHaveBeenCalledWith(
      parentMessageId,
      sort,
      lightDTO
    );
  });

  it('should call forumMessagesRepository.createForumMessage with dto and lightDTO', async () => {
    const dto: ForumMessageInDTO = {
      forumId: 'forum-456',
      userId: 'user-789',
      content: 'This is a test message',
      parentMessageId: null,
    };
    const lightDTO = true;

    await service.postForumMessage(dto, lightDTO);

    expect(mockForumMessagesRepository.createForumMessage).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call forumMessagesRepository.createForumMessage with reply dto and lightDTO', async () => {
    const dto: ForumMessageInDTO = {
      forumId: 'forum-456',
      userId: 'user-789',
      content: 'This is a reply message',
      parentMessageId: 'parent-message-123',
    };
    const lightDTO = false;

    await service.postForumMessage(dto, lightDTO);

    expect(mockForumMessagesRepository.createForumMessage).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call forumMessagesRepository.updateForumMessage with messageId, dto and lightDTO', async () => {
    const messageId = 'message-123';
    const dto: Partial<ForumMessageUpdateDTO> = {
      content: 'Updated message content',
    };
    const lightDTO = true;

    await service.putForumMessage(messageId, dto, lightDTO);

    expect(mockForumMessagesRepository.updateForumMessage).toHaveBeenCalledWith(
      messageId,
      dto,
      lightDTO
    );
  });

  it('should call forumMessagesRepository.deleteForumMessageById with messageId', async () => {
    const messageId = 'message-123';

    await service.deleteForumMessage(messageId);

    expect(mockForumMessagesRepository.deleteForumMessageById).toHaveBeenCalledWith(messageId);
  });
});
