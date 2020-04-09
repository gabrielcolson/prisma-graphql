import { Post } from '@prisma/client';

import { ForbiddenError } from '../utils/errors';
import { Service } from '../utils/Service';

export class PostService extends Service {
  async create({ title, content, authorId }: CreatePost): Promise<Post> {
    const user = await this.db.user.findOne({ where: { id: authorId } });
    if (!user) {
      throw new ForbiddenError('author does not exist');
    }

    return this.db.post.create({
      data: {
        title,
        content,
        slug: encodeURIComponent(title),
        author: { connect: { id: user.id } },
      },
    });
  }
}

export interface CreatePost {
  title: string;
  content: string;
  authorId: string;
}
