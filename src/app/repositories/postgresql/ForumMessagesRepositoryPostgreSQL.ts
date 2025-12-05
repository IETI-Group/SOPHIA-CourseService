import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersForumMessage,
  PaginatedForumMessages,
  SortingForumMessages,
} from '../../../utils/index.js';
import { SORT_FORUM_MESSAGE } from '../../../utils/index.js';
import type {
  ForumMessageHeavyDTO,
  ForumMessageInDTO,
  ForumMessageLightDTO,
  ForumMessageUpdateDTO,
} from '../../models/index.js';
import type { ForumMessagesRepository } from '../index.js';

export class ForumMessagesRepositoryPostgreSQL implements ForumMessagesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(
    whereClause: Prisma.ForumMessagesWhereInput,
    field: keyof Prisma.ForumMessagesWhereInput,
    value: T | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as T) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.ForumMessagesWhereInput,
    field: keyof Prisma.ForumMessagesWhereInput,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as Prisma.StringFilter) = {
        contains: value,
        mode: 'insensitive',
      };
    }
  }

  private addDateRangeFilter(
    whereClause: Prisma.ForumMessagesWhereInput,
    field: keyof Prisma.ForumMessagesWhereInput,
    start: Date | null,
    end: Date | null
  ): void {
    if (start !== null || end !== null) {
      const range: Prisma.DateTimeFilter = {};
      if (start !== null) range.gte = start;
      if (end !== null) range.lte = end;
      (whereClause[field] as Prisma.DateTimeFilter) = range;
    }
  }

  private buildWhere(filters: FiltersForumMessage): Prisma.ForumMessagesWhereInput {
    const whereClause: Prisma.ForumMessagesWhereInput = {};

    this.addExactFilter(whereClause, 'forum_id', filters.forumId);
    this.addExactFilter(whereClause, 'user_id', filters.userId);
    this.addExactFilter(whereClause, 'parent_message_id', filters.parentMessageId);

    this.addTextFilter(whereClause, 'content', filters.content);

    this.addDateRangeFilter(
      whereClause,
      'created_at',
      filters.createdAtStart,
      filters.createdAtEnd
    );

    return whereClause;
  }

  private readonly sortFieldMapping: Record<
    SORT_FORUM_MESSAGE,
    keyof Prisma.ForumMessagesOrderByWithRelationInput
  > = {
    [SORT_FORUM_MESSAGE.CREATION_DATE]: 'created_at',
    [SORT_FORUM_MESSAGE.CONTENT]: 'content',
  };

  private buildSort(
    sortParams: SortingForumMessages
  ): Prisma.ForumMessagesOrderByWithRelationInput[] {
    const orderBy: Prisma.ForumMessagesOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      const field = this.sortFieldMapping[sortField];
      if (field) {
        orderBy.push({ [field]: direction });
      }
    }

    return orderBy;
  }

  private buildSelect(_lightDTO: boolean): Prisma.ForumMessagesSelect {
    const select: Prisma.ForumMessagesSelect = {
      id_message: true,
      forum_id: true,
      user_id: true,
      content: true,
      created_at: true,
      parent_message_id: true,
    };

    // En este caso no hay diferencia entre light y heavy
    // pero mantenemos la estructura por consistencia
    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.ForumMessagesGetPayload<{ select: Prisma.ForumMessagesSelect }>
  ): ForumMessageLightDTO {
    const baseDTO: ForumMessageLightDTO = {
      idMessage: record.id_message,
      forumId: record.forum_id,
      userId: record.user_id,
      content: record.content,
      createdAt: record.created_at,
      parentMessageId: record.parent_message_id,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO: ForumMessageHeavyDTO = {
      ...baseDTO,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: ForumMessageLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedForumMessages {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Forum messages retrieved successfully',
      data,
      timestamp: new Date().toISOString(),
      page,
      size,
      total,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  async getForumMessages(
    filters: FiltersForumMessage,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<PaginatedForumMessages> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.forumMessages.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.forumMessages.count({ where }),
    ]);

    const data: ForumMessageLightDTO[] = records.map((record) => this.buildDTO(lightDTO, record));

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }

  async getForumMessageById(messageId: string, lightDTO: boolean): Promise<ForumMessageLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.forumMessages.findUniqueOrThrow({
      where: { id_message: messageId },
      select,
    });

    return this.buildDTO(lightDTO, record);
  }

  async getMessagesByForumId(
    forumId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<PaginatedForumMessages> {
    const size = sort.size;
    const page = sort.page;

    const where: Prisma.ForumMessagesWhereInput = { forum_id: forumId };
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.forumMessages.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.forumMessages.count({ where }),
    ]);

    const data: ForumMessageLightDTO[] = records.map((record) => this.buildDTO(lightDTO, record));

    return this.buildPaginatedResponse(data, total, page, size);
  }

  async getRepliesByParentId(
    parentMessageId: string,
    sort: SortingForumMessages,
    lightDTO: boolean
  ): Promise<PaginatedForumMessages> {
    const size = sort.size;
    const page = sort.page;

    const where: Prisma.ForumMessagesWhereInput = { parent_message_id: parentMessageId };
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.forumMessages.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.forumMessages.count({ where }),
    ]);

    const data: ForumMessageLightDTO[] = records.map((record) => this.buildDTO(lightDTO, record));

    return this.buildPaginatedResponse(data, total, page, size);
  }

  async createForumMessage(
    dto: ForumMessageInDTO,
    lightDTO: boolean
  ): Promise<ForumMessageLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.forumMessages.create({
      data: {
        forum_id: dto.forumId,
        user_id: dto.userId,
        content: dto.content,
        parent_message_id: dto.parentMessageId,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateForumMessage(
    messageId: string,
    dto: Partial<ForumMessageUpdateDTO>,
    lightDTO: boolean
  ): Promise<ForumMessageLightDTO> {
    const select = this.buildSelect(lightDTO);
    const dataToUpdate: Record<string, unknown> = {};

    if (dto.content !== undefined) {
      dataToUpdate.content = dto.content;
    }

    const updated = await this.prismaClient.forumMessages.update({
      where: { id_message: messageId },
      data: dataToUpdate,
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteForumMessageById(messageId: string): Promise<void> {
    const deleted = await this.prismaClient.forumMessages.delete({
      where: { id_message: messageId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
