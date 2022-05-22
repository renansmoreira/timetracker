import { Id } from '../id';
import { Project } from './project';

export interface Projects {
  getAll(): Promise<Project[]>;
  get(projectId: Id): Promise<Project>;
  save(project: Project): Promise<void>;
}
