import type { FiltersTag, PaginatedTags, SortingTags } from '../../../utils/index.js';
import type { TagCourseInDTO, TagCourseOutDTO } from '../../models/index.js';

export interface TagsCourseRepository {
  getTags(filters: FiltersTag, sort: SortingTags): PaginatedTags;
  getTagById(tagId: string): TagCourseOutDTO;
  createTag(dto: TagCourseInDTO): TagCourseOutDTO;
  updateTag(tagId: string, dto: TagCourseInDTO): TagCourseOutDTO;
  deleteTagById(tagId: string): void;
}
