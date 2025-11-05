import type { ApiResponse, FiltersSection, SortingSections } from '../../../utils/index.js';
import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../../models/index.js';

export interface SectionService {
  getCourseSections(
    filters: FiltersSection,
    sort: SortingSections,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  getSectionById(sectionId: string, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  postCourseSection(dto: SectionCourseInDTO, lightDTO?: boolean): Promise<ApiResponse<unknown>>;
  putSection(
    sectionId: string,
    dto: Partial<SectionCourseUpdateDTO>,
    lightDTO?: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteSection(sectionId: string): Promise<ApiResponse<unknown>>;
}
