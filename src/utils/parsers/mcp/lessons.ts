import { z } from 'zod';

export const lessonsInMCPSchema = () => {
  return z.object({
    sectionId: z.string().min(1).max(200).describe('ID of the parent section'),
    title: z.string().min(1).max(500).describe('Lesson title'),
    description: z.string().min(1).max(5000).describe('Lesson description'),
    order: z.number().min(0).describe('Order position within the section'),
    durationMinutes: z.number().min(0).describe('Estimated duration in minutes'),
    lessonType: z
      .enum(['THEORY', 'PRACTICE', 'MIXED', 'PROJECT', 'CASE_STUDY', 'DISCUSSION'])
      .describe('Type of lesson'),
    estimatedDifficulty: z.number().min(0).describe('Estimated difficulty (0-10)'),
    aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
    generationTaskId: z.string().min(1).max(200).nullable().optional().describe('AI task ID'),
  });
};

export const lessonsMCPFiltersSchema = () => {
  return z.object({
    sectionId: z.string().describe('Filter by section ID'),
    title: z.string().optional().describe('Filter by title'),
    lessonType: z
      .enum(['THEORY', 'PRACTICE', 'MIXED', 'PROJECT', 'CASE_STUDY', 'DISCUSSION'])
      .optional(),
    active: z.boolean().optional().describe('Filter by active status'),
    aiGenerated: z.boolean().optional().describe('Filter AI-generated lessons'),
    page: z.number().min(1).default(1),
    size: z.number().min(1).max(100).default(10),
    sortBy: z.enum(['title', 'order', 'createdAt']).default('order'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  });
};

export const lessonContentInMCPSchema = () => {
  return z.object({
    lessonId: z.string().min(1).max(200).describe('ID of the parent lesson'),
    contentType: z
      .enum([
        'TEXT',
        'VIDEO_SCRIPT',
        'SLIDES',
        'INTERACTIVE',
        'CODE_EXAMPLE',
        'QUIZ',
        'EXERCISE',
        'READING',
        'AUDIO_SCRIPT',
      ])
      .describe('Type of content'),
    metadata: z.any().describe('Content-specific metadata (depends on contentType)'),
    difficultyLevel: z
      .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
      .describe('Difficulty level'),
    learningTechnique: z
      .enum(['VISUAL', 'AUDITORY', 'KINESTHETIC', 'READING_WRITING', 'MULTIMODAL'])
      .describe('Learning technique'),
    orderPreference: z
      .number()
      .min(0)
      .nullable()
      .optional()
      .describe('Preferred order (null for default)'),
    aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
    generationLogId: z.string().min(1).max(200).nullable().optional().describe('Generation log ID'),
    parentContentId: z
      .string()
      .min(1)
      .max(200)
      .nullable()
      .optional()
      .describe('Parent content ID for versioning'),
  });
};

export const lessonContentMCPFiltersSchema = () => {
  return z.object({
    lessonId: z.string().describe('Filter by lesson ID'),
    contentType: z
      .enum([
        'TEXT',
        'VIDEO_SCRIPT',
        'SLIDES',
        'INTERACTIVE',
        'CODE_EXAMPLE',
        'QUIZ',
        'EXERCISE',
        'READING',
        'AUDIO_SCRIPT',
      ])
      .optional(),
    difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
    active: z.boolean().optional().describe('Filter by active status'),
    aiGenerated: z.boolean().optional().describe('Filter AI-generated content'),
    isCurrentVersion: z.boolean().optional().describe('Filter current versions only'),
    page: z.number().min(1).default(1),
    size: z.number().min(1).max(100).default(10),
    sortBy: z.enum(['orderPreference', 'createdAt', 'version']).default('orderPreference'),
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  });
};
