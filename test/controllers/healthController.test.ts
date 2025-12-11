import type { Request, Response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getHealth } from '../../src/controllers/healthController.js';

describe('Health Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: ReturnType<typeof vi.fn>;
  let statusMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {
      ip: '127.0.0.1',
      get: vi.fn().mockReturnValue('test-user-agent'),
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('getHealth', () => {
    it('Should return health status with 200', () => {
      getHealth(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'SOPHIA Course Service is running successfully',
          service: 'sophia-course-service',
          version: '1.0.0',
        })
      );
    });

    it('Should handle errors and return 500', () => {
      // Mock statusMock to throw an error
      statusMock.mockImplementationOnce(() => {
        throw new Error('Internal server error');
      });

      getHealth(mockRequest as Request, mockResponse as Response);

      // Since the error is caught, jsonMock should be called with error response
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Health check failed',
        })
      );
    });
  });
});
