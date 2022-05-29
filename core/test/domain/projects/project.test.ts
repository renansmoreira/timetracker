import { expect } from 'chai';
import { Customer } from '../../../src/domain/customers/customer';
import { Project } from '../../../src/domain/projects/project';
import { Currency } from '../../../src/domain/remunerations/currency';
import { Money } from '../../../src/domain/remunerations/money';

describe('Project', () => {
  it('should be created', () => {
    const expectedName = 'Name';
    const expectedCustomer = new Customer('Another name');

    const newProject = new Project(expectedName, expectedCustomer);

    expect(newProject.name).to.equal(expectedName);
    expect(newProject.customer).to.equal(expectedCustomer);
  });

  it('should be created with value per hour', () => {
    const expectedValue = new Money(10, Currency.REAL);

    const newProject = new Project('Name', new Customer('Another name'), expectedValue);

    expect(newProject.valuePerHour).to.equal(expectedValue);
  });
});
