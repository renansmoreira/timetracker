import { expect } from 'chai';
import { Customer } from '../../../src/domain/customers/customer';
import { Project } from '../../../src/domain/projects/project';

describe('Project', () => {
  it('should be created', () => {
    const expectedName = 'Name';
    const expectedCustomer = new Customer('Another name');

    const newProject = new Project(expectedName, expectedCustomer);

    expect(newProject.name).to.equal(expectedName);
    expect(newProject.customer).to.equal(expectedCustomer);
  });
});
