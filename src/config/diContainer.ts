import type { PrismaClient } from '@prisma/client/default.js';
import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import {
  type AISpecsLessonRepository,
  AISpecsLessonRepositoryPostgreSQL,
  type AssignmentsLessonRepository,
  AssignmentsLessonRepositoryPostgreSQL,
  type AttemptsQuizzRepository,
  AttemptsQuizzRepositoryPostgreSQL,
  type CategoriesRepository,
  CategoriesRepositoryPostgreSQL,
  type CoursesRepository,
  CoursesRepositoryPostgreSQL,
  type FavoriteCoursesRepository,
  FavoriteCoursesRepositoryPostgreSQL,
  type ForumMessagesRepository,
  ForumMessagesRepositoryPostgreSQL,
  type ForumsRepository,
  ForumsRepositoryPostgreSQL,
  type InscriptionsCourseRepository,
  InscriptionsCourseRepositoryPostgreSQL,
  type LessonContentsRepository,
  LessonContentsRepositoryPostgreSQL,
  type LessonsRepository,
  LessonsRepositoryPostgreSQL,
  type OptionsQuizzRepository,
  OptionsQuizzRepositoryPostgreSQL,
  type ProgressContentRepository,
  ProgressContentRepositoryPostgreSQL,
  type QuestionsQuizzRepository,
  QuestionsQuizzRepositoryPostgreSQL,
  type QuizzesSectionRepository,
  QuizzesSectionRepositoryPostgreSQL,
  type ResourcesRepository,
  ResourcesRepositoryPostgreSQL,
  type SectionsRepository,
  SectionsRepositoryPostgreSQL,
  type SubmissionsRepository,
  SubmissionsRepositoryPostgreSQL,
  type TagsCourseRepository,
  TagsCourseRepositoryPostgreSQL,
} from '../app/repositories/index.js';
import {
  type AISpecsService,
  AISpecsServiceImpl,
  type AssignmentService,
  AssignmentServiceImpl,
  type AttemptService,
  AttemptServiceImpl,
  type CategoryService,
  CategoryServiceImpl,
  type CourseService,
  CourseServiceImpl,
  type FavoriteService,
  FavoriteServiceImpl,
  type ForumMessageService,
  ForumMessageServiceImpl,
  type ForumService,
  ForumServiceImpl,
  type InscriptionService,
  InscriptionServiceImpl,
  type LessonContentService,
  LessonContentServiceImpl,
  type LessonService,
  LessonServiceImpl,
  type ProgressService,
  ProgressServiceImpl,
  type QuizService,
  QuizServiceImpl,
  type ResourceService,
  ResourceServiceImpl,
  type SectionService,
  SectionServiceImpl,
  type SubmissionService,
  SubmissionServiceImpl,
  type TagService,
  TagServiceImpl,
} from '../app/services/index.js';
import {
  AISpecsController,
  AssignmentsController,
  CategoriesController,
  CoursesController,
  LessonsController,
  QuizzesController,
  ResourcesController,
  SectionsController,
  TagsController,
} from '../controllers/index.js';
import { registerAllTools, SophiaMcpServer } from '../mcp/index.js';
import { logger } from '../utils/logger.js';
import prisma from './db.js';

interface DIContainer {
  logger: typeof logger;
  prismaClient: PrismaClient;
  aiSpecsLessonRepository: AISpecsLessonRepository;
  assignmentsLessonRepository: AssignmentsLessonRepository;
  attemptsQuizzRepository: AttemptsQuizzRepository;
  categoriesRepository: CategoriesRepository;
  coursesRepository: CoursesRepository;
  favoriteCoursesRepository: FavoriteCoursesRepository;
  forumsRepository: ForumsRepository;
  forumMessagesRepository: ForumMessagesRepository;
  inscriptionsCourseRepository: InscriptionsCourseRepository;
  lessonContentsRepository: LessonContentsRepository;
  lessonsRepository: LessonsRepository;
  optionsQuizzRepository: OptionsQuizzRepository;
  progressContentRepository: ProgressContentRepository;
  questionsQuizzRepository: QuestionsQuizzRepository;
  quizzesSectionRepository: QuizzesSectionRepository;
  resourcesRepository: ResourcesRepository;
  sectionsRepository: SectionsRepository;
  submissionsRepository: SubmissionsRepository;
  tagsCourseRepository: TagsCourseRepository;
  coursesController: CoursesController;
  lessonsController: LessonsController;
  quizzesController: QuizzesController;
  assignmentsController: AssignmentsController;
  sectionsController: SectionsController;
  resourcesController: ResourcesController;
  tagsController: TagsController;
  categoriesController: CategoriesController;
  aiSpecsController: AISpecsController;
  courseService: CourseService;
  inscriptionService: InscriptionService;
  favoriteService: FavoriteService;
  forumService: ForumService;
  forumMessageService: ForumMessageService;
  lessonContentService: LessonContentService;
  lessonService: LessonService;
  progressService: ProgressService;
  aISpecsService: AISpecsService;
  quizService: QuizService;
  attemptService: AttemptService;
  assignmentService: AssignmentService;
  submissionService: SubmissionService;
  sectionService: SectionService;
  resourceService: ResourceService;
  tagService: TagService;
  categoryService: CategoryService;
  mcpServer: SophiaMcpServer;
}

