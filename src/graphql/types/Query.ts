import { queryType, stringArg } from '@nexus/schema';

import { HelloService } from '../../services/HelloService';

export const Query = queryType({
  definition(t): void {
    t.string('hello', {
      args: {
        name: stringArg({ required: true }),
      },
      resolve: (parent, args, ctx) => {
        const helloService = new HelloService(ctx);
        return helloService.sayHello(args);
      },
    });
  },
});
