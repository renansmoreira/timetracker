import { Id } from '../id';
import { Timer } from './timer';

export interface Timers {
  getAll(): Promise<Timer[]>;
  get(timerId: Id): Promise<Timer>;
  save(timer: Timer): Promise<void>;
}
