import { asValue, createContainer, InjectionMode } from 'awilix';

import { logger } from '../utils/logger.js';
import prisma from './db.js';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  logger: asValue(logger),
  prisma: asValue(prisma),
});

export default container;
