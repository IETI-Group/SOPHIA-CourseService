import type { SectionCourseOutLightDTO } from './SectionCourseOutLightDTO.js';

export interface SectionCourseOutHeavyDTO extends SectionCourseOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  suggestedByAi: boolean;
}
