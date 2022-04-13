import { Id } from '../../domain/id';
import { Timer } from '../../domain/timers/timer';
import { Timers } from '../../domain/timers/timers';
import { TimerSchema } from './json-database-schema';
import { JsonDbProvider } from './json-db-provider';

function map(timerSchema?: TimerSchema): Timer {
  return new Timer();
}

export class TimersJsonProvider implements Timers {
  private _jsonDbProvider: JsonDbProvider;

  constructor(jsonDbProvider: JsonDbProvider) {
    this._jsonDbProvider = jsonDbProvider;
  }

  async get(timerId: Id): Promise<Timer> {
    const timers = await this._jsonDbProvider.getTimers();
    const timer = timers.find((timer) => timer.id === timerId.toString());

    return Promise.resolve(map(timer));
  }

  async save(timer: Timer): Promise<void> {
    this._jsonDbProvider.addTimer(timer);
    await this._jsonDbProvider.write();

    return Promise.resolve();
  }
}