const container = createContainer<DIContainer>({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  logger: asValue(logger),
  prismaClient: asValue(prisma),

  // Repositories

  aiSpecsLessonRepository: asClass(AISpecsLessonRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  assignmentsLessonRepository: asClass(AssignmentsLessonRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  attemptsQuizzRepository: asClass(AttemptsQuizzRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  categoriesRepository: asClass(CategoriesRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  coursesRepository: asClass(CoursesRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  favoriteCoursesRepository: asClass(FavoriteCoursesRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  forumsRepository: asClass(ForumsRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  forumMessagesRepository: asClass(ForumMessagesRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  inscriptionsCourseRepository: asClass(InscriptionsCourseRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  lessonContentsRepository: asClass(LessonContentsRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  lessonsRepository: asClass(LessonsRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  optionsQuizzRepository: asClass(OptionsQuizzRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  progressContentRepository: asClass(ProgressContentRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  questionsQuizzRepository: asClass(QuestionsQuizzRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  quizzesSectionRepository: asClass(QuizzesSectionRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  resourcesRepository: asClass(ResourcesRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  sectionsRepository: asClass(SectionsRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  submissionsRepository: asClass(SubmissionsRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),
  tagsCourseRepository: asClass(TagsCourseRepositoryPostgreSQL, {
    lifetime: 'SINGLETON',
  }),

  // Controllers

  coursesController: asClass(CoursesController, {
    lifetime: 'SINGLETON',
  }),
  lessonsController: asClass(LessonsController, {
    lifetime: 'SINGLETON',
  }),
  quizzesController: asClass(QuizzesController, {
    lifetime: 'SINGLETON',
  }),
  assignmentsController: asClass(AssignmentsController, {
    lifetime: 'SINGLETON',
  }),
  sectionsController: asClass(SectionsController, {
    lifetime: 'SINGLETON',
  }),
  resourcesController: asClass(ResourcesController, {
    lifetime: 'SINGLETON',
  }),
  tagsController: asClass(TagsController, {
    lifetime: 'SINGLETON',
  }),
  categoriesController: asClass(CategoriesController, {
    lifetime: 'SINGLETON',
  }),
  aiSpecsController: asClass(AISpecsController, {
    lifetime: 'SINGLETON',
  }),

  // Services

  courseService: asClass(CourseServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  inscriptionService: asClass(InscriptionServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  favoriteService: asClass(FavoriteServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  forumService: asClass(ForumServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  forumMessageService: asClass(ForumMessageServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  lessonContentService: asClass(LessonContentServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  lessonService: asClass(LessonServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  progressService: asClass(ProgressServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  aISpecsService: asClass(AISpecsServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  quizService: asClass(QuizServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  attemptService: asClass(AttemptServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  assignmentService: asClass(AssignmentServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  submissionService: asClass(SubmissionServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  sectionService: asClass(SectionServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  resourceService: asClass(ResourceServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  tagService: asClass(TagServiceImpl, {
    lifetime: 'SINGLETON',
  }),
  categoryService: asClass(CategoryServiceImpl, {
    lifetime: 'SINGLETON',
  }),
});

// Register MCP Server
const mcpServer = new SophiaMcpServer(
  container.resolve('courseService'),
  container.resolve('sectionService'),
  container.resolve('lessonService'),
  container.resolve('lessonContentService'),
  container.resolve('quizService'),
  container.resolve('assignmentService')
);

// Register all MCP tools
registerAllTools(mcpServer);

// Register MCP server in container
container.register({
  mcpServer: asValue(mcpServer),
});

export default container;
