import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  ForumMessageHeavyDTO,
  ForumMessageInDTO,
  ForumMessageLightDTO,
  ForumMessagesRepository,
  ForumMessageUpdateDTO,
} from '../../../../src/app/index.js';
import { ForumMessagesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/ForumMessagesRepositoryPostgreSQL.js';
import type { FiltersForumMessage, SortingForumMessages } from '../../../../src/utils/index.js';
import { SORT_FORUM_MESSAGE } from '../../../../src/utils/index.js';

describe('Forum Messages Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let forumMessagesRepository: ForumMessagesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    forumMessagesRepository = new ForumMessagesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(forumMessagesRepository).toBeDefined();
  });

  describe('getForumMessages', () => {
    it('Should return paginated forum messages with light DTO', async () => {
      const filters: FiltersForumMessage = {
        forumId: 'forum_1',
        userId: null,
        content: null,
        parentMessageId: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingForumMessages = {
        sortFields: [SORT_FORUM_MESSAGE.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockMessages = [
        {
          id_message: 'message_1',
          forum_id: 'forum_1',
          user_id: 'user_1',
          content: 'This is a test message',
          created_at: new Date('2025-01-01'),
          parent_message_id: null,
        },
      ];

      prismaClient.forumMessages.count.mockResolvedValueOnce(1);
      prismaClient.forumMessages.findMany.mockResolvedValueOnce(mockMessages);

      const result = await forumMessagesRepository.getForumMessages(filters, sort, true);

      expect(prismaClient.forumMessages.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.data[0].forumId).toBe('forum_1');
      expect(result.data[0].content).toBe('This is a test message');
    });

    it('Should return paginated forum messages with heavy DTO', async () => {
      const filters: FiltersForumMessage = {
        forumId: null,
        userId: 'user_2',
        content: null,
        parentMessageId: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingForumMessages = {
        sortFields: [SORT_FORUM_MESSAGE.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockMessages = [
        {
          id_message: 'message_2',
          forum_id: 'forum_2',
          user_id: 'user_2',
          content: 'Another test message',
          created_at: new Date('2025-02-01'),
          parent_message_id: null,
        },
        {
          id_message: 'message_3',
          forum_id: 'forum_2',
          user_id: 'user_2',
          content: 'Reply to previous message',
          created_at: new Date('2025-02-05'),
          parent_message_id: 'message_2',
        },
      ];

      prismaClient.forumMessages.count.mockResolvedValueOnce(2);
      prismaClient.forumMessages.findMany.mockResolvedValueOnce(mockMessages);

      const result = await forumMessagesRepository.getForumMessages(filters, sort, false);

      expect(prismaClient.forumMessages.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe('getForumMessageById', () => {
    it('Should return forum message by id with light DTO', async () => {
      const messageId = 'message_123';
      const forumId = 'forum_456';
      const userId = 'user_789';
      const content = 'Test message content';
      const createdAt = new Date('2025-03-01');
      const parentMessageId = null;

      const expectedOutput: ForumMessageLightDTO = {
        idMessage: messageId,
        forumId,
        userId,
        content,
        createdAt,
        parentMessageId,
      };

      prismaClient.forumMessages.findUniqueOrThrow.mockResolvedValueOnce({
        id_message: messageId,
        forum_id: forumId,
        user_id: userId,
        content,
        created_at: createdAt,
        parent_message_id: parentMessageId,
      });

      const result = await forumMessagesRepository.getForumMessageById(messageId, true);

      expect(prismaClient.forumMessages.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return forum message by id with heavy DTO', async () => {
      const messageId = 'message_789';
      const forumId = 'forum_999';
      const userId = 'user_111';
      const content = 'Detailed message content';
      const createdAt = new Date('2025-04-01');
      const parentMessageId = 'parent_message_123';

      const expectedOutput: ForumMessageHeavyDTO = {
        idMessage: messageId,
        forumId,
        userId,
        content,
        createdAt,
        parentMessageId,
      };

      prismaClient.forumMessages.findUniqueOrThrow.mockResolvedValueOnce({
        id_message: messageId,
        forum_id: forumId,
        user_id: userId,
        content,
        created_at: createdAt,
        parent_message_id: parentMessageId,
      });

      const result = await forumMessagesRepository.getForumMessageById(messageId, false);

      expect(prismaClient.forumMessages.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when forum message not found', async () => {
      const messageId = 'non_existent_message';

      prismaClient.forumMessages.findUniqueOrThrow.mockRejectedValueOnce(
        new Error('Message not found')
      );

      await expect(forumMessagesRepository.getForumMessageById(messageId, true)).rejects.toThrow();
    });
  });

  describe('getMessagesByForumId', () => {
    it('Should return messages by forum id', async () => {
      const forumId = 'forum_123';
      const sort: SortingForumMessages = {
        sortFields: [SORT_FORUM_MESSAGE.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockMessages = [
        {
          id_message: 'message_1',
          forum_id: forumId,
          user_id: 'user_1',
          content: 'First message',
          created_at: new Date('2025-05-01'),
          parent_message_id: null,
        },
        {
          id_message: 'message_2',
          forum_id: forumId,
          user_id: 'user_2',
          content: 'Second message',
          created_at: new Date('2025-05-02'),
          parent_message_id: null,
        },
      ];

      prismaClient.forumMessages.count.mockResolvedValueOnce(2);
      prismaClient.forumMessages.findMany.mockResolvedValueOnce(mockMessages);

      const result = await forumMessagesRepository.getMessagesByForumId(forumId, sort, true);

      expect(prismaClient.forumMessages.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].forumId).toBe(forumId);
      expect(result.data[1].forumId).toBe(forumId);
    });
  });

  describe('getRepliesByParentId', () => {
    it('Should return replies by parent message id', async () => {
      const parentMessageId = 'parent_message_123';
      const sort: SortingForumMessages = {
        sortFields: [SORT_FORUM_MESSAGE.CREATION_DATE],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockReplies = [
        {
          id_message: 'reply_1',
          forum_id: 'forum_1',
          user_id: 'user_2',
          content: 'Reply 1',
          created_at: new Date('2025-06-01'),
          parent_message_id: parentMessageId,
        },
        {
          id_message: 'reply_2',
          forum_id: 'forum_1',
          user_id: 'user_3',
          content: 'Reply 2',
          created_at: new Date('2025-06-02'),
          parent_message_id: parentMessageId,
        },
      ];

      prismaClient.forumMessages.count.mockResolvedValueOnce(2);
      prismaClient.forumMessages.findMany.mockResolvedValueOnce(mockReplies);

      const result = await forumMessagesRepository.getRepliesByParentId(
        parentMessageId,
        sort,
        true
      );

      expect(prismaClient.forumMessages.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].parentMessageId).toBe(parentMessageId);
      expect(result.data[1].parentMessageId).toBe(parentMessageId);
    });
  });

  describe('createForumMessage', () => {
    it('Should create a new forum message with light DTO', async () => {
      const forumId = 'forum_new';
      const userId = 'user_new';
      const content = 'New message content';
      const parentMessageId = null;

      const inputMessage: ForumMessageInDTO = {
        forumId,
        userId,
        content,
        parentMessageId,
      };

      const expectedOutput: ForumMessageLightDTO = {
        idMessage: 'new_message_id',
        forumId,
        userId,
        content,
        createdAt: new Date('2025-07-01'),
        parentMessageId,
      };

      prismaClient.forumMessages.create.mockResolvedValueOnce({
        id_message: 'new_message_id',
        forum_id: forumId,
        user_id: userId,
        content,
        created_at: new Date('2025-07-01'),
        parent_message_id: parentMessageId,
      });

      const result = await forumMessagesRepository.createForumMessage(inputMessage, true);

      expect(prismaClient.forumMessages.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a reply message with heavy DTO', async () => {
      const forumId = 'forum_reply';
      const userId = 'user_reply';
      const content = 'Reply message content';
      const parentMessageId = 'parent_msg_123';

      const inputMessage: ForumMessageInDTO = {
        forumId,
        userId,
        content,
        parentMessageId,
      };

      const expectedOutput: ForumMessageHeavyDTO = {
        idMessage: 'new_reply_id',
        forumId,
        userId,
        content,
        createdAt: new Date('2025-07-15'),
        parentMessageId,
      };

      prismaClient.forumMessages.create.mockResolvedValueOnce({
        id_message: 'new_reply_id',
        forum_id: forumId,
        user_id: userId,
        content,
        created_at: new Date('2025-07-15'),
        parent_message_id: parentMessageId,
      });

      const result = await forumMessagesRepository.createForumMessage(inputMessage, false);

      expect(prismaClient.forumMessages.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
      expect(result.parentMessageId).toBe(parentMessageId);
    });
  });

  describe('updateForumMessage', () => {
    it('Should update an existing forum message with light DTO', async () => {
      const messageId = 'message_to_update';
      const updatedContent = 'Updated message content';

      const updateDTO: Partial<ForumMessageUpdateDTO> = {
        content: updatedContent,
      };

      const expectedOutput: ForumMessageLightDTO = {
        idMessage: messageId,
        forumId: 'forum_1',
        userId: 'user_1',
        content: updatedContent,
        createdAt: new Date('2025-01-01'),
        parentMessageId: null,
      };

      prismaClient.forumMessages.update.mockResolvedValueOnce({
        id_message: messageId,
        forum_id: 'forum_1',
        user_id: 'user_1',
        content: updatedContent,
        created_at: new Date('2025-01-01'),
        parent_message_id: null,
      });

      const result = await forumMessagesRepository.updateForumMessage(messageId, updateDTO, true);

      expect(prismaClient.forumMessages.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
      expect(result.content).toBe(updatedContent);
    });

    it('Should update an existing forum message with heavy DTO', async () => {
      const messageId = 'message_full_update';
      const updatedContent = 'Completely updated content';

      const updateDTO: Partial<ForumMessageUpdateDTO> = {
        content: updatedContent,
      };

      const expectedOutput: ForumMessageHeavyDTO = {
        idMessage: messageId,
        forumId: 'forum_2',
        userId: 'user_2',
        content: updatedContent,
        createdAt: new Date('2025-02-01'),
        parentMessageId: 'parent_123',
      };

      prismaClient.forumMessages.update.mockResolvedValueOnce({
        id_message: messageId,
        forum_id: 'forum_2',
        user_id: 'user_2',
        content: updatedContent,
        created_at: new Date('2025-02-01'),
        parent_message_id: 'parent_123',
      });

      const result = await forumMessagesRepository.updateForumMessage(messageId, updateDTO, false);

      expect(prismaClient.forumMessages.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to update non-existent message', async () => {
      const messageId = 'non_existent_message';
      const updateDTO: Partial<ForumMessageUpdateDTO> = {
        content: 'Updated content',
      };

      prismaClient.forumMessages.update.mockRejectedValueOnce(new Error('Message not found'));

      await expect(
        forumMessagesRepository.updateForumMessage(messageId, updateDTO, true)
      ).rejects.toThrow();
    });
  });

  describe('deleteForumMessageById', () => {
    it('Should delete a forum message by id', async () => {
      const messageId = 'message_to_delete';

      prismaClient.forumMessages.delete.mockResolvedValueOnce({
        id_message: messageId,
        forum_id: 'forum_1',
        user_id: 'user_1',
        content: 'Deleted message',
        created_at: new Date(),
        parent_message_id: null,
      });

      await forumMessagesRepository.deleteForumMessageById(messageId);

      expect(prismaClient.forumMessages.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent message', async () => {
      const messageId = 'non_existent_message';

      prismaClient.forumMessages.delete.mockRejectedValueOnce(new Error('Message not found'));

      await expect(forumMessagesRepository.deleteForumMessageById(messageId)).rejects.toThrow();
    });
  });
});
