import * as faker from 'faker';

import { createTestContext, TestContext } from './__helpers__/context';
import { ME, REGISTER } from './graphql';

const ctx: TestContext = createTestContext();

describe('me', () => {
  it('should query the logged in user profile', async () => {
    const userData = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await ctx.server.graphql(REGISTER, userData);

    const { data } = await ctx.server.graphql(ME);

    expect(data.me.email).toEqual(userData.email);
  });

  it('should not query me without being logged in', async () => {
    const got = await ctx.server.graphql(ME);
    expect(got.errors.length).not.toBe(0);
  });
});
