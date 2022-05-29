import { Customers } from '../../domain/customers/customers';
import { NotFoundError } from '../../domain/error/not-found.error';
import { Id } from '../../domain/id';
import { Project } from '../../domain/projects/project';
import { Projects } from '../../domain/projects/projects';
import { Currency } from '../../domain/remunerations/currency';
import { Money } from '../../domain/remunerations/money';
import { KnexProvider } from './knex-provider';
import { ProjectPersistenceModel } from './persistence-definitions/project.pd';

const TABLE_NAME = 'projects';

function parseCurrency(currencyName?: string): Currency | undefined {
  if ((currencyName || '') === 'REAL')
    return Currency.REAL;

  return undefined;
}

export class ProjectsKnex implements Projects {

  constructor(
    private provider: KnexProvider,
    private customers: Customers
  ) { }

  async getAll(): Promise<Project[]> {
    const session = await this.provider.getSession();
    const projects = await session.select('*').from<ProjectPersistenceModel>(TABLE_NAME);
    const returnValue = [];

    for (let project of projects) {
      const customer = await this.customers.get(new Id(project.customerId));
      returnValue.push(new Project(
        project.name,
        customer,
        new Money(project.valuePerHour, parseCurrency(project.currency)),
        project.id ? new Id(project.id) : undefined
      ));
    }

    return returnValue;
  }

  async get(projectId: Id): Promise<Project> {
    const session = await this.provider.getSession();
    const project = await session.from(TABLE_NAME)
      .where({
        id: projectId.toString()
      }).select('*')
      .first<ProjectPersistenceModel>();
    const customer = await this.customers.get(new Id(project.customerId));

    if (!project)
      throw new NotFoundError('Project');

    return new Project(
      project.name,
      customer,
      new Money(project.valuePerHour, Currency.REAL),
      new Id(project.id)
    );
  }

  async save(project: Project): Promise<void> {
    const session = await this.provider.getSession();

    try {
      await this.get(project.id);
      await session<ProjectPersistenceModel>(TABLE_NAME)
        .where({
          id: project.id.toString()
        })
        .update({
          name: project.name,
          valuePerHour: project.valuePerHour?.amount,
          currency: project.valuePerHour?.currency.toString(),
          customerId: project.customer.id.toString()
        });
    } catch {
      await session<ProjectPersistenceModel>(TABLE_NAME).insert({
        id: project.id.toString(),
        name: project.name,
        valuePerHour: project.valuePerHour?.amount,
        currency: project.valuePerHour?.currency.toString(),
        customerId: project.customer.id.toString()
      });
    }
  }
}
