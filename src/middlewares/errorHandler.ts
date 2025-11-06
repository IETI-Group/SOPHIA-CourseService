import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const message = err instanceof Error ? err.message : 'Unknown error';

  logger.error({
    message,
    stack: err instanceof Error ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Validation error',
      issues: err.issues,
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : message,
  });
};

export const notFound = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({
    success: false,
    error: `Not found - ${req.originalUrl}`,
  });
};
