export interface SectionCourseInDTO {
  courseId: string;
  title: string;
  description: string;
  order: number;
  aiGenerated: boolean;
  generationTaskId: string | null;
  suggestedByAi: boolean;
}
