import { Customer } from '../../domain/customers/customer';
import { Id } from '../../domain/id';
import { Project } from '../../domain/projects/project';
import { Projects } from '../../domain/projects/projects';
import { KnexProvider } from './knex-provider';
import { ProjectPersistenceModel } from './persistence-definitions/project.pd';

const TABLE_NAME = 'projects';

export class ProjectsKnex implements Projects {

  constructor(
    private provider: KnexProvider
  ) { }

  async getAll(): Promise<Project[]> {
    const session = await this.provider.getSession();
    const projects = await session.select('*').from<ProjectPersistenceModel>(TABLE_NAME);

    return projects.map((project) => new Project(
      project.name,
      project.billable,
      new Customer(project.customer.name, new Id(project.customer.id)),
      project.id ? new Id(project.id) : undefined
    ));
  }

  async get(projectId: Id): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  async save(project: Project): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
