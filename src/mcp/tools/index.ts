import type { SophiaMcpServer } from '../mcpServer.js';
import { registerCourseTools } from './courseTools.js';
import { registerSectionTools } from './sectionTools.js';
import { registerLessonTools } from './lessonTools.js';

/**
 * Register all MCP tools for the SOPHIA Course Service
 */
export function registerAllTools(sophiaServer: SophiaMcpServer) {
  registerCourseTools(sophiaServer);
  registerSectionTools(sophiaServer);
  registerLessonTools(sophiaServer);
}
