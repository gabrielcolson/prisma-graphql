import { queryType } from '@nexus/schema';

import { OkService } from '../../services/OkService';

export const Query = queryType({
  definition(t): void {
    t.boolean('ok', {
      resolve: (parent, args, ctx) => {
        const okService = new OkService(ctx);
        return okService.ok();
      },
    });
  },
});
