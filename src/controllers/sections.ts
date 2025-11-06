import type { SectionCourseInDTO, SectionCourseUpdateDTO, SectionService } from '../app/index.js';
import type { ApiResponse, FiltersSection, SortingSections } from '../utils/index.js';

export class SectionsController {
  private readonly sectionService: SectionService;
  constructor(sectionService: SectionService) {
    this.sectionService = sectionService;
  }
  getCourseSections(
    filters: FiltersSection,
    sort: SortingSections,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.sectionService.getCourseSections(filters, sort, lightDTO);
  }
  getSectionById(sectionId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.sectionService.getSectionById(sectionId, lightDTO);
  }
  postCourseSection(dto: SectionCourseInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.sectionService.postCourseSection(dto, lightDTO);
  }
  putSection(
    sectionId: string,
    dto: Partial<SectionCourseUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.sectionService.putSection(sectionId, dto, lightDTO);
  }
  deleteSection(sectionId: string): Promise<ApiResponse<unknown>> {
    return this.sectionService.deleteSection(sectionId);
  }
}
