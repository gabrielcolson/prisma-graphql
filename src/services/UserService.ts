import { User } from '@prisma/client';

import { Service } from '../utils/Service';

export class UserService extends Service {
  async me(): Promise<User> {
    return this.session.get();
  }
}
