export type TimerSchema = {
  id: string
}

export type DatabaseSchema = {
  timers: TimerSchema[];
};
