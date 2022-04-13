import { Timer } from './timer.js';

export interface Timers {
  save(timer: Timer): Promise<void>;
}
