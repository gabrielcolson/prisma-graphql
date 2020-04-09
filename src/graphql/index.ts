import { PrismaClient } from '@prisma/client';
import { ApolloServer, AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { Router } from 'express';

import * as errors from '../utils/errors';

import { Context } from './context';
import { schema } from './schema';

function formatError(err: GraphQLError): Error {
  const { originalError } = err;
  if (originalError instanceof errors.CustomError && originalError.error) {
    // eslint-disable-next-line no-console
    console.log(originalError.error);
  }

  if (originalError instanceof errors.AuthenticationError) {
    return new AuthenticationError(originalError.message);
  }
  if (originalError instanceof errors.ForbiddenError) {
    return new ForbiddenError(originalError.message);
  }

  // eslint-disable-next-line no-console
  console.error(originalError);
  return new Error('Internal server error');
}

export function getGraphqlMiddleware(db: PrismaClient): Router {
  const apolloServer = new ApolloServer({
    schema,
    context: (): Context => ({
      db,
    }),
    formatError,
  });

  return apolloServer.getMiddleware();
}
