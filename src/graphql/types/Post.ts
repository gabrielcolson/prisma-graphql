import { objectType } from '@nexus/schema';

export const Post = objectType({
  name: 'Post',
  definition(t): void {
    t.model.id();
    t.model.title();
    t.model.slug();
    t.model.content();
    t.model.author();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
