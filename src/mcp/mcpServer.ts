import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { CourseService } from '../app/services/interfaces/CourseService.js';
import type { SectionService } from '../app/services/interfaces/SectionService.js';
import type { LessonService } from '../app/services/interfaces/LessonService.js';
import type { LessonContentService } from '../app/services/interfaces/LessonContentService.js';
import type { QuizService } from '../app/services/interfaces/QuizService.js';
import type { AssignmentService } from '../app/services/interfaces/AssignmentService.js';

/**
 * SOPHIA Course Service MCP Server
 * 
 * Exposes course creation and management capabilities through the Model Context Protocol.
 * This allows AI assistants to interact with the course service to:
 * - Create and manage courses
 * - Create and manage sections (modules)
 * - Create and manage lessons and lesson content
 * - Create quizzes and assignments
 */
export class SophiaMcpServer {
  private mcpServer: McpServer;

  constructor(
    private courseService: CourseService,
    private sectionService: SectionService,
    private lessonService: LessonService,
    private lessonContentService: LessonContentService,
    private quizService: QuizService,
    private assignmentService: AssignmentService
  ) {
    this.mcpServer = new McpServer({
      name: 'sophia-course-service',
      version: '1.0.0',
    });
  }

  /**
   * Get the underlying McpServer instance
   */
  getServer(): McpServer {
    return this.mcpServer;
  }

  /**
   * Get injected services for use in tool handlers
   */
  getServices() {
    return {
      courseService: this.courseService,
      sectionService: this.sectionService,
      lessonService: this.lessonService,
      lessonContentService: this.lessonContentService,
      quizService: this.quizService,
      assignmentService: this.assignmentService,
    };
  }
}
