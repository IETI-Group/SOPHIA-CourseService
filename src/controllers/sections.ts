import type { SectionCourseInDTO, SectionCourseUpdateDTO, SectionService } from '../app/index.js';
import type { ApiResponse, FiltersSection, SortingSections } from '../utils/index.js';

export class SectionsController {
  private readonly sectionService: SectionService;
  constructor(sectionService: SectionService) {
    this.sectionService = sectionService;
  }
  getCourseSections(
    _filters: FiltersSection,
    _sort: SortingSections,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.sectionService;
    throw new Error('Method not implemented');
  }
  getSectionById(_sectionId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postCourseSection(_dto: SectionCourseInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putSection(
    _sectionId: string,
    _dto: Partial<SectionCourseUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteSection(_sectionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
