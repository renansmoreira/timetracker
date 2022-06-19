import knex, { Knex } from 'knex';
import knexConfig from './knexfile';

export class KnexProvider {
  session?: Knex;

  constructor(
    private env?: undefined | 'development' | 'test'
  ) { }

  async getSession(): Promise<Knex> {
    if (!this.session) {
      this.session = knex(knexConfig[this.env || 'development']);
    }

    return this.session;
  }

  async migrate(): Promise<void> {
    const session = await this.getSession();
    return session.migrate.latest();
  }

  async destroy(): Promise<void> {
    return this.session?.destroy();
  }
}
