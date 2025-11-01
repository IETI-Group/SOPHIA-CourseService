import { asValue, createContainer, InjectionMode } from 'awilix';

import { logger } from '../utils/logger.js';

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  logger: asValue(logger),
});

export default container;
