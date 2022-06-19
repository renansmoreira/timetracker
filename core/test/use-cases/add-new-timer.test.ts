import { expect } from 'chai';
import { Customer } from '../../src/domain/customers/customer';
import { DateRepresentation } from '../../src/domain/date-representation';
import { Project } from '../../src/domain/projects/project';
import { Currency } from '../../src/domain/remunerations/currency';
import { Money } from '../../src/domain/remunerations/money';
import { Timer } from '../../src/domain/timers/timer';
import { Timers } from '../../src/domain/timers/timers';
import { CustomersKnex } from '../../src/infra/knex/customers-knex';
import { KnexProvider } from '../../src/infra/knex/knex-provider';
import { ProjectsKnex } from '../../src/infra/knex/projects-knex';
import { TimersKnex } from '../../src/infra/knex/timers-knex';
import { AddNewTimer } from '../../src/use-cases';

describe('Add new timer', () => {

  let project: Project;

  let provider: KnexProvider;
  let timers: Timers;
  let addNewTimer: AddNewTimer;

  beforeEach(async () => {
    provider = new KnexProvider('test');
    await provider.migrate();

    const customers = new CustomersKnex(provider);
    const customer = new Customer('Customer 1');
    await customers.save(customer);

    const projects = new ProjectsKnex(provider, customers);
    project = new Project('Project 1', customer, new Money(0, Currency.REAL));
    await projects.save(project);

    timers = new TimersKnex(provider, projects);
    addNewTimer = new AddNewTimer(projects, timers);
  });

  afterEach(() => {
    provider.destroy();
  });

  it('should add a new timer', async () => {
    const command = {
      projectId: project.id.toString(),
      billable: false,
      description: 'Test'
    };

    const newTimerId = await addNewTimer.execute(command);

    const foundTimer = await timers.get(newTimerId);
    const expectedTimer = new Timer(newTimerId, undefined, undefined, command.billable,
      command.description, project);
    expectedTimer['_startDate'] = foundTimer.startDate;
    expect(foundTimer).to.be.deep.equal(expectedTimer);
  });

  it('should start the new created timer', async () => {
    const command = {
      projectId: project.id.toString(),
      billable: false,
      description: 'Test'
    };
    const expectedTimestamp = new DateRepresentation().timestamp;

    const newTimerId = await addNewTimer.execute(command);

    const foundTimer = await timers.get(newTimerId);
    expect(foundTimer.startDate?.timestamp).to.be.closeTo(expectedTimestamp, 50);
  });
});
