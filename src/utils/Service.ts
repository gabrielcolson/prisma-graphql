import { PrismaClient } from '@prisma/client';

export interface ServiceContext {
  db: PrismaClient;
}

export class Service {
  protected db: PrismaClient;

  constructor(ctx: ServiceContext) {
    this.db = ctx.db;
  }
}
