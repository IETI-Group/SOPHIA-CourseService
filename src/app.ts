import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import container from './config/diContainer.js';
import { envConfig } from './config/env.config.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import { logger } from './utils/logger.js';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandling();
  }

  private config(): void {
    // Middlewares de seguridad
    this.app.use(helmet());

    // CORS
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
        // Expose MCP session header for browser clients
        exposedHeaders: ['Mcp-Session-Id'],
        allowedHeaders: ['Content-Type', 'mcp-session-id'],
      })
    );

    // Logging HTTP requests
    if (process.env.NODE_ENV !== 'test') {
      this.app.use(
        morgan('combined', {
          stream: {
            write: (message: string) => {
              logger.info(message.trim());
            },
          },
        })
      );
    }

    // Body parsing middleware
    this.app.use(express.json({ limit: '100mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Configurar trust proxy si está detrás de un proxy/load balancer
    this.app.set('trust proxy', 1);
  }

  private routes(): void {
    // MCP endpoint (stateless mode)
    this.app.post('/mcp', async (req, res) => {
      try {
        // Create a new transport for each request to prevent request ID collisions
        const transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
          enableJsonResponse: true,
        });

        res.on('close', () => {
          transport.close();
        });

        // Get MCP server from DI container and connect
        const mcpServerInstance = container.resolve('mcpServer');
        await mcpServerInstance.getServer().connect(transport);
        await transport.handleRequest(req, res, req.body);
      } catch (error) {
        logger.error('Error handling MCP request:', error);
        if (!res.headersSent) {
          res.status(500).json({
            jsonrpc: '2.0',
            error: {
              code: -32603,
              message: 'Internal server error',
            },
            id: null,
          });
        }
      }
    });

    // Handle GET requests - return 405 (no session management support)
    this.app.get('/mcp', (_req, res) => {
      res.status(405).end();
    });

    // API routes
    this.app.use(envConfig.api.basePath, routes);

    // Root endpoint
    this.app.get('/', (_req, res) => {
      res.json({
        success: true,
        message: 'Welcome to SOPHIA Course Service API',
        version: envConfig.api.versionNumber,
        endpoints: {
          health: `${envConfig.api.basePath}/health`,
          mcp: '/mcp',
        },
        documentation: `${envConfig.api.basePath}/docs`, // Para futuro con swagger
        timestamp: new Date().toISOString(),
      });
    });
  }

  private errorHandling(): void {
    // 404 handler
    this.app.use(notFound);

    // Error handler
    this.app.use(errorHandler);
  }
}

export default new App().app;
