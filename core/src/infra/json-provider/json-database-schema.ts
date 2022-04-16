export type TimerSchema = {
  id: string,
  startDate: number
}

export type DatabaseSchema = {
  timers: TimerSchema[];
};
