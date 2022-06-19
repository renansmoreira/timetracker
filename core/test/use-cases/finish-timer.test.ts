import { expect } from 'chai';
import { Customer } from '../../src/domain/customers/customer';
import { DateRepresentation } from '../../src/domain/date-representation';
import { Project } from '../../src/domain/projects/project';
import { Currency } from '../../src/domain/remunerations/currency';
import { Money } from '../../src/domain/remunerations/money';
import { Timer } from '../../src/domain/timers/timer';
import { CustomersKnex } from '../../src/infra/knex/customers-knex';
import { KnexProvider } from '../../src/infra/knex/knex-provider';
import { ProjectsKnex } from '../../src/infra/knex/projects-knex';
import { TimersKnex } from '../../src/infra/knex/timers-knex';
import FinishTimer from '../../src/use-cases/finish-timer';

describe('Finish timer', () => {
  it('should end a existing timer', async () => {
    const provider = new KnexProvider('test');
    await provider.migrate();
    const customers = new CustomersKnex(provider);
    const customer = new Customer('Customer 1');
    await customers.save(customer);
    const projects = new ProjectsKnex(provider, customers);
    const project = new Project('Project 1', customer, new Money(0, Currency.REAL));
    await projects.save(project);
    const timers = new TimersKnex(provider, projects);
    const timer = new Timer(undefined, undefined, undefined, false, 'description', project);
    timer.start();
    await timers.save(timer);
    const finishTimer = new FinishTimer(timers);
    const expectedTimestamp = new DateRepresentation().timestamp;

    await finishTimer.execute({ id: timer.id.toString() });

    const foundTimer = await timers.get(timer.id);
    expect(foundTimer.endDate?.timestamp).to.be.closeTo(expectedTimestamp, 50);
    return provider.destroy();
  });
});
