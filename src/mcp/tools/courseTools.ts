import { z } from 'zod';
import type { COURSE_LEVEL, COURSE_STATUS } from '../../schemas/types_db.js';
import {
  apiResponseSchema,
  type CourseMCP,
  coursesInMCPSchema,
  coursesMCPFiltersSchema,
  type FiltersCourse,
  type FiltersCourseMCP,
  type SORT_COURSES,
  type SortingCourses,
} from '../../utils/index.js';
import type { ApiResponse } from '../../utils/response/index.js';
import type { SophiaMcpServer } from '../mcpServer.js';

/**
 * Register course-related MCP tools
 */
export function registerCourseTools(sophiaServer: SophiaMcpServer) {
  const mcpServer = sophiaServer.getServer();
  const { courseService } = sophiaServer.getServices();

  // Create Course Tool
  mcpServer.registerTool(
    'create_course',
    {
      title: 'Create Course',
      description: 'Create a new course in the SOPHIA platform',
      inputSchema: coursesInMCPSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args: CourseMCP) => {
      try {
        const lastAIUpdateAt = args.lastAIUpdateAt ? new Date(args.lastAIUpdateAt) : null;

        const result = await courseService.postCourse(
          {
            instructorId: args.instructorId,
            title: args.title,
            description: args.description,
            price: args.price,
            level: args.level as COURSE_LEVEL,
            aiGenerated: args.aiGenerated,
            generationTaskId: args.generationTaskId || null,
            generationMetadata: args.generationMetadata || null,
            lastAIUpdateAt,
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

  // List Courses Tool
  mcpServer.registerTool(
    'list_courses',
    {
      title: 'List Courses',
      description: 'List courses with optional filtering and sorting',
      inputSchema: coursesMCPFiltersSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args: FiltersCourseMCP) => {
      try {
        const filters: FiltersCourse = {
          title: args.title || null,
          instructorId: args.instructorId || null,
          level: (args.level as COURSE_LEVEL) || null,
          status: (args.status as COURSE_STATUS) || null,
          priceMin: args.priceMin ?? null,
          priceMax: args.priceMax ?? null,
          active: args.active ?? null,
          aiGenerated: args.aiGenerated ?? null,
          generationTaskId: null,
          createdAtStart: null,
          createdAtEnd: null,
          updatedAtStart: null,
          updatedAtEnd: null,
          publishedAtStart: null,
          publishedAtEnd: null,
          lastAIUpdateAtStart: null,
          lastAIUpdateAtEnd: null,
          averageReviewsMin: null,
          averageReviewsMax: null,
          durationHoursMin: null,
          durationHoursMax: null,
          totalLessonsMin: null,
          totalLessonsMax: null,
          totalReviewsMin: null,
          totalReviewsMax: null,
          totalEnrollmentsMin: null,
          totalEnrollmentsMax: null,
        };

        const sortOrder: 'asc' | 'desc' = args.sortOrder;
        const sort: SortingCourses = {
          sortFields: [args.sortBy as SORT_COURSES],
          sortDirection: sortOrder,
          page: args.page,
          size: args.size,
        };
        const result: ApiResponse<unknown> = await courseService.getCourses(filters, sort, true);

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

  // Get Course By ID Tool
  mcpServer.registerTool(
    'get_course_by_id',
    {
      title: 'Get Course By ID',
      description: 'Get detailed information about a specific course',
      inputSchema: {
        courseId: z.string().min(1).describe('Course ID'),
        includeFullDetails: z.boolean().default(false).describe('Include full details'),
      },
      outputSchema: apiResponseSchema,
    },
    async (args: { courseId: string; includeFullDetails?: boolean }) => {
      try {
        const result = await courseService.getCourseById(args.courseId, !args.includeFullDetails);

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
