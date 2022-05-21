import knex, { Knex } from 'knex';
import path from 'path';
import asd from './knexfile';

export class KnexProvider {
  session?: Knex;

  async getSession(): Promise<Knex> {
    if (!this.session) {
      this.session = knex(asd.development);
    }

    return this.session;
  }
}
