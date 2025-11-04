import type { TagCourseInDTO } from '../app/index.js';
import type { ApiResponse, FiltersTag, SortingTags } from '../utils/index.js';

export class TagsController {
  getTags(_filters: FiltersTag, _sort: SortingTags): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getTagById(_tagId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postTag(_dto: TagCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putTag(_tagId: string, _dto: TagCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteTag(_tagId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
