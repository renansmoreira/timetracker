import { Id } from '../../domain/id';
import { NotFoundError } from '../../domain/error/not-found.error';
import { KnexProvider } from './knex-provider';
import { Timers } from '../../domain/timers/timers';
import { Timer } from '../../domain/timers/timer';
import { DateRepresentation } from '../../domain/date-representation';
import { TimerPersistenceModel } from './persistence-definitions/timer.pd';
import { Projects } from '../../domain/projects/projects';

const TABLE_NAME = 'timers';

export class TimersKnex implements Timers {

  constructor(
    private provider: KnexProvider,
    private projects: Projects
  ) { }

  async getAll(): Promise<Timer[]> {
    const session = await this.provider.getSession();
    const timers = await session.select('*')
      .from<TimerPersistenceModel>(TABLE_NAME)
      .orderBy('startDate', 'desc');
    const foundTimers = [];

    for (let timer of timers) {
      const newTimer = new Timer(
        new Id(timer.id),
        timer.startDate !== null ? new DateRepresentation(timer?.startDate) : undefined,
        timer.endDate !== null ? new DateRepresentation(timer?.endDate) : undefined,
        timer.billable,
        timer.description,
        await this.projects.get(new Id(timer.projectId))
      );
      newTimer['_elapsedTime'] = timer.elapsedTime;
      foundTimers.push(newTimer);
    }

    return foundTimers;
  }

  async get(timerId: Id): Promise<Timer> {
    const session = await this.provider.getSession();
    const timer = await session.from(TABLE_NAME)
      .where({
        id: timerId.toString()
      }).select('*')
      .first<TimerPersistenceModel>();

    if (!timer)
      throw new NotFoundError('Timer');

    return new Timer(
      new Id(timer.id),
      timer.startDate !== null ? new DateRepresentation(timer?.startDate) : undefined,
      timer.endDate !== null ? new DateRepresentation(timer?.endDate) : undefined,
      timer.billable,
      timer.description,
      await this.projects.get(new Id(timer.projectId))
    );
  }

  async save(timer: Timer): Promise<void> {
    const session = await this.provider.getSession();
    await session<TimerPersistenceModel>(TABLE_NAME).insert({
      id: timer.id.toString(),
      description: timer.description,
      billable: timer.billable,
      projectId: timer.project?.id.toString(),
      startDate: timer.startDate?.timestamp,
      endDate: timer.endDate?.timestamp,
      elapsedTime: timer['_elapsedTime']
    });
  }

  async update(timer: Timer): Promise<void> {
    const session = await this.provider.getSession();
    await session<TimerPersistenceModel>(TABLE_NAME)
      .where({
        id: timer.id.toString()
      })
      .update({
        startDate: timer.startDate?.timestamp,
        endDate: timer.endDate?.timestamp,
        elapsedTime: timer['_elapsedTime']
      });
  }
}
