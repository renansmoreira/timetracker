import { expect } from 'chai';
import { Customer } from '../../../src/domain/customers/customer';

describe('Customer', () => {
  it('should be created', () => {
    const expectedName = 'Name';

    const newCustomer = new Customer(expectedName);

    expect(newCustomer.id).to.be.not.undefined;
    expect(newCustomer.name).to.equal(expectedName);
  });
});
