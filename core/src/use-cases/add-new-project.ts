import { Customers } from '../domain/customers/customers';
import { Id } from '../domain/id';
import { Timers } from '../domain/timers/timers';
import BaseUseCase from './base-use-case';

interface Command {
  customerId: string;
  valuePerHour: number;
  name: string;
}

export default class AddNewProject implements BaseUseCase<Command, Id> {
  constructor(
    private customers: Customers,
    private timers: Timers
  ) { }

  execute(command: Command): Promise<Id> {
    const customer = await customers.get(new Id(req.body.customerId));
    const valuePerHour = req.body.valuePerHour ? new Money(req.body.valuePerHour, Currency.REAL) : undefined;
    const project = new Project(req.body.name, customer, valuePerHour);
    await projects.save(project);
  }
}
