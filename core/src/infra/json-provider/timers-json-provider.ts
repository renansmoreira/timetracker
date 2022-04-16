import { DateRepresentation } from '../../domain/date-representation.js';
import { Id } from '../../domain/id.js';
import { Timer } from '../../domain/timers/timer.js';
import { Timers } from '../../domain/timers/timers.js';
import { TimerSchema } from './json-database-schema.js';
import { JsonDbProvider } from './json-db-provider.js';

function map(timerSchema?: TimerSchema): Timer {
  if (timerSchema)
    return new Timer(new DateRepresentation(timerSchema.startDate));
  else
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
