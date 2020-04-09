import http from 'http';

import { PrismaClient } from '@prisma/client';
import express from 'express';
import env from 'env-var';
import cors from 'cors';

import { getGraphqlMiddleware } from './graphql';

export interface ServerConfig {
  db?: PrismaClient;
}

class Server {
  db: PrismaClient;
  server: http.Server;

  constructor(config?: ServerConfig) {
    this.db = config?.db ?? new PrismaClient();

    const app = express();

    const ALLOWED_ORIGIN = env.get('ALLOWED_ORIGIN').required().asString();
    app.use(cors({
      credentials: true,
      origin: ALLOWED_ORIGIN,
    }));

    const graphqlMiddleware = getGraphqlMiddleware(this.db);
    app.use(graphqlMiddleware);

    this.server = http.createServer(app);
  }

  listen(port: number, cb?: () => void): http.Server {
    return this.server.listen({ port }, cb);
  }

  async stop(): Promise<void> {
    this.server.close();
    await this.db.disconnect();
  }
}

export default Server;
