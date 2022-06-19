import { Id } from '../domain/id';
import { Timers } from '../domain/timers/timers';
import BaseUseCase from './base-use-case';

interface Command {
  id: string
}

export default class FinishTimer implements BaseUseCase<Command, Id> {

  constructor(
    private timers: Timers
  ) { }

  async execute({id}: Command): Promise<Id> {
    const timer = await this.timers.get(new Id(id));
    timer.end();

    await this.timers.update(timer);

    return timer.id;
  }
}
