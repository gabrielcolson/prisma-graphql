import * as path from 'path';

import { makeSchema } from '@nexus/schema';
import { nexusPrismaPlugin } from 'nexus-prisma';

import * as types from './types';

export const schema = makeSchema({
  types,
  plugins: [nexusPrismaPlugin({ prismaClient: (ctx) => ctx.db })],
  outputs: {
    schema: path.join(__dirname, '..', '..', 'schema.graphql'),
    typegen: path.join(__dirname, 'generated', 'nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
