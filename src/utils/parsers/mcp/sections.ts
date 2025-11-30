import { z } from 'zod';

export const sectionCourseMCPSchema = () => {
  return z.object({
    courseId: z.string().min(1).max(200).describe('ID of the parent course'),
    title: z.string().min(1).max(500).describe('Section title'),
    description: z.string().min(1).max(5000).describe('Section description'),
    order: z.number().min(0).describe('Order position within the course'),
    aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
    generationTaskId: z.string().min(1).max(200).nullable().optional().describe('AI task ID'),
    suggestedByAi: z.boolean().default(false).describe('Whether suggested by AI'),
  });
};

export const sectionCoureFilterMCPFiltersSchema = () => {
  return z.object({
    courseId: z.string().describe('Filter by course ID'),
    title: z.string().optional().describe('Filter by title'),
    active: z.boolean().optional().describe('Filter by active status'),
    aiGenerated: z.boolean().optional().describe('Filter AI-generated sections'),
    page: z.number().min(1).default(1).describe('Page number'),
    size: z.number().min(1).max(100).default(10).describe('Page size'),
    sortBy: z.enum(['title', 'order', 'createdAt']).default('order'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  });
};

export type FiltersSectionMCP = z.infer<ReturnType<typeof sectionCoureFilterMCPFiltersSchema>>;
export type SectionCourseMCP = z.infer<ReturnType<typeof sectionCourseMCPSchema>>;
