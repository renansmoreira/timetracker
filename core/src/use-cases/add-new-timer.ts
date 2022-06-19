import { Id } from '../domain/id';
import { Projects } from '../domain/projects/projects';
import { Timer } from '../domain/timers/timer';
import { Timers } from '../domain/timers/timers';
import BaseUseCase from './base-use-case';

interface Command {
  projectId: string;
  billable: boolean;
  description: string;
}

export default class AddNewTimer implements BaseUseCase<Command, Id> {
  constructor(
    private projects: Projects,
    private timers: Timers
  ) { }

  async execute({projectId, billable, description}: Command): Promise<Id> {
    const project = await this.projects.get(new Id(projectId));
    const timer = new Timer(undefined, undefined, undefined,
      billable, description, project);
    timer.start();
    await this.timers.save(timer);

    return timer.id;
  }
}
