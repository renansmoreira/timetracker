import { Customer } from '../../domain/customers/customer';
import { Customers } from '../../domain/customers/customers';
import { Id } from '../../domain/id';
import { Project } from '../../domain/projects/project';
import { Projects } from '../../domain/projects/projects';
import { KnexProvider } from './knex-provider';
import { ProjectPersistenceModel } from './persistence-definitions/project.pd';

const TABLE_NAME = 'projects';

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
        project.billable.toString() === '1',
        customer,
        project.id ? new Id(project.id) : undefined
      ));
    }

    return returnValue;
  }

  async get(projectId: Id): Promise<Project> {
    throw new Error('Method not implemented.');
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
          billable: project.billable,
          customerId: project.customer.id.toString()
        });
    } catch {
      await session<ProjectPersistenceModel>(TABLE_NAME).insert({
        id: project.id.toString(),
        name: project.name,
        billable: project.billable,
        customerId: project.customer.id.toString()
      });
    }
  }
}
