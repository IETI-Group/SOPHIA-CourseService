import {
  type ApiResponse,
  type FiltersTag,
  parseApiResponse,
  type SortingTags,
} from '../../../utils/index.js';
import type { TagCourseInDTO } from '../../models/index.js';
import type { TagsCourseRepository } from '../../repositories/index.js';
import type { TagService } from '../index.js';

export class TagServiceImpl implements TagService {
  private readonly tagsCourseRepository: TagsCourseRepository;
  constructor(tagsCourseRepository: TagsCourseRepository) {
    this.tagsCourseRepository = tagsCourseRepository;
  }
  getTags(filters: FiltersTag, sort: SortingTags): Promise<ApiResponse<unknown>> {
    return this.tagsCourseRepository.getTags(filters, sort);
  }
  async getTagById(tagId: string): Promise<ApiResponse<unknown>> {
    const result = await this.tagsCourseRepository.getTagById(tagId);
    return parseApiResponse(result, 'Tag retrieved successfully');
  }
  async postTag(dto: TagCourseInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.tagsCourseRepository.createTag(dto);
    return parseApiResponse(result, 'Tag created successfully');
  }
  async putTag(tagId: string, dto: Partial<TagCourseInDTO>): Promise<ApiResponse<unknown>> {
    const result = await this.tagsCourseRepository.updateTag(tagId, dto);
    return parseApiResponse(result, 'Tag updated successfully');
  }
  async deleteTag(tagId: string): Promise<ApiResponse<unknown>> {
    await this.tagsCourseRepository.deleteTagById(tagId);
    return parseApiResponse(null, 'Tag deleted successfully');
  }
}
