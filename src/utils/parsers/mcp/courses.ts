import { z } from 'zod';

export const coursesMCPFiltersSchema = () => {
  return z.object({
    title: z.string().optional().describe('Filter by title'),
    instructorId: z.string().optional().describe('Filter by instructor ID'),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
    status: z.enum(['DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
    priceMin: z.number().optional(),
    priceMax: z.number().optional(),
    active: z.boolean().optional(),
    aiGenerated: z.boolean().optional(),
    page: z.number().min(1).default(1),
    size: z.number().min(1).max(100).default(10),
    sortBy: z.enum(['title', 'price', 'createdAt', 'updatedAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  });
};

export const coursesInMCPSchema = () => {
  return z.object({
    instructorId: z.string().min(1).max(200).nullable().describe('ID of the instructor, or null'),
    title: z.string().min(1).max(500).describe('Course title'),
    description: z.string().min(1).max(5000).describe('Detailed course description'),
    price: z.number().min(0).describe('Course price'),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).describe('Difficulty level'),
    aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
    generationTaskId: z.string().min(1).max(200).nullable().optional().describe('AI task ID'),
    generationMetadata: z.any().optional().describe('AI metadata'),
    lastAIUpdateAt: z.iso.datetime().nullable().optional().describe('Last AI update datetime'),
  });
};

export type CourseMCP = z.infer<ReturnType<typeof coursesInMCPSchema>>;
export type FiltersCourseMCP = z.infer<ReturnType<typeof coursesMCPFiltersSchema>>;
