import type { FiltersSection, PaginatedSections, SortingSections } from '../../../utils/index.js';
import type {
  SectionCourseInDTO,
  SectionCourseOutLightDTO,
  SectionCourseUpdateDTO,
} from '../../models/index.js';

export interface SectionsRepository {
  getSections(
    filters: FiltersSection,
    sort: SortingSections,
    lightDTO: boolean
  ): Promise<PaginatedSections>;
  getSectionById(sectionId: string, lightDTO: boolean): Promise<SectionCourseOutLightDTO>;
  createSection(dto: SectionCourseInDTO, lightDTO: boolean): Promise<SectionCourseOutLightDTO>;
  updateSection(
    sectionId: string,
    dto: SectionCourseUpdateDTO,
    lightDTO: boolean
  ): Promise<SectionCourseOutLightDTO>;
  deleteSectionById(sectionId: string): Promise<void>;
}
