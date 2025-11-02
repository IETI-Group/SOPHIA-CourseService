import type { PrismaClient } from '@prisma/client/default.js';
import type { FiltersTag, PaginatedTags, SortingTags } from '../../../utils/index.js';
import type { TagCourseInDTO, TagCourseOutDTO } from '../../models/index.js';
import type { TagsCourseRepository } from '../index.js';

export class TagsCourseRepositoryPostgreSQL implements TagsCourseRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getTags(_filters: FiltersTag, _sort: SortingTags): Promise<PaginatedTags> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getTagById(_tagId: string): Promise<TagCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  createTag(_dto: TagCourseInDTO): Promise<TagCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  updateTag(_tagId: string, _dto: TagCourseInDTO): Promise<TagCourseOutDTO> {
    throw new Error('Method not implemented.');
  }
  deleteTagById(_tagId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
