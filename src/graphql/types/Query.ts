import { queryType } from '@nexus/schema';

import { OkService } from '../../services/OkService';
import { UserService } from '../../services/UserService';

import { User } from './User';

export const Query = queryType({
  definition(t): void {
    t.boolean('ok', {
      resolve: (parent, args, ctx) => {
        const okService = new OkService(ctx);
        return okService.ok();
      },
    });

    t.field('me', {
      type: User,
      resolve: (parent, args, ctx) => {
        const userService = new UserService(ctx);
        return userService.me();
      },
    });
  },
});
