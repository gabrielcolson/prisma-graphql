import { Service } from '../utils/Service';

export class HelloService extends Service {
  // eslint-disable-next-line class-methods-use-this
  sayHello({ name }: { name: string }): string {
    return `Hello ${name}!`;
  }
}
