import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Timer } from '../../domain/timers/timer';
import { TimerSchema } from './json-database-schema';

export class JsonDbProvider {
  private _database: JsonDB;

  constructor() {
    this._database = new JsonDB(new Config('./database.json', true, false, '/'));
  }

  async getTimers(): Promise<TimerSchema[]> {
    return Promise.resolve(this._database.getData('/timers'));
  }

  async addTimer(timer: Timer): Promise<void> {
    this._database.push('/timers[]', {
      id: timer.id.toString(),
      startDate: timer.startDate?.timestamp || 0
    }, true);
  }
}
