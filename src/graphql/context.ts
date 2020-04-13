import { PrismaClient } from '@prisma/client';

import { SessionManager } from '../SessionManager';

export interface Context {
  db: PrismaClient;
  session: SessionManager;
}
