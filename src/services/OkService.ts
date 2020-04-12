import { Service } from '../utils/Service';

export class OkService extends Service {
  async ok(): Promise<boolean> {
    try {
      await this.db.connect();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return false;
    }
    return true;
  }
}
