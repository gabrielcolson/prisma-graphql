import { queryType } from '@nexus/schema';

export const Query = queryType({
  definition(t): void {
    t.crud.user();
    t.crud.users({ filtering: true, ordering: true });

    t.crud.post();
    t.crud.posts({ filtering: true, ordering: true });
  },
});
