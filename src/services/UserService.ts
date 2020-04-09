import { User } from '@prisma/client';

import { Service } from '../utils/Service';

export class UserService extends Service {
  create(data: {username: string; email: string }): Promise<User> {
    return this.db.user.create({
      data,
    });
  }
}
