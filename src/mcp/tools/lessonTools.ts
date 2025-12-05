import type {
  DIFFICULTY_LEVEL,
  LEARNING_TECHNIQUE,
  LESSON_CONTENT_TYPE,
  LESSON_TYPE,
} from '../../schemas/types_db.js';
import {
  type ApiResponse,
  apiResponseSchema,
  type FiltersLesson,
  type FiltersLessonContent,
  type FiltersLessonContentMCP,
  type FiltersLessonMCP,
  type LessonContentMCP,
  type LessonMCP,
  lessonContentInMCPSchema,
  lessonContentMCPFiltersSchema,
  lessonsInMCPSchema,
  lessonsMCPFiltersSchema,
  type SORT_LESSON,
  type SORT_LESSON_CONTENT,
  type SortingLessonContent,
  type SortingLessons,
} from '../../utils/index.js';
import type { SophiaMcpServer } from '../mcpServer.js';

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
      inputSchema: lessonsInMCPSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args: LessonMCP) => {
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
            generationTaskId: args.generationTaskId || null,
          },
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
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
      inputSchema: lessonsMCPFiltersSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args: FiltersLessonMCP) => {
      try {
        const filters: FiltersLesson = {
          sectionId: args.sectionId,
          title: args.title || null,
          lessonType: (args.lessonType as LESSON_TYPE) || null,
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

        const sortOrder: 'asc' | 'desc' = args.sortOrder;
        const sort: SortingLessons = {
          sortFields: [args.sortBy as SORT_LESSON],
          sortDirection: sortOrder,
          page: args.page,
          size: args.size,
        };
        const result: ApiResponse<unknown> = await lessonService.getSectionLessons(
          filters,
          sort,
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
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
      inputSchema: lessonContentInMCPSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args: LessonContentMCP) => {
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
            parentContentId: args.parentContentId || null,
          },
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
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
      inputSchema: lessonContentMCPFiltersSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args: FiltersLessonContentMCP) => {
      try {
        const filters: FiltersLessonContent = {
          lessonId: args.lessonId,
          contentType: (args.contentType as LESSON_CONTENT_TYPE) || null,
          difficultyLevel: (args.difficultyLevel as DIFFICULTY_LEVEL) || null,
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

        const sortOrder: 'asc' | 'desc' = args.sortOrder;
        const sort: SortingLessonContent = {
          sortDirection: sortOrder,
          page: args.page,
          size: args.size,
          sortFields: [args.sortBy as SORT_LESSON_CONTENT],
        };
        const result: ApiResponse<unknown> = await lessonContentService.getLessonContents(
          filters,
          sort,
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    }
  );
}
