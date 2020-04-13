import * as faker from 'faker';

import { createTestContext, TestContext } from './__helpers__/context';
import { LOGIN, LOGOUT, REGISTER } from './graphql';

const ctx: TestContext = createTestContext();

describe('auth', () => {
  interface UserData {
    username: string;
    email: string;
    password: string;
  }

  function generateUserData(): UserData {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  async function register(userData: UserData): Promise<{ email: string }> {
    const res = await ctx.server.graphql(REGISTER, userData);
    return res?.data?.register;
  }

  describe('register', () => {
    it('should register a user', async () => {
      const userData = generateUserData();
      const want = { email: userData.email };
      const got = await register(userData);

      expect(got).toEqual(want);
    });

    it('should not register a user twice', async () => {
      const userData = generateUserData();
      await ctx.server.graphql(REGISTER, userData);

      const got = await ctx.server.graphql(REGISTER, userData);

      expect(got.errors.length).not.toBe(0);
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const userData = generateUserData();
      await ctx.server.graphql(REGISTER, userData);
      await ctx.server.graphql(LOGOUT);

      const want = { email: userData.email };
      const { data: { login: got } } = await ctx.server.graphql(LOGIN, userData);

      expect(got).toEqual(want);
    });

    it('should not login a non existing user', async () => {
      const userData = generateUserData();

      const got = await ctx.server.graphql(LOGIN, userData);

      expect(got.errors.length).not.toBe(0);
    });

    it('should not login a user with invalid credentials', async () => {
      const userData = generateUserData();
      await ctx.server.graphql(REGISTER, userData);

      const got = await ctx.server.graphql(LOGIN, { email: userData.email, password: 'wrong password' });

      expect(got.errors.length).not.toBe(0);
    });
  });
});
