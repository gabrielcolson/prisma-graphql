import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t): void {
    t.model.id();
    t.model.username();
    t.model.email();
    t.model.posts();
    t.model.updatedAt();
    t.model.createdAt();
  },
});
