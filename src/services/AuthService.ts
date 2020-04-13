import { User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';

import { AuthenticationError, ForbiddenError } from '../utils/errors';
import { Service } from '../utils/Service';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService extends Service {
  async register({ password, email, username }: RegisterData): Promise<User> {
    if (this.session.isActive()) {
      throw new ForbiddenError('already logged in');
    }

    const hashedPassword = await hash(password, 10);
    let user;

    try {
      user = await this.db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
    } catch (e) {
      throw new ForbiddenError('User already exists', e);
    }

    this.session.save(user);
    return user;
  }

  async login({ email, password }: LoginData): Promise<User> {
    if (this.session.isActive()) {
      throw new ForbiddenError('already logged in');
    }

    const user = await this.db.user.findOne({ where: { email } });
    if (!user || !await compare(password, user.password)) {
      throw new AuthenticationError('invalid credentials');
    }

    this.session.save(user);
    return user;
  }

  async logout(): Promise<User> {
    return this.session.destroy();
  }
}
