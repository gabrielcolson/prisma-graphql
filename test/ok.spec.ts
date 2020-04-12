import { createTestContext } from './__helpers__/context';
import { OK } from './graphql';

const ctx = createTestContext();

describe('ok query', () => {
  it('should be ok', async () => {
    const { data: { ok } } = await ctx.server.graphql(OK);
    expect(ok).toEqual(true);
  });
});
