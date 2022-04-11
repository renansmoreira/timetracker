import { expect } from 'chai';
import { validate } from 'uuid';
import { Id } from '../../src/domain/id';

describe('Id', () => {

  it('should create with an valid id', () => {
    const newId = new Id();

    const isValid = validate(newId.value);

    expect(isValid).to.be.true;
  });

  it('should have a string version', () => {
    const newId = new Id();

    const stringValue = validate(newId.toString());

    expect(stringValue).to.be.true;
  });

  it('should be able to be compared');
});
