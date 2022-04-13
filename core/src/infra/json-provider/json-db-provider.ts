import { JSONFile, Low } from 'lowdb';
import { Id } from '../../domain/id';
import { Timer } from '../../domain/timers/timer';
import { DatabaseSchema, TimerSchema } from './json-database-schema';

export class JsonDbProvider {
  private _database: Low<DatabaseSchema>;

  constructor() {
    this._database = new Low<DatabaseSchema>(new JSONFile<DatabaseSchema>(''));
    this._database.data ||= {
      timers: []
    };
  }

  async getTimers(): Promise<TimerSchema[]> {
    return Promise.resolve(this._database.data?.timers!);
  }

  async addTimer(timer: Timer): Promise<void> {
    this._database.data?.timers.push({
      id: timer.id.toString()
    });
  }

  async write(): Promise<void> {
    this._database.write();
  }

  get data(): DatabaseSchema {
    return this._database.data!;
  }
}
