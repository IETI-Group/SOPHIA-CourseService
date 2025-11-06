import type { ApiResponse, FiltersTag, SortingTags } from '../../../utils/index.js';
import type { TagCourseInDTO } from '../../models/index.js';

export interface TagService {
  getTags(filters: FiltersTag, _sort: SortingTags): Promise<ApiResponse<unknown>>;
  getTagById(tagId: string): Promise<ApiResponse<unknown>>;
  postTag(_dto: TagCourseInDTO): Promise<ApiResponse<unknown>>;
  putTag(tagId: string, _dto: Partial<TagCourseInDTO>): Promise<ApiResponse<unknown>>;
  deleteTag(tagId: string): Promise<ApiResponse<unknown>>;
}
