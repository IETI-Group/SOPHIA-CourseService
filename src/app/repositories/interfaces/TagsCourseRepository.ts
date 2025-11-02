import type { FiltersTag, PaginatedTags, SortingTags } from '../../../utils/index.js';
import type { TagCourseInDTO, TagCourseOutDTO } from '../../models/index.js';

export interface TagsCourseRepository {
  getTags(filters: FiltersTag, sort: SortingTags): Promise<PaginatedTags>;
  getTagById(tagId: string): Promise<TagCourseOutDTO>;
  createTag(dto: TagCourseInDTO): Promise<TagCourseOutDTO>;
  updateTag(tagId: string, dto: TagCourseInDTO): Promise<TagCourseOutDTO>;
  deleteTagById(tagId: string): Promise<void>;
}
