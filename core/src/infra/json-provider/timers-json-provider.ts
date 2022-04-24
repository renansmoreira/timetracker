import { DateRepresentation } from '../../domain/date-representation';
import { Id } from '../../domain/id';
import { Timer } from '../../domain/timers/timer';
import { Timers } from '../../domain/timers/timers';
import { TimerSchema } from './json-database-schema';
import { JsonDbProvider } from './json-db-provider';

function map(timerSchema?: TimerSchema): Timer {
  if (timerSchema)
    return new Timer(new Id(timerSchema.id),
      new DateRepresentation(timerSchema.startDate));
  else
    return new Timer();
}

export class TimersJsonProvider implements Timers {
  private _jsonDbProvider: JsonDbProvider;

  constructor(jsonDbProvider: JsonDbProvider) {
    this._jsonDbProvider = jsonDbProvider;
  }

  async getAll(): Promise<Timer[]> {
    const timers = await this._jsonDbProvider.getTimers();
    return Promise.resolve(timers.map(map));
  }

  async get(timerId: Id): Promise<Timer> {
    const timers = await this._jsonDbProvider.getTimers();
    const timer = timers.find((timer) => timer.id.toString() === timerId.toString());

    return Promise.resolve(map(timer));
  }

  async save(timer: Timer): Promise<void> {
    await this._jsonDbProvider.addTimer(timer);
    return Promise.resolve();
  }
}
