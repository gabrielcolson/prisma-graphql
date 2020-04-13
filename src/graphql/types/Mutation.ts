import { mutationType, stringArg } from '@nexus/schema';

import { AuthService } from '../../services/AuthService';

import { User } from './User';

export const Mutation = mutationType({
  definition(t): void {
    t.field('register', {
      type: User,
      args: {
        username: stringArg({ required: true }),
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: (parent, args, ctx) => {
        const authService = new AuthService(ctx);
        return authService.register(args);
      },
    });

    t.field('login', {
      type: User,
      args: {
        email: stringArg({ required: true }),
        password: stringArg({ required: true }),
      },
      resolve: (parent, args, ctx) => {
        const authService = new AuthService(ctx);
        return authService.login(args);
      },
    });

    t.field('logout', {
      type: User,
      resolve: (parent, args, ctx) => {
        const authService = new AuthService(ctx);
        return authService.logout();
      },
    });
  },
});
