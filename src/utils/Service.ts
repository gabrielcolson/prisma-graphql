import { PrismaClient } from '@prisma/client';

import { SessionManager } from '../SessionManager';

export interface ServiceContext {
  db: PrismaClient;
  session: SessionManager;
}

export class Service {
  protected db: PrismaClient;
  session: SessionManager;

  constructor(ctx: ServiceContext) {
    this.db = ctx.db;
    this.session = ctx.session;
  }
}
