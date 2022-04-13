import { Timer } from './timer';

export interface Timers {
  save(timer: Timer): Promise<void>;
}
