import type { SophiaMcpServer } from '../mcpServer.js';
import { z } from 'zod/v4';
import { LESSON_TYPE, DIFFICULTY_LEVEL, LEARNING_TECHNIQUE, LESSON_CONTENT_TYPE } from '../../schemas/types_db.js';
import type { PaginatedResponse } from '../../utils/response/index.js';

/**
 * Register lesson and lesson content-related MCP tools
 */
export function registerLessonTools(sophiaServer: SophiaMcpServer) {
  const mcpServer = sophiaServer.getServer();
  const { lessonService, lessonContentService } = sophiaServer.getServices();

  // Create Lesson Tool
  mcpServer.registerTool(
    'create_lesson',
    {
      title: 'Create Lesson',
      description: 'Create a new lesson within a section',
      inputSchema: {
        sectionId: z.string().min(1).max(200).describe('ID of the parent section'),
        title: z.string().min(1).max(500).describe('Lesson title'),
        description: z.string().min(1).max(5000).describe('Lesson description'),
        order: z.number().min(0).describe('Order position within the section'),
        durationMinutes: z.number().min(0).describe('Estimated duration in minutes'),
        lessonType: z.enum(['THEORY', 'PRACTICE', 'MIXED', 'PROJECT', 'CASE_STUDY', 'DISCUSSION']).describe('Type of lesson'),
        estimatedDifficulty: z.number().min(0).describe('Estimated difficulty (0-10)'),
        aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
        generationTaskId: z.string().min(1).max(200).nullable().optional().describe('AI task ID')
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.any().optional() }
    },
    async (args) => {
      try {
        const result = await lessonService.postSectionLesson(
          {
            sectionId: args.sectionId,
            title: args.title,
            description: args.description,
            order: args.order,
            durationMinutes: args.durationMinutes,
            lessonType: args.lessonType as LESSON_TYPE,
            estimatedDifficulty: args.estimatedDifficulty,
            aiGenerated: args.aiGenerated,
            generationTaskId: args.generationTaskId || null
          },
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true
        };
      }
    }
  );

  // List Lessons Tool
  mcpServer.registerTool(
    'list_lessons',
    {
      title: 'List Lessons',
      description: 'List lessons for a section with optional filtering',
      inputSchema: {
        sectionId: z.string().describe('Filter by section ID'),
        title: z.string().optional().describe('Filter by title'),
        lessonType: z.enum(['THEORY', 'PRACTICE', 'MIXED', 'PROJECT', 'CASE_STUDY', 'DISCUSSION']).optional(),
        active: z.boolean().optional().describe('Filter by active status'),
        aiGenerated: z.boolean().optional().describe('Filter AI-generated lessons'),
        page: z.number().min(1).default(1),
        size: z.number().min(1).max(100).default(10),
        sortBy: z.enum(['title', 'order', 'createdAt']).default('order'),
        sortOrder: z.enum(['asc', 'desc']).default('asc')
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.array(z.any()) }
    },
    async (args) => {
      try {
        const filters: any = {
          sectionId: args.sectionId,
          title: args.title || null,
          lessonType: args.lessonType as LESSON_TYPE || null,
          active: args.active ?? null,
          aiGenerated: args.aiGenerated ?? null,
          generationTaskId: null,
          durationMinutesMin: null,
          durationMinutesMax: null,
          orderMin: null,
          orderMax: null,
          estimatedDifficultyMin: null,
          estimatedDifficultyMax: null,
          createdAtStart: null,
          createdAtEnd: null,
        };

        const sort: Record<string, 'asc' | 'desc'> = { [args.sortBy]: args.sortOrder };
        const result = await lessonService.getSectionLessons(filters, sort, true) as PaginatedResponse<any>;

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true
        };
      }
    }
  );

  // Create Lesson Content Tool
  mcpServer.registerTool(
    'create_lesson_content',
    {
      title: 'Create Lesson Content',
      description: 'Create content for a lesson (text, video, slides, interactive, etc.)',
      inputSchema: {
        lessonId: z.string().min(1).max(200).describe('ID of the parent lesson'),
        contentType: z.enum(['TEXT', 'VIDEO_SCRIPT', 'SLIDES', 'INTERACTIVE', 'CODE_EXAMPLE', 'QUIZ', 'EXERCISE', 'READING', 'AUDIO_SCRIPT']).describe('Type of content'),
        metadata: z.any().describe('Content-specific metadata (depends on contentType)'),
        difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).describe('Difficulty level'),
        learningTechnique: z.enum(['VISUAL', 'AUDITORY', 'KINESTHETIC', 'READING_WRITING', 'MULTIMODAL']).describe('Learning technique'),
        orderPreference: z.number().min(0).nullable().optional().describe('Preferred order (null for default)'),
        aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
        generationLogId: z.string().min(1).max(200).nullable().optional().describe('Generation log ID'),
        parentContentId: z.string().min(1).max(200).nullable().optional().describe('Parent content ID for versioning')
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.any().optional() }
    },
    async (args) => {
      try {
        const result = await lessonContentService.postLessonContents(
          {
            lessonId: args.lessonId,
            contentType: args.contentType as LESSON_CONTENT_TYPE,
            metadata: args.metadata,
            difficultyLevel: args.difficultyLevel as DIFFICULTY_LEVEL,
            learningTechnique: args.learningTechnique as LEARNING_TECHNIQUE,
            orderPreference: args.orderPreference ?? null,
            aiGenerated: args.aiGenerated,
            generationLogId: args.generationLogId || null,
            parentContentId: args.parentContentId || null
          },
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true
        };
      }
    }
  );

  // List Lesson Contents Tool
  mcpServer.registerTool(
    'list_lesson_contents',
    {
      title: 'List Lesson Contents',
      description: 'List all content items for a lesson',
      inputSchema: {
        lessonId: z.string().describe('Filter by lesson ID'),
        contentType: z.enum(['TEXT', 'VIDEO_SCRIPT', 'SLIDES', 'INTERACTIVE', 'CODE_EXAMPLE', 'QUIZ', 'EXERCISE', 'READING', 'AUDIO_SCRIPT']).optional(),
        difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
        active: z.boolean().optional().describe('Filter by active status'),
        aiGenerated: z.boolean().optional().describe('Filter AI-generated content'),
        isCurrentVersion: z.boolean().optional().describe('Filter current versions only'),
        page: z.number().min(1).default(1),
        size: z.number().min(1).max(100).default(10),
        sortBy: z.enum(['orderPreference', 'createdAt', 'version']).default('orderPreference'),
        sortOrder: z.enum(['asc', 'desc']).default('asc')
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.array(z.any()) }
    },
    async (args) => {
      try {
        const filters: any = {
          lessonId: args.lessonId,
          contentType: args.contentType as LESSON_CONTENT_TYPE || null,
          difficultyLevel: args.difficultyLevel as DIFFICULTY_LEVEL || null,
          active: args.active ?? null,
          aiGenerated: args.aiGenerated ?? null,
          isCurrentVersion: args.isCurrentVersion ?? null,
          learningTechnique: null,
          orderPreferenceMin: null,
          orderPreferenceMax: null,
          generationLogId: null,
          parentContentId: null,
          versionMin: null,
          versionMax: null,
          createdAtStart: null,
          createdAtEnd: null,
        };

        const sort: Record<string, 'asc' | 'desc'> = { [args.sortBy]: args.sortOrder };
        const result = await lessonContentService.getLessonContents(filters, sort, true) as PaginatedResponse<any>;

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true
        };
      }
    }
  );
}
