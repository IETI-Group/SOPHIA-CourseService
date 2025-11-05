import type { TagCourseInDTO, TagService } from '../app/index.js';
import type { ApiResponse, FiltersTag, SortingTags } from '../utils/index.js';

export class TagsController {
  private readonly tagService: TagService;
  constructor(tagService: TagService) {
    this.tagService = tagService;
  }
  getTags(filters: FiltersTag, sort: SortingTags): Promise<ApiResponse<unknown>> {
    return this.tagService.getTags(filters, sort);
  }
  getTagById(tagId: string): Promise<ApiResponse<unknown>> {
    return this.tagService.getTagById(tagId);
  }
  postTag(dto: TagCourseInDTO): Promise<ApiResponse<unknown>> {
    return this.tagService.postTag(dto);
  }
  putTag(tagId: string, dto: Partial<TagCourseInDTO>): Promise<ApiResponse<unknown>> {
    return this.tagService.putTag(tagId, dto);
  }
  deleteTag(tagId: string): Promise<ApiResponse<unknown>> {
    return this.tagService.deleteTag(tagId);
  }
}
