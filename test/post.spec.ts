import faker from 'faker';

import { createTestContext } from './__helpers__/context';
import { CREATE_POST, CREATE_USER } from './graphql';

const ctx = createTestContext();

describe('create post', () => {
  it('should not create a post with invalid user', async () => {
    const postData = { title: 'A super Post !', content: faker.lorem.paragraph(), authorId: 'xx' };
    const postRes = await ctx.server.graphql(CREATE_POST, postData);

    expect(postRes.errors.length).not.toBe(0);
    expect(postRes?.errors[0].extensions.code).toEqual('FORBIDDEN');
  });

  it('should create a post', async () => {
    const userData = { email: faker.internet.email(), username: faker.internet.userName() };
    const userRes = await ctx.server.graphql(CREATE_USER, userData);
    const user = userRes.data.createOneUser;

    const postData = { title: 'A super Post !', content: faker.lorem.paragraph(), authorId: user.id };
    const postRes = await ctx.server.graphql(CREATE_POST, postData);
    const post = postRes.data.createOnePost;

    expect(post).not.toBeNull();
    expect(post.slug).toEqual('a-super-post-!');
  });
});
