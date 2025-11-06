import type { ApiResponse, FiltersTag, SortingTags } from '../../../utils/index.js';
import type { TagCourseInDTO } from '../../models/index.js';
import type { TagsCourseRepository } from '../../repositories/index.js';
import type { TagService } from '../index.js';

export class TagServiceImpl implements TagService {
  private readonly tagsCourseRepository: TagsCourseRepository;
  constructor(tagsCourseRepository: TagsCourseRepository) {
    this.tagsCourseRepository = tagsCourseRepository;
  }
  getTags(_filters: FiltersTag, _sort: SortingTags): Promise<ApiResponse<unknown>> {
    this.tagsCourseRepository;
    throw new Error('Method not implemented.');
  }
  getTagById(_tagId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postTag(_dto: TagCourseInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putTag(_tagId: string, _dto: Partial<TagCourseInDTO>): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteTag(_tagId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
