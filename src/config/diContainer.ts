import type { PrismaClient } from '@prisma/client/default.js';
import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import type {
  AISpecsLessonRepository,
  AssignmentsLessonRepository,
  AttemptsQuizzRepository,
  CategoriesRepository,
  CoursesRepository,
  FavoriteCoursesRepository,
  InscriptionsCourseRepository,
  LessonContentsRepository,
  LessonsRepository,
  OptionsQuizzRepository,
  ProgressContentRepository,
  QuestionsQuizzRepository,
  QuizzesSectionRepository,
  ResourcesRepository,
  SectionsRepository,
  SubmissionsRepository,
  TagsCourseRepository,
} from '../app/repositories/index.js';
import { AISpecsLessonRepositoryPostgreSQL } from '../app/repositories/postgresql/AISpecsLessonRepositoryPostgreSQL.js';
import { AssignmentsLessonRepositoryPostgreSQL } from '../app/repositories/postgresql/AssignmentsLessonRepositoryPostgreSQL.js';
import { AttemptsQuizzRepositoryPostgreSQL } from '../app/repositories/postgresql/AttemptsQuizzRepositoryPostgreSQL.js';
import { CategoriesRepositoryPostgreSQL } from '../app/repositories/postgresql/CategoriesRepositoryPostgreSQL.js';
import { CoursesRepositoryPostgreSQL } from '../app/repositories/postgresql/CoursesRepositoryPostgreSQL.js';
import { FavoriteCoursesRepositoryPostgreSQL } from '../app/repositories/postgresql/FavoriteCoursesRepositoryPostgreSQL.js';
import { InscriptionsCourseRepositoryPostgreSQL } from '../app/repositories/postgresql/InscriptionsCourseRepositoryPostgreSQL.js';
import { LessonContentsRepositoryPostgreSQL } from '../app/repositories/postgresql/LessonContentsRepositoryPostgreSQL.js';
import { LessonsRepositoryPostgreSQL } from '../app/repositories/postgresql/LessonsRepositoryPostgreSQL.js';
import { OptionsQuizzRepositoryPostgreSQL } from '../app/repositories/postgresql/OptionsQuizzRepositoryPostgreSQL.js';
import { ProgressContentRepositoryPostgreSQL } from '../app/repositories/postgresql/ProgressContentRepositoryPostgreSQL.js';
import { QuestionsQuizzRepositoryPostgreSQL } from '../app/repositories/postgresql/QuestionsQuizzRepositoryPostgreSQL.js';
import { QuizzesSectionRepositoryPostgreSQL } from '../app/repositories/postgresql/QuizzesSectionRepositoryPostgreSQL.js';
import { ResourcesRepositoryPostgreSQL } from '../app/repositories/postgresql/ResourcesRepositoryPostgreSQL.js';
import { SectionsRepositoryPostgreSQL } from '../app/repositories/postgresql/SectionsRepositoryPostgreSQL.js';
import { SubmissionsRepositoryPostgreSQL } from '../app/repositories/postgresql/SubmissionsRepositoryPostgreSQL.js';
import { TagsCourseRepositoryPostgreSQL } from '../app/repositories/postgresql/TagsCourseRepositoryPostgreSQL.js';
import { logger } from '../utils/logger.js';
import prisma from './db.js';

interface DIContainer {
  logger: typeof logger;
  prisma: PrismaClient;
  aiSpecsLessonRepository: AISpecsLessonRepository;
  assignmentsLessonRepository: AssignmentsLessonRepository;
  attemptsQuizzRepository: AttemptsQuizzRepository;
  categoriesRepository: CategoriesRepository;
  coursesRepository: CoursesRepository;
  favoriteCoursesRepository: FavoriteCoursesRepository;
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
}

const container = createContainer<DIContainer>({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  logger: asValue(logger),
  prisma: asValue(prisma),

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
});

export default container;
