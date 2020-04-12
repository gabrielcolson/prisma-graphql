import { idArg, mutationType, stringArg } from '@nexus/schema';

import { PostService } from '../../services/PostService';
import { UserService } from '../../services/UserService';

import { Post } from './Post';
import { User } from './User';

export const Mutation = mutationType({
  definition(t): void {
    t.field('createOneUser', {
      type: User,
      args: {
        username: stringArg({ required: true }),
        email: stringArg({ required: true }),
      },
      resolve: (parent, args, ctx) => {
        const userService = new UserService(ctx);
        return userService.create(args);
      },
    });

    t.field('createOnePost', {
      type: Post,
      args: {
        title: stringArg({ required: true }),
        content: stringArg({ required: true }),
        authorId: idArg({ required: true }),
      },
      resolve: (parent, args, ctx) => {
        const postService = new PostService(ctx);
        return postService.create(args);
      },
    });
  },
});
