import knex, { Knex } from 'knex';
import knexConfig from './knexfile';

export class KnexProvider {
  session?: Knex;

  async getSession(): Promise<Knex> {
    if (!this.session) {
      this.session = knex(knexConfig.development);
    }

    return this.session;
  }
}
